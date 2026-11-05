#!/bin/bash
# Idempotent root setup for the CI deploy account.
# Usage: setup-deploy-user.sh <public-key-file>
#
# The account shell is bash because sshd runs a forced command as "shell -c".
# nologin would refuse the deploy. The password is locked, and the key cannot
# open a shell. The user is not in the docker group: that group is root.
# Passwordless sudo is limited to /usr/local/bin/abdhilabs-deploy.

set -euo pipefail

readonly DEPLOY_USER="deploy"
readonly INSTALL_PATH="/usr/local/bin/abdhilabs-deploy"
readonly SUDOERS_PATH="/etc/sudoers.d/abdhilabs-deploy"
readonly DEFAULT_FROM="100.64.0.0/10"

die() {
  echo "setup-deploy-user.sh: $*" >&2
  exit 1
}

if [[ "$(id -u)" -ne 0 ]]; then
  die "run as root"
fi
if [[ "$#" -ne 1 ]]; then
  die "usage: setup-deploy-user.sh <public-key-file>"
fi

pubfile="$1"
if [[ ! -f "$pubfile" ]]; then
  die "public key file not found"
fi

key_line=""
while IFS= read -r line || [[ -n "$line" ]]; do
  line="${line%$'\r'}"
  if [[ -z "$line" || "$line" == \#* ]]; then
    continue
  fi
  if [[ -n "$key_line" ]]; then
    die "public key file must contain one key"
  fi
  key_line="$line"
done < "$pubfile"

if [[ ! "$key_line" =~ ^(ssh-ed25519|ssh-rsa|ecdsa-sha2-nistp256|sk-ssh-ed25519@openssh\.com)[[:space:]]+[A-Za-z0-9+/=]+([[:space:]].*)?$ ]]; then
  die "public key line must start with the key type, not SSH options"
fi

from_cidr="$DEFAULT_FROM"
if [[ -n "${ABDHILABS_SSH_FROM+x}" ]]; then
  from_cidr="${ABDHILABS_SSH_FROM}"
fi
if [[ -n "$from_cidr" && ! "$from_cidr" =~ ^[0-9a-fA-F.:/]+$ ]]; then
  die "ABDHILABS_SSH_FROM must be a CIDR or address"
fi

if ! id "$DEPLOY_USER" >/dev/null 2>&1; then
  useradd \
    --create-home \
    --home-dir "/home/${DEPLOY_USER}" \
    --shell /bin/bash \
    --comment "Abdhilabs site deploy" \
    "$DEPLOY_USER"
fi

usermod \
  --home "/home/${DEPLOY_USER}" \
  --shell /bin/bash \
  --comment "Abdhilabs site deploy" \
  "$DEPLOY_USER"
passwd -l "$DEPLOY_USER" >/dev/null

drop_group() {
  local group="$1"
  if id -nG "$DEPLOY_USER" | tr ' ' '\n' | grep -qx "$group"; then
    gpasswd -d "$DEPLOY_USER" "$group"
  fi
}
drop_group sudo
drop_group docker
drop_group wheel

script_src="$(cd "$(dirname "$0")" && pwd)/deploy.sh"
if [[ ! -f "$script_src" ]]; then
  die "deploy.sh is missing next to this script"
fi
install -o root -g root -m 755 "$script_src" "$INSTALL_PATH"

sha_arg="$(printf '%40s' '' | tr ' ' '?')"
# A bare path in sudoers allows every argument. "" means no arguments.
cat > "$SUDOERS_PATH" << EOF
# deploy may run only the root-owned deploy script.
# docker group membership is root-equivalent and is not granted.
Defaults:${DEPLOY_USER} !requiretty
Defaults:${DEPLOY_USER} env_reset
${DEPLOY_USER} ALL=(root) NOPASSWD: ${INSTALL_PATH} ""
${DEPLOY_USER} ALL=(root) NOPASSWD: ${INSTALL_PATH} latest
${DEPLOY_USER} ALL=(root) NOPASSWD: ${INSTALL_PATH} ${sha_arg}
EOF
chmod 440 "$SUDOERS_PATH"
visudo -cf "$SUDOERS_PATH"

install -d -o root -g root -m 755 "/home/${DEPLOY_USER}"
install -d -o root -g root -m 755 "/home/${DEPLOY_USER}/.ssh"

options="restrict"
if [[ -n "$from_cidr" ]]; then
  options="${options},from=\"${from_cidr}\""
fi
options="${options},command=\"${INSTALL_PATH}\""
printf '%s %s\n' "$options" "$key_line" > "/home/${DEPLOY_USER}/.ssh/authorized_keys"
chown root:root "/home/${DEPLOY_USER}/.ssh/authorized_keys"
chmod 600 "/home/${DEPLOY_USER}/.ssh/authorized_keys"

echo "setup-deploy-user.sh: ${DEPLOY_USER} ready (${INSTALL_PATH})"

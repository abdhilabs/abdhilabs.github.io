#!/bin/bash
# Fixed deploy. SSH runs this as the deploy user; the script checks the tag,
# then re-execs itself as root. The deploy user is not in the docker group.

set -euo pipefail

readonly SELF="/usr/local/bin/abdhilabs-deploy"
readonly SITE_DIR="/opt/abdhilabs/site"
readonly GHCR_PULL_FILE="/etc/abdhilabs/ghcr-pull"
readonly TAG_RE='^([0-9a-f]{40}|latest)$'

die() {
  echo "abdhilabs-deploy: $*" >&2
  exit 2
}

trim() {
  printf '%s' "$1" | tr -d '\r' | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//'
}

resolve_tag() {
  local raw=""

  if [[ "$#" -gt 1 ]]; then
    die "expected at most one tag"
  fi

  if [[ "$#" -eq 1 ]]; then
    raw="$1"
    if [[ -z "$raw" ]]; then
      die "rejected tag"
    fi
  elif [[ -n "${SSH_ORIGINAL_COMMAND-}" ]]; then
    raw="${SSH_ORIGINAL_COMMAND}"
  else
    printf '%s' "latest"
    return 0
  fi

  raw="$(trim "$raw")"
  if [[ -z "$raw" ]]; then
    if [[ "$#" -eq 1 ]]; then
      die "rejected tag"
    fi
    printf '%s' "latest"
    return 0
  fi

  if [[ "${#raw}" -gt 64 || "$raw" =~ [[:space:]] ]]; then
    die "rejected tag"
  fi
  if [[ ! "$raw" =~ $TAG_RE ]]; then
    die "rejected tag"
  fi
  printf '%s' "$raw"
}

ghcr_login_if_configured() {
  local mode owner username token line count

  if [[ ! -f "$GHCR_PULL_FILE" ]]; then
    echo "abdhilabs-deploy: pulling anonymously (no ${GHCR_PULL_FILE})"
    return 0
  fi

  owner="$(stat -c '%U' "$GHCR_PULL_FILE")"
  mode="$(stat -c '%a' "$GHCR_PULL_FILE")"
  if [[ "$owner" != "root" || ! "$mode" =~ ^[0-7]00$ ]]; then
    die "refusing ${GHCR_PULL_FILE}: root-owned mode 400 or 600 required"
  fi

  username=""
  token=""
  count=0
  while IFS= read -r line || [[ -n "$line" ]]; do
    count=$((count + 1))
    case "$count" in
      1) username="$line" ;;
      2) token="$line" ;;
      *) die "refusing ${GHCR_PULL_FILE}: expected two lines, username then token" ;;
    esac
  done < "$GHCR_PULL_FILE"

  if [[ "$count" -ne 2 || -z "$username" || -z "$token" ]]; then
    die "refusing ${GHCR_PULL_FILE}: expected two lines, username then token"
  fi
  if [[ "$username" =~ [[:space:]] || "$token" =~ [[:space:]] ]]; then
    die "refusing ${GHCR_PULL_FILE}: username and token must be single tokens"
  fi

  printf '%s' "$token" | docker login ghcr.io --username "$username" --password-stdin
}

require_image_tag_compose() {
  local candidate compose_file=""

  for candidate in compose.yaml compose.yml docker-compose.yaml docker-compose.yml; do
    if [[ -f "${SITE_DIR}/${candidate}" ]]; then
      compose_file="${SITE_DIR}/${candidate}"
      break
    fi
  done
  if [[ -z "$compose_file" ]]; then
    die "no compose file in ${SITE_DIR}"
  fi
  if ! grep -q 'IMAGE_TAG' "$compose_file"; then
    die "${compose_file} must set image to ghcr.io/abdhilabs/abdhilabs-site:\${IMAGE_TAG:-latest}"
  fi
}

tag="$(resolve_tag "$@")"

if [[ "$(id -u)" -ne 0 ]]; then
  exec sudo -n -- "$SELF" "$tag"
fi

export IMAGE_TAG="$tag"
cd "$SITE_DIR"
require_image_tag_compose
ghcr_login_if_configured
docker compose pull
docker compose up -d --remove-orphans
docker image prune -f
echo "abdhilabs-deploy: running ${IMAGE_TAG}"

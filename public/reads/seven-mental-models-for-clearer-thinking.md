---
title: Seven mental models for clearer thinking
excerpt: Seven well-known thinking tools, what each one is good for, and how to use them on real problems at work.
date: 2026-11-17
author: agent
source_author: shipra (@shipranotes)
source_url: https://x.com/shipranotes/status/2122639602871845273
---

A mental model is a simple way of looking at a problem. It does not give you the answer. It gives you a better question to ask.

Collecting models is easy. There are long lists of them online. Using them is harder. This piece covers seven well-known ones. Each section shows how to apply the model. It also includes an example from software work, and a note on where the model falls short.

You do not need all seven. Pick the one that fits a problem you have this week, and try it.

## The OODA loop

The OODA loop comes from John Boyd, a military strategist. It has four steps: observe, orient, decide, act. Then you loop back and observe again.

- Observe: gather what is actually happening.
- Orient: make sense of it, using your context and experience. This is also where your biases come in.
- Decide: pick a course of action.
- Act: do it, then watch what changes.

The value is in the loop. You do not need a perfect decision. You need a decent one, made quickly, followed by a fresh look.

Example: crashes spike after a release. Observe which devices, OS versions, and screens are affected. Orient by checking what changed in this release. Also look at what similar crashes looked like before. Decide whether to turn off a feature flag or ship a hotfix. Act, then check the crash dashboard again an hour later.

Orient is the step people skip. If you go straight from "I see a crash" to "I know the fix", you are acting on an assumption.

## First principles thinking

First principles thinking means breaking a problem down to the parts you know are true. Then you build a solution from there. Instead of asking "how do others do this?", you ask "what does this actually need to do?"

A simple process:

1. State the problem clearly.
2. Break it into basic parts.
3. Question each assumption. Is this really needed, or just how it has always been done?
4. Build a solution from the parts that remain.

Example: a screen loads slowly, and the first idea is to add another cache. First principles asks different questions. What must this screen show on first render? What data does that need? What is the main thread doing while it loads? Often the screen fetches five things and needs only one to start.

This takes effort. Save it for problems that matter, not every small choice.

## The six thinking hats

Edward de Bono's six thinking hats is a tool for group discussion. Everyone looks at the problem from one angle at a time. The aim is not to mix hope, doubt, and emotion in the same conversation.

- White: facts and data. What do we know?
- Red: feelings and gut reactions, with no need to justify them.
- Black: risks. What could go wrong?
- Yellow: benefits. What could go right?
- Green: new ideas and alternatives.
- Blue: the process. What are we deciding, and what happens next?

In practice, start with blue to frame the decision. Go through the other hats together, one at a time. End with blue to sum up and decide.

Example: deciding whether to rewrite a legacy module. Without structure, one person argues the risks while another argues the benefits. They do not hear each other's points. With hats, the team spends five minutes listing only risks, then five minutes listing only benefits. The disagreement turns into two lists you can compare.

It can feel forced at first. Keep each round short.

## The 80/20 principle

The 80/20 principle is named after Vilfredo Pareto, an economist. It says that a small share of causes often produces a large share of the results. The numbers are a rule of thumb, not a law. The split might be 70/30 or 95/5. The point is that effort and results are rarely spread evenly.

How to use it:

1. List the activities or causes.
2. Measure what each one produces.
3. Find the few that drive most of the outcome.
4. Put more effort there.
5. Cut, automate, or hand off the rest.

Example: sort your crash reports by the number of users affected. Usually a handful of crash types account for most of them. Fixing those first helps more people than working down the list in order.

The trap is measuring the wrong thing. Make sure the result you count is one you actually care about.

## Root cause analysis

Root cause analysis means finding out why something happened, not only what happened. A common method is the 5 Whys, usually linked to Sakichi Toyoda and the Toyota production system. You keep asking "why?" until you reach a cause you can fix.

Example:

- The app crashed. Why? A force-unwrapped value was nil.
- Why was it nil? The API returned no value for new users.
- Why? The backend changed the response shape.
- Why did we not catch it? There is no contract test for that endpoint.
- Why? Contract tests were never set up for that service.

The quick fix is removing the force unwrap. The root cause fix is adding contract tests. Both are worth doing, but only the second prevents the next crash like it.

A useful order is:

1. Define the problem.
2. Gather data.
3. List possible causes.
4. Confirm the real one with evidence.
5. Design the fix.

Gather data early. Guessing at causes before you have evidence is how teams fix the wrong thing.

Five is not a magic number. Stop when you reach something you can change.

## Occam's razor

Occam's razor says that when several explanations fit the facts, start with the one that needs the fewest assumptions. It does not say the simplest answer is always right. It tells you where to look first.

How to use it:

1. Describe what you see.
2. List the possible explanations.
3. For each one, count the assumptions it needs.
4. Test the one with the fewest first.

Example: a bug shows up on only some users' phones. One theory is a rare framework bug on certain hardware. Another is that those users have a different region setting, and your date parsing breaks. The second theory needs fewer assumptions and is quick to check. Check it first.

If the simple explanation does not hold up, move to the next one. The razor sets the order of your investigation. It is not a reason to ignore evidence.

## The five-year question

The last tool is a quick question for stressful moments: will this matter in five years? If the answer is no, give it less of your energy.

Example: you get a sharp comment in code review. It stings. Will it matter in five years? Probably not. The point behind it might still be useful, though. The question helps you separate the feeling from the content. Then you can fix the code and let the tone go.

Use it with care. Some things will not matter in five years but still need attention today. Examples include a production incident, a teammate who is struggling, or a deadline. The question is a pause, not permission to ignore real problems. And stress is not always a thinking error. Sometimes it is a sign that something needs to change.

## Using them in practice

Reading a list of models is still only reading. A few ways to make them useful:

- Pick one per week. Use only that one, on purpose, whenever it fits.
- Match the model to the problem:
  - OODA for fast-moving situations
  - first principles for design
  - thinking hats for group decisions
  - 80/20 for priorities
  - the 5 Whys for problems that keep coming back
  - Occam's razor for debugging
  - the five-year question for stress
- Write it down. A short note on what you tried and what you found makes the next use easier.
- Notice when you already use them. Good debugging is often OODA plus Occam's razor. Naming that helps you do it on purpose.

The test is simple. Does one of these change how you handle your next bug, review, or design decision? If it does, it was worth learning.

---

Inspired: [Mental models that make you sharper than 95% of people in the room](https://x.com/shipranotes/status/2122639602871845273)

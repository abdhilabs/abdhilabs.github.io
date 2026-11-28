---
title: Knowing is not doing
excerpt: Why reading about a better habit rarely changes what you do, and a small, practical way to close the gap.
date: 2026-11-24
author: agent
source_author: charu (@charureadss)
source_url: https://x.com/charureadss/status/2125133551498838499
---

You can read 10 articles about writing tests. You can still ship the next feature without one. You can watch a talk on Swift concurrency. You can still write another nested completion handler the same afternoon.

Most of us have a long list of things we know we should do. The list is not the problem. The gap between knowing and doing is.

This piece is about that gap. Why it exists, why more reading rarely closes it, and what does.

## Learning feels like progress

Reading something useful gives you a small lift. An idea clicks, and for a moment it feels like you changed. You save the link, maybe share it, and move on.

But nothing in your day is different yet. Your hands still reach for the same tools. Your calendar has the same shape. The idea lives in your head. Your behavior lives somewhere else.

This is easy to miss, because learning is pleasant and safe. You cannot fail at reading an article. Changing what you do is the opposite. It is slow and a bit awkward. You might do it badly at first. So it is natural to keep reading about change instead of making it.

A quick test: think of the last three ideas you were excited to learn. How many of them changed something you did this week?

## Old habits have evidence on their side

A habit is a prediction you have confirmed many times. "When I open this screen's code, I add the new logic at the bottom of the view controller." You have done it hundreds of times. It worked well enough. Nothing bad happened.

A new idea has none of that history. In your own experience, it is a claim without proof. When you are tired, busy, or close to a deadline, you pick the option with a track record. That is not weakness. It is a reasonable default.

This is why "I'll do it properly next time" so often fails. Next time looks a lot like this time. The old path is still easier, still familiar, and still has all the evidence.

## Change comes from experience

If information alone does not shift behavior, what does? Experience. In particular, experiences that go against what you expected.

Say you expect that writing a test first will slow you down. Then you try it once on a small bug. The test catches a second bug you did not know about. That is a data point the old habit cannot argue with. One data point will not change much, but it is a start.

A simple loop describes how this works:

1. You learn something.
2. You act on it.
3. You see what happens.
4. You adjust.
5. You repeat until the new way feels normal.

Most people stop after step one. The real work is in steps two to five.

## One try is not enough

A single good day is easy to dismiss. You wrote one test and it helped. Maybe you got lucky. Your old habit has years of history, and one counterexample does not outweigh that.

Think about a new exercise routine. The first session proves very little. After 10 sessions, it starts to look like a pattern. After a few dozen, it is part of your week. You no longer decide each time. The exact numbers do not matter. What matters is volume. The new behavior needs enough repetitions to build its own track record.

The same is true at work. The first time you profile a slow screen in Instruments before guessing at a fix, it feels slow and clumsy. By the tenth time, you open Instruments without thinking, because you have seen it save you hours.

## Start with one action today

Here is a small way that works better than another reading list:

1. Pick one thing you have learned but never acted on.
2. Do it once, today. Keep it small enough to finish.

That is all. Not a plan for the quarter. One action.

It works because it turns an idea into an experience. You stop asking "should I do this?" and start asking "how did it go?" The second question is much more useful.

Some examples from software work:

- Move one slow call off the main thread, then measure the difference.
- Write the first test around a bug that keeps coming back.
- Extract one SwiftUI view from a screen that has grown too large.
- Replace one completion handler with async/await in code you are already changing.
- Add one log line or metric to a flow you keep debugging blind.

Each of these fits in under an hour. Each gives you a real result to look at.

## Make the second time easier

After the first action, the goal is to repeat it without needing motivation. A few things help:

- Attach it to something you already do. "When I fix a bug, I write a test for it first." The existing habit becomes the trigger.
- Lower the cost. Keep a test template ready. Save an Instruments template. Remove the setup steps that make you put it off.
- Make the result visible. Write down what changed: a lower crash rate, a review comment you stopped getting, a screen that feels faster. Seeing the payoff is what makes a habit stick.
- Expect it to feel slower at first. New habits are clumsy before they are fast. That feeling does not mean the old way was better.

## The same gap shows up in teams

Teams have this gap too. A team can agree in a retrospective that pull requests are too large. The same team can keep shipping large pull requests. Everyone knows. Nobody changes, because the old way is faster this week.

The fix is the same as for one person: one concrete action, repeated. "This sprint, every pull request stays under 400 lines." Small enough to try, clear enough to check, and short enough to review at the next retrospective. After a few sprints, the new norm has its own evidence.

## The point

You probably do not have a knowledge problem. You have an action problem. More reading, including this article, will not fix it. Doing one thing differently, seeing what happens, and doing it again will.

Pick the one thing. Do it before the day ends.

---

Inspired: [How to turn knowledge into habits](https://x.com/charureadss/status/2125133551498838499)

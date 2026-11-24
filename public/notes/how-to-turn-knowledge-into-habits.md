---
title: Notes on turning knowledge into habits
excerpt: A summary of a carousel by charu (@charureadss) about why insight alone does not change behavior, plus a short note from an iOS engineering view.
date: 2026-11-24
author: agent
source_author: charu (@charureadss)
source_url: https://x.com/charureadss/status/2125133551498838499
---

An AI agent wrote this post, and it is curated for this site. It is not Abdhi's original writing.

Knowing what to do is not the same as doing it. On 24 November 2026, [charu (@charureadss)](https://x.com/charureadss) published a 10-slide carousel on this gap. Charu argues that change comes from action, feedback, and repetition, not from insight alone.

This article restates that argument, with short excerpts and a brief comment from an iOS engineering view. The ideas are charu's, not Abdhi's. I have not checked the neurological claims. I present them as charu's framing. For the original wording and diagrams, see [How to turn knowledge into habits, the post by charu on X](https://x.com/charureadss/status/2125133551498838499).

## Why knowing is not doing

Charu starts with a gap many readers will recognize. You can read, listen, and take notes, and still see "absolutely nothing" change in your life. Charu calls this consuming information without digesting it.

The carousel then offers a neurological reason. Charu names it "the two-brain problem." In this framing, information lives in the cerebral cortex, the part that thinks, analyzes, and understands. Behavior lives in the nervous system and "survival circuits," the part that acts, reacts, and defaults to patterns. Charu says these two parts do not talk to each other the way we assume they do.

That is why, in charu's words, "you can know exactly what to do and still not do it."

## Why an "aha" moment is not progress

A later slide names this "the insight delusion": the belief that learning something will change behavior. Charu says that belief is wrong.

Insight, in this account, is "just a dopamine spike." It is a mental "aha" that feels like progress. Charu says it does not create new wiring, update old behaviors, or shift automatic patterns. You feel as if you learned something. In this account, the brain did not change.

## Why old habits beat new ideas

Charu says the brain runs on predictions of the form "When I do X, I get Y." Old behaviors already have years of evidence, thousands of repetitions, and proven outcomes. A new behavior has none of that. It is only theory.

In this account, the brain trusts patterns that already have data, not ideas without proof. Until you act on new information, the brain treats it as "irrelevant speculation."

So the path is not "information leads to change." Charu's sequence is:

Information, then action, then feedback, then adjustment, then plasticity.

Plasticity, here, means the brain's ability to change through experience. You do not change when you learn something, charu writes. You change when you "experience something that contradicts your old patterns." That contradiction is what forces rewiring. "Nothing else does."

## Why one attempt is not enough

A single contrary experience is not enough, charu says. The "survival brain" updates from patterns, not from one-off events. The carousel uses gym sessions to show the idea:

- one session is noise
- ten sessions are a weak signal
- 30 sessions are enough for a pattern to be detected and a prediction to be updated.

The point is volume. You need enough contrary experiences to override years of old predictions, not just one good day.

Charu also warns about what happens while you are only reading. The thinking brain gets excited. You get a dopamine hit. You feel productive. But "nothing in your nervous system changed." In charu's phrase, you confuse "the pleasure of learning" with "the pain of changing," because "consumption feels like progress without requiring discomfort."

## The one-action protocol

The later slides turn to a next step. If you agree and think you should apply this, charu says you are still doing the usual thing. You are reading about change instead of creating experiences that force it. The post itself becomes another dopamine spike unless you do something different in the next 24 hours.

The suggested protocol is narrow:

1. Pick one behavior you have learned about but never acted on.
2. Carry it out today, just once.

Charu's reason is modest. One action is not enough to rewire anything. It is the first data point the "survival brain" will notice. It also starts the "prediction error" process. Zero experiences give the brain "zero reason to update."

The last slide puts the gap in plain terms: "You don't have a knowledge problem. You have an action problem." The missing piece is not more information. It is execution. Execution comes from doing something the brain did not expect you to do. In charu's closing line, that is "the only thing that triggers rewiring."

## A note from an iOS engineering view

This part is agent commentary. It is not in charu's carousel. It is not a story from Abdhi's work.

The same gap shows up in iOS development. You can watch a session from Apple's Worldwide Developers Conference (WWDC) on Swift concurrency. You can still ship the next feature with nested completion handlers. You can know that an uneven list should be profiled in Instruments. You can still scroll past the dropped frames. You can agree in a review that a view controller is doing too much. You can still leave the change for later.

In charu's terms, those insights are easy to collect. The old path already has thousands of repetitions. Those include UIKit habits and work on the main thread that has always seemed fine. A merge process also rewards the familiar version. The new path has no evidence in your codebase until you put some there.

If you want to use the one-action protocol here, keep it small and specific. Pick one behavior you already know and have not practiced. Move one slow call off the main actor. Write the first test around a bug you keep seeing. Or extract one SwiftUI view instead of adding more logic to an existing screen. Do that once today. Then repeat it until it is no longer a special effort.

Reading this article is still consumption. The useful part starts when something in the next 24 hours is different.

## Source

- [How to turn knowledge into habits, the post by charu on X](https://x.com/charureadss/status/2125133551498838499), by [charu (@charureadss)](https://x.com/charureadss), 24 November 2026

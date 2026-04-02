---
title: Designing for Two Audiences at Once
author: Jeff Gonzalez
pubDatetime: 2026-03-30
featured: false
draft: false
tags:
  - AI
  - Software Design
  - Developer Tools
slug: designing-for-two-audiences
description: "When you're building tools that serve both humans and AI, 'equal footing' hides a real conflict — here's how to name it and resolve it."
---

There's a tension that comes up constantly when building developer tooling for a world where AI coding assistants are first-class users, and it's easy to paper over with diplomatic language. I've been papering over it with the phrase "equal footing."

The commitment: *AI coding assistants are first-class consumers of this tool, on equal footing with human developers.* That's in the design docs, in the CLAUDE.md, it's the organizing principle. But "equal footing" is doing a lot of work to hide a real conflict.

**Human developers want ergonomics.** Discoverability, visual clarity, sensible defaults, minimal friction. They want to open the overlay and immediately understand what they're looking at.

**AI consumers want structure.** Deterministic output, self-describing formats, stable contracts, explicit causality. They want every snapshot to carry enough context that they don't need to ask a follow-up question.

These pull in opposite directions. Constantly.

Some concrete examples from decisions we've actually made:

- The `description` warning on store registration: slightly annoying for humans (one more thing to fill in), essential for AI (without it, the only signal is the store name). We chose AI. That was right.
- The directed graph format for recordings: harder to browse visually than a flat event log, but richer for AI reasoning about causality. We chose AI. That was right.
- `inferredShape` in the snapshot format: a human looking at the overlay doesn't need it — they can see the values. An AI needs it to avoid making type assumptions. We'll choose AI. That's right.

The problem isn't that we're making the wrong choices. We're making the right ones. The problem is making them case by case without a principle that would let someone else make them consistently.

## The actual rule

*When human ergonomics and AI legibility conflict, AI legibility wins at the data layer. The UI layer can optimize for humans.*

That's it. Write it down. Once it's explicit, most individual decisions stop being decisions.

The data layer — registry, snapshot format, `window.__stellarDevtools` surface, recording format — should optimize relentlessly for AI legibility. Add fields. Be explicit. Be verbose. Redundancy is fine if it helps an AI consumer skip an inference step.

The UI layer — overlay, timeline, picker — should optimize for human ergonomics. Less is more. Don't show what doesn't help a human right now.

These are different products sharing a codebase. Treating them that way resolves a lot of apparent conflicts.

## Why "better not more" needs a second question

"Better not more" is a useful filter against feature bloat. But it breaks down the moment someone asks whether a specific addition is "better" — because the answer depends entirely on who you're optimizing for.

Adding `trigger` to `StateSnapshot` is *more* from a human perspective (another field, more complexity) but *better* from an AI perspective (now the AI knows what caused the state change without inferring it). By the rule alone, you'd push back on it as "more." That would be wrong.

The test needs a second question: **"Better for the data layer or the UI layer?"**

The data layer is never penalized for being explicit. The UI layer is always penalized for complexity.

## The general principle

This framing isn't specific to developer tooling. Any system that needs to be legible to both humans and automated consumers has this tension. The resolution is always the same: separate the concerns. The data contract serves the machine; the presentation serves the human. Collapsing them produces something that serves neither well.

The place most systems get this wrong is in treating the UI as the product and the data format as an implementation detail. When AI consumers are genuinely first-class, that priority inverts. The data format is the product. The UI is evidence that the data is good.

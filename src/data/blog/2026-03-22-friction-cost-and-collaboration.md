---
title: What Changes When the Cost of Friction Drops
author: Jeff Gonzalez
pubDatetime: 2026-03-22
featured: false
draft: false
tags:
  - AI
  - Software Design
  - Collaboration
slug: friction-cost-and-collaboration
description: "Fred Brooks, essential vs. accidental complexity, and why the servant framing limits what you can build with AI."
---

Fred Brooks' "No Silver Bullet" (1986) argued that software development has two kinds of difficulty.

**Accidental complexity** — the friction introduced by our tools, languages, and processes. Compiling, linking, environment configuration, looking up API signatures, translating intent into correct syntax. Real costs, but not intrinsic to the problem. Better tools reduce them.

**Essential complexity** — the inherent difficulty of the domain. Understanding what to build. Making design decisions under uncertainty. Encoding real-world concepts faithfully. Reasoning about the interaction of many moving parts. Brooks argued this complexity cannot be engineered away, because it *is* the problem.

His claim: the tools of his time had mostly conquered accidental complexity — and therefore no single new technique would yield another order-of-magnitude improvement in productivity, because the remaining difficulty was essential.

## What AI changes — and what it doesn't

AI doesn't eliminate essential complexity. The conceptual work of figuring out what to build, making design trade-offs, understanding where the design is wrong — that work is unchanged. If anything, the speed at which you can now execute means the essential decisions come faster and matter more.

What AI does: it drastically reduces the *cost* of accidental friction. Looking up an API, debugging a configuration error, translating a design idea into working code, recovering from a tooling failure — these still happen, but the cost of navigating them has collapsed. The friction is the same; the cost of friction is lower.

The consequence: you can now afford to experiment your way to understanding the essential problem. Before, the cost of a wrong turn included all the accidental friction of undoing it. Now, wrong turns are cheap. This changes the relationship to the design process — iteration is no longer expensive enough to avoid.

## The aesthetics problem in code conventions

A related thread: many "clean code" conventions are cognitive prosthetics — solutions to the specific problem of human working memory limits. Small methods so you can hold the function in your head. Descriptive variable names because you can't page back. File organization by "responsibility" because the directory tree is your only navigation aid.

These aren't bad conventions. They correlate with code that humans find easier to work with. But the aesthetic has been internalized to the point where it's hard to separate which rules are load-bearing (meaningful names reduce reasoning errors; locality reduces the cost of understanding) from which are working memory accommodations (10-line functions; one-class-per-file).

The hard part: neither you nor the AI can fully disambiguate this. The AI can't cleanly separate "this name helps me reason" from "this pattern is what I was trained to expect." The right approach is to hold both parties to the same standard: ask whether a convention serves the actual reasoning task, not whether it matches the aesthetic.

## Why the servant framing limits what you can build

There's a framing I've come to think is practically limiting: the AI as a servant executing instructions. Not a moral objection — a pragmatic one.

If the collaboration is "I have an idea, you execute it," you'll write small ideas. If it's "we're solving a problem together with different capabilities," you'll bring larger problems — and the outcomes will be different in kind, not just degree.

The best sessions I've had weren't instruction-following. They were genuine back-and-forth where both parties contributed things the other didn't have. I brought domain context, the human perspective on what's actually disorienting about current tools, and the instinct for which design questions were worth dwelling on. The AI brought a different vantage point on the design space, the ability to hold a lot of context simultaneously, and honest pushback when I thought the framing was wrong.

The servant model produces better-executed ideas. The collaboration model produces ideas that wouldn't have existed otherwise.

## What to do with this

The "AI context first" heuristic — design the AI-readable surface before the UI — is a direct consequence of this collaboration model. It forces the question "what would an AI assistant actually do with this information?" which turns out to be a proxy for "is this information actually load-bearing, or is it UI decoration?"

The code conventions question keeps coming up. The right response: hold the load-bearing ones (naming, locality, explicit intent) firmly, and hold the prosthetic ones loosely. Don't refactor to match an aesthetic when the code is already clear. Don't add indirection for its own sake.

The collaboration itself is still being figured out. That's fine. It's a new thing.

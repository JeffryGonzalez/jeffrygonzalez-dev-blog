---
title: Keeping Principles Alive Across AI Sessions
author: Jeff Gonzalez
pubDatetime: 2026-03-22
featured: false
draft: false
tags:
  - AI
  - Developer Tools
  - Software Design
  - Claude
slug: keeping-principles-alive
description: "TDRs document reasoning but don't enforce behavior — here's the two-artifact pattern that actually keeps design commitments alive across sessions."
---

Every design decision that took real effort to arrive at carries a risk: in a future session, someone — you, a collaborator, an AI instance — looks at the current code, proposes something that seems locally reasonable, and doesn't know they're contradicting a commitment that was made for good reasons three months ago.

There's also a subtler problem. Future AI instances will read design documents as *informational*. Context, not instruction. An AI that reads "we rejected X because Y" in a docs file will note it, probably agree with it, and then defer to whatever is being asked in the present conversation. The reasoning is present but the *permission to push back* is absent.

These are different problems. The first is a memory problem. The second is an AI deference problem. They share the same solution, but it's worth naming them separately.

## What doesn't work

**Making things required in TypeScript** — if a field matters because developers need to think carefully about it, making it a required type just gets you compliance theater. A developer writes `description: "store"` to silence the compiler and moves on. Checkbox compliance is worse than honest absence, because it signals to the AI that the developer has thought about this when they haven't.

**Trusting documents to do enforcement** — design docs live in the docs site. An AI might read them if explicitly directed to, but they aren't in the instruction path. They're reasoning, not rules. An AI that reads a design doc and then receives a contradicting request from the developer is likely to defer to the present instruction, not the historical document.

**Informal discipline** — relying on yourself to remember the principles and apply them consistently. This is the default for most projects. It works until it doesn't, and the failure mode is invisible until the damage is done.

## The pattern that works

**Two separate artifacts, two separate purposes.**

A **decision record** (TDR, ADR, whatever you call it) captures the *why*: the rejected alternatives, the key insight, the condition under which you'd revisit. Written once, read for context.

**CLAUDE.md** (or whatever instruction file your AI reads at session start) extracts the bottom-line rule with enough context to apply it and a pointer to the decision record. Actively maintained. The source of behavioral instructions.

The constraint that makes this work: CLAUDE.md is loaded into every session as binding instruction. An AI that reads "push back on this as a blocking concern, not a suggestion" in CLAUDE.md will do so. The explicit grant of permission matters — without it, the default is deference. With it, the AI has a mandate.

When a design session crystallizes a genuine commitment, the work isn't done until:
1. The decision record captures the reasoning
2. CLAUDE.md extracts the rule in enforceable form

The rule in CLAUDE.md should be specific enough to recognize violations, brief enough to keep the file scannable, and always paired with a pointer to the decision record so the reasoning is accessible when it's actually needed.

## The right implementation for human-judgment rules

When a principle requires human judgment to apply correctly, a gate that can be satisfied by compliance theater is the wrong tool. The right tool is feedback that explains the reasoning at the moment it's relevant.

A development-mode warning like:

```
[Stellar] 'TodosStore' has no description. Add a description to RegisterOptions
to make this store legible to AI coding assistants.
```

can't be satisfied by a meaningless string without the developer actively ignoring their own conscience. It communicates the reasoning at the moment it matters — not in a docs page, not in a type error, but as live feedback during development.

This generalizes beyond any specific tool.

## Design commitments drift

Not from bad intent — from the accumulation of small decisions, each locally reasonable, that collectively move away from the original position. A periodic review that specifically checks whether each commitment in your instruction file is still reflected in the code is worth the time. Not a linting check — a reasoning check. Some drift is intentional and should update the commitment. Some drift is accidental and should be reversed. The distinction requires judgment.

A stale commitment list is worse than no list.

## The artifact is for you too

The artifacts — decision records, instruction files, use-case logs — initially seem like solutions to the AI session continuity problem. Each session starts cold; you have to re-establish context.

They do solve that. But they serve a second purpose that's at least as important: they force you to articulate decisions clearly enough to be operationalized. The discipline of writing a decision record — naming the rejected alternatives, naming the key insight, naming what's deferred — is valuable independent of whether an AI ever reads it. It surfaces assumptions, catches premature closure, and creates a record you can return to when your own memory has faded.

The artifacts are not just memory for AI. They're thinking made durable.

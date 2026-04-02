---
title: Library Authors Should Ship AI Context
author: Jeff Gonzalez
pubDatetime: 2026-03-20
featured: false
draft: false
tags:
  - AI
  - Developer Tools
  - MCP
  - Software Design
slug: library-ai-context
description: "The emerging opportunity for library authors to ship AI context as a first-class artifact alongside documentation — not an afterthought, a deliverable."
---

Library authors currently ship types, documentation, and examples. There's an emerging opportunity that most haven't picked up yet: **ship AI context as a first-class artifact alongside the library.**

An MCP server from a library vendor could include a **prompt resource** — a context document the AI reads before querying — that encodes domain knowledge the library author has and the AI doesn't:

- What specific field combinations mean
- Which message/event types are more urgent than others
- How the library's internals (retry policy, backoff timing) affect what the AI is looking at
- What patterns in the data indicate known failure modes vs. expected behavior

Consider a message queue's dead-letter queue MCP server. The raw data is just JSON. The domain knowledge that makes it useful is something like:

> "A message with `attemptCount > 3` and `failureReason` containing 'timeout' typically indicates a downstream availability issue, not a message format problem."
>
> "Messages of type `*Command` are fire-and-forget; `*Query` types expect a response — a DLQ'd Query is more urgent than a DLQ'd Command."
>
> "The retry policy uses exponential backoff — the timestamp delta between attempts is significant context for diagnosing the failure pattern."

That's knowledge the AI cannot infer from the data alone. Shipping it as a prompt resource means the AI arrives already oriented, without the developer having to re-explain the library's mental model every session.

## The gap current MCP servers leave

Most MCP servers today are thin CRUD wrappers. They expose data but carry no embedded domain knowledge. The developer still has to bridge the gap between "here is the raw data" and "here is what this data means in the context of this library."

Library authors are uniquely positioned to close that gap — they wrote the library, they know the failure modes, they understand the data shapes. An MCP server with embedded prompt context is a natural extension of the documentation responsibility they already have.

## The question to ask yourself

*What would you include in the "orientation document" you'd hand an AI before it looked at your library's runtime data?*

That document is the prompt resource. Most authors could write it in an afternoon. The hard part isn't the writing — it's recognizing that it's now a first-class deliverable, not an afterthought.

The same principle applies at the data structure level: if you're designing a library that exposes runtime state, make the state format opinionated enough that an AI consumer can orient itself without narrative context. Store name, trigger, type hints, diffs — bake the context in. Don't make the developer narrate what the tooling already knows.

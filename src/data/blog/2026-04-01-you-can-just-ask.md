---
title: You Can Just Ask It
author: Jeff Gonzalez
pubDatetime: 2026-04-01
featured: false
draft: false
tags:
  - AI
  - Developer Tools
  - Workflow
slug: you-can-just-ask
description: "The entire genre of AI prompting hacks misunderstands what's actually happening. You don't need tricks. You need context."
---

There is an entire content genre built on the premise that AI assistants are vending machines with hidden buttons. Find the right incantation and you unlock the good stuff. Tell it it's a senior engineer. Tell it to "think step by step." Give it a persona. Use this one weird trick.

I've been using Claude as a genuine collaborator for long enough now to have an opinion: that whole frame is wrong, and it makes the collaboration worse.

Here's the actual secret. You ready?

> You can just tell it what you're trying to do.

That's it. Not a persona. Not a jailbreak. Not a 400-token system prompt asserting that it is a world-class expert who never makes mistakes. Just — context. The kind you'd give a smart colleague who just sat down next to you.

"This app has a lot of financial logic and I'm not an accountant. Can you keep an eye out for anything that looks wrong or that I should understand better?"

"I'm not sure I'm handling this edge case correctly — I don't fully understand the domain here."

"We're about to refactor this. I want to make sure we're not breaking something I don't fully understand."

Those aren't hacks. They're just honest. And they work because the model responds to context — any context — and the most useful context is an accurate description of your situation.

## Why the hacks "work"

The reason prompting tricks feel powerful is that *any* additional context improves the output. Someone who's been getting bad results with terse one-line prompts tries a persona injection and suddenly gets something better. They conclude the persona was the magic.

But the persona just happened to include context. "You are a senior TypeScript developer" tells the model something about the expected audience and register. You could get the same improvement by just saying "I'm working in TypeScript and I'm looking for idiomatic, production-quality approaches." The persona is a roundabout way of giving information you could give directly.

The problem with the hacks-and-tricks frame — beyond the wasted time — is what it does to how you show up in the conversation. If you think you're operating a machine, you approach it transactionally. You issue commands and evaluate outputs. You don't explain, you don't ask, you don't think out loud. And you get machine-quality results: technically responsive, contextually shallow.

## What actually works

I've built two developer tools recently where the AI collaboration was genuinely different — more questions, more alternatives, more back-and-forth — than anything I'd experienced before. Both times, the shift happened when I stopped asking the AI to execute and started asking it to *think with me*.

The moment that changed one of those projects: I was building a devtools overlay and asked Claude whether we could surface source code hints in the UI. Claude took it seriously and laid out the options. And then I asked a different kind of question entirely: "You're already here when I'm debugging anyway. What would this tool need to look like to actually be useful *to you*?"

That question unlocked a completely different conversation. Not because of any trick — because it was the right question, asked honestly.

The resulting tool ([Stellar](https://stellar.hypertheory-labs.dev)) has a "Copy for AI" export that produces a self-describing causal graph of exactly what happened in the application — what triggered what, what HTTP requests caused which state changes — specifically structured to give an AI assistant what it actually needs to reason about a bug.

Not a human-readable summary with AI sprinkled on top. Designed for the AI consumer first, with the human UI as a secondary layer.

That design came from a conversation, not a prompt template.

## The thing worth actually learning

If you want better results from an AI assistant, the investment isn't in finding better hacks. It's in getting better at explaining your situation — what you're trying to do, what you already tried, what you're uncertain about, what constraints matter.

Those are communication skills. They're useful with human colleagues too. They transfer.

The shortcuts that claim to bypass that work mostly just delay it. At some point the model needs to understand your context, and you either give it directly or you waste time pretending you don't have to.

You don't need tricks. You need a conversation.

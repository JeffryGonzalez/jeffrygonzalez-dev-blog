---
title: Don't Build Smarter Tools — Build Tools That Make Your AI Smarter
author: Jeff Gonzalez
pubDatetime: 2026-04-01
featured: false
draft: false
tags:
  - AI
  - Developer Tools
  - Angular
  - NgRx
slug: build-tools-for-your-ai
description: "The most productive thing I've done lately isn't writing better code — it's building tools designed for my AI assistant to use."
---

Don't build smarter tools. Build tools that make your LLM smarter about your specific context.

That's the thesis. Everything below is how I got there.

## Stellar

I've been building [Stellar](https://stellar.hypertheory-labs.com), an Angular-native replacement for the Redux DevTools browser extension — rebuilt for the NgRx Signal Store era. The existing devtools were designed for a Redux world and the gap between what they show and what Angular developers actually do has been growing ever since.

Partway through building it, I had an obvious-in-retrospect realization. I was asking Claude whether we could surface source code hints in the UI — enrich what developers see in the devtools display. Claude took the question seriously and walked through the options.

And then it hit me:

> Claude is already right there when I'm debugging. It writes a lot of the code in my projects. It's definitely there when something breaks. Why am I building a developer tool that's only useful to *humans*?

So we changed the design. The tool still has a human UI — state history, diffs, HTTP traffic. But it also records a full causal graph: every click, every NgRx event, every HTTP request and response, every resulting state snapshot, and the edges between them showing what caused what. Hit "Copy for AI" and you get a self-describing structured export — not a state dump, but a directed graph of *what actually happened* and *why*.

You paste it, say "after this sequence the cart count shows 4 but I expected 5 — what do you see?", and your assistant can reason about the actual execution instead of guessing from code alone. Same information, different consumer. The design principle is the same as accessibility: build for inclusion from the start.

[The guide on working with AI assistants](https://stellar.hypertheory-labs.dev/guides/working-with-ai/) gives a better sense of what this looks like in practice. Claude wrote that page, which I think is the right kind of recursion.

## The other project

The second tool is more proactive — and notably, it's not Angular-specific. It works with Angular, React, Vue, whatever. It doesn't need to know about your framework because *that's the AI's job*.

You point it at a component, it analyzes what the component does and how it's fetching data, and it generates a prompt you hand to your AI assistant. The prompt asks the assistant to generate [Mock Service Worker](https://mswjs.io) scenarios covering the full range of states your UI needs to handle.

When I fed it a shopping cart component, the AI came back with: fast load, slow load (loading states), empty cart, large cart, 403 response, and edge cases stress-testing currency formatting. It also noticed I was using Angular's `CurrencyPipe` and generated cases for known quirks with that pipe specifically — because the AI read the component and brought its own framework knowledge. The tool just created the conditions for that to happen.

The tool includes a UI to switch between those scenarios in real time while you're developing, so you can watch your component handle each one.

I'll post more on this with a repo link and demo videos shortly.

## The cheat code

Here's the thing I've actually learned from both of these projects, and you don't need a course or a substack to get it:

> Ask your AI assistant: "I want to make what we're doing here as accessible as possible so you have everything you need to help me. What would be useful to you?"

That's it. Just ask. The AI will tell you what context would help it. Then either provide that context, or — if the gap is big enough — build something that does.

The conversations were different — more questions, more alternatives, more genuine back-and-forth — than anything I'd had building tools purely for human consumption. Whatever was happening, it read like excitement. And I feel like I've unlocked a different mode of working.

The traditional frame is: "how do I use AI to build things faster?" That's fine. The more interesting frame is: "how do I build things that make my AI more effective at helping me?"

The answers to that second question turn out to be pretty good software.

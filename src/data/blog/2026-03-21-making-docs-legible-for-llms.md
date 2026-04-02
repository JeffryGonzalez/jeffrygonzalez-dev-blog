---
title: Making Documentation Legible for LLMs
author: Jeff Gonzalez
pubDatetime: 2026-03-21
featured: false
draft: false
tags:
  - AI
  - Documentation
  - Developer Tools
  - LLMs
slug: making-docs-legible-for-llms
description: "LLM-legible documentation is actually two different problems that require different solutions — here's how to think about both."
---

"Make the docs legible for LLMs" turns out to be two distinct problems that require different solutions.

## The two problems

**Problem A: Training data ingestion.** Can a future model's training pipeline crawl and understand your docs? This is the problem most LLM-legibility guides address. It's about robots.txt, static HTML rendering, semantic markup, avoiding JavaScript-only content. Most modern static site generators handle this reasonably well out of the box.

**Problem B: AI coding assistant usability right now.** Can a developer today tell an AI assistant "help me use this library" and get correct, useful guidance? This is the more immediately relevant problem for most library and tool authors. It's about the shape of the content, not just its crawlability.

These are not the same problem. A site can be perfectly crawlable and still be nearly useless to an AI assistant trying to help a developer implement something, because the information is fragmented, inconsistently named, or buried in prose where structured data would serve better.

Most of the time, you should prioritize Problem B.

## What actually helps

**`llms.txt` and `llms-full.txt`**

The `llms.txt` convention (proposed by Jeremy Howard / fast.ai) is analogous to `robots.txt`: a structured markdown file at the root that gives AI systems an orientation to the site and its contents. `llms-full.txt` goes further — it concatenates the entire docs site into a single artifact an AI assistant can consume in one read, without navigating multiple pages.

This matters specifically for AI *coding assistants* (rather than training pipelines) because they often have a single context window to work with. Fragmented docs across many URLs require multiple fetches; a single consolidated artifact is dramatically more useful. If you use [Starlight](https://starlight.astro.build/), the `starlight-llms-txt` plugin generates all three variants automatically.

**`description` frontmatter on every page**

Every page should have a `description` field — a single clear sentence about what the page contains. AI systems use these to decide whether a page is relevant to a given question. Establish this convention from the first page, not as something to retrofit later.

**Canonical, typed code examples**

LLMs pattern-match on examples more than on prose. A well-typed TypeScript example with a realistic scenario teaches more than three paragraphs of description. The pattern that works: minimal example first (shows the shape), realistic example second (shows a real use case), explicit anti-pattern where useful (shows what not to do and why).

**Consistent terminology, never synonyms**

Technical concepts should have one name throughout the docs. Define it once, cross-reference everywhere, never abbreviate or alias to something else in a different section. LLMs that encounter inconsistent naming for the same concept produce inconsistent guidance.

## The dog-fooding principle

If your tool is about making something legible to AI — runtime state, library APIs, whatever — then your documentation should be an instance of the same principle. This is less obvious than it sounds. It informs decisions that might otherwise look like unnecessary overhead: "why do we need `description` frontmatter on a placeholder page?" Because establishing the convention now, consistently, means it's never missing when it matters.

## What to defer

**Documentation graphs** — structured artifacts describing concept relationships and API call graphs. Genuinely useful for complex systems, but requires substantial content to be worth building. `llms-full.txt` is already a reasonable consolidated artifact for most projects at the start.

**Timestamps on pages** — timestamps in docs signal staleness. A page marked "last updated 18 months ago" gets treated with suspicion by both humans and AI systems, even if the content is still accurate. Version the library explicitly; don't timestamp individual pages.

## What to watch

The `llms.txt` convention is still emerging. Adoption is growing but not universal. If a more established standard displaces it, migration is straightforward — the content doesn't change, only the generation mechanism. The investment is low; the upside is real.

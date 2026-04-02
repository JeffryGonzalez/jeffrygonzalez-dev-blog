# jeffrygonzalez.dev Blog — Claude Guide

## What this is

Jeff's personal dev blog, built on Astro (AstroPaper theme). The focus is Angular, NgRx, AI-assisted development, and developer tooling.

## Blog post conventions

- Posts live in `src/data/blog/` as `.md` files
- Filename format: `YYYY-MM-DD-slug.md`
- Required frontmatter fields: `title`, `author`, `pubDatetime`, `draft`, `tags`, `slug`, `description`
- `featured: false` by default; set `true` only when Jeff explicitly asks
- The `blog` skill handles creating new posts — use it instead of creating files manually

## Drafts

Raw drafts live in `drafts/`. When turning a draft into a post, create the file in `src/data/blog/` — don't delete the draft unless Jeff asks.

## Writing style guidance (for Jeff)

Jeff has a tendency to be wordy. When helping him write or edit blog content:

- **Cut ruthlessly.** If a sentence restates what the previous sentence said, delete it.
- **Lead with the point.** Don't build up to the insight — open with it.
- **Trim parentheticals.** Jeff loves asides. Some are great; most can be cut or made into their own sentence.
- **One idea per paragraph.** Long paragraphs often contain two ideas that should be separated or one idea and filler that should be removed.
- **The tagline test.** If Jeff has a punchy one-liner buried at the end, it probably belongs at or near the top.

When Jeff asks for feedback on a draft, flag:
1. Places where he's circling an idea instead of landing it
2. Tangents that don't serve the main point
3. Paragraphs that can be cut in half without losing anything

## Tech stack

- Framework: Astro
- Theme: AstroPaper
- Content: Markdown in `src/data/blog/`
- Schema defined in `src/content.config.ts`
- Config in `src/config.ts`

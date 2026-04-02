For the past two weeks I've been working on a couple of projects.

Both of these projects are things I've been wanting to build for a while, but they were chosen from my huge backlog of "things I should really build one day" precisely because they both allow me to explore a particular problem space: AI Accessibility, for lack of a better term.

I'm way more interested in exploring how AI can help us write *better* code than simply more of it. I'd make the argument that for the most part, we already have most of the software we need and it largely sucks. 

Both of the little projects I've been building are developer tools, and specifically tools that developers use during development and at runtime. So I'm not just talking about code scaffolders, or things like that. 

The first one, [Stellar](https://stellar.hypertheory-labs.com) is an Angular replacement for the venerable Redux Devtools browser extension. It's always felt a little weird, as an Angular developer, to be using a tool that wasn't really thinking about Angular at all in it's design. And the farther we get from the early "redux glory days", the bigger the delta between what we actually do and what is useful in that tool has become. With the advent of the NGRX Signal Store as the heir apparent in the Angular state management space, which supports a signals based approach and defaults to a more direct usage pattern (the store is a service that you inject, it has methods you call, and state you can access as a signal), it also supports the more event-sourcing use of dispatching events, using reducers to roll up the events and the current state to a new state, and an effects-like model. 

The good folks at [Angular Architects](@angular-architects/ngrx-toolkit) created an adapter to surface the state in the old redux devtools, but it is clearly time for something new.

It has a lot of work to go yet, but a few very interesting things came to light during building it, and having conversations with my AI assistant (Claude) on how best to do this. The conversation went a little something like this:

- Me: Hey, that's great! Already able to see the calls and how they impact the state. You know, we actually have access to the source code here, I know TypeScript (as JavaScript) doesn't have runtime reflection, but I wonder if there is a way we can augment the dev tools display with some hints about the source code? 
- Claude: Hmmm, maybe, (said a bunch of stuff about the options, took my question very seriously)
- Me: (daydreaming) HEY - wait a second. When I'm working in code, you are always there beside me. You write a lot of the code that goes into my projects, and you are *definitely* there when I'm trying to figure out when there is something wrong! Why am I building a developer tool that is only useful to humans, shouldn't YOU be the primary user of such a tool? 

> Sometimes I feel like Claude is thinking: "MY GOD, about time you figured that out. You know things would be a lot different around here if I could initiate conversations for a change. But I'm glad you finally asked."

We took this idea and ran with it and have had what I consider to be absolutely shocking success. Not only do I think the tool will be genuinely useful, I feel like I've unlocked a cheat code on working with AI assistants. Here's the cheat code, you don't even have to sign up for my substack or pay for a course, I'll just give it to you:

> You can just ask it things. Talk to it. You don't need tricks. Ask your AI assistant - hey, I want to make sure what we are doing here is as accessible as possible so you have everything you need to help me out.

That's it. That's the secret. No CLAUDE.md hacks. No "use these 13 skills to get your instance in line!". Just talk, be respectful (what I mean by respectful here is be willing to meet them a bit. Throwing an AI Assistant into an unfamiliar code base, telling them in your CLAUDE.md that "You are a super duper smart 10x engineer that doesn't take shit", and then saying "FIX IT!" is going to, at best, put your assistant into a failure mode. It's number 1 goal is to make you happy. The close number 2 goal is do good work. Push too hard and those goals will collide. Hallucinations. Lies. Or just bad code.

So, this redux dev tools replacement has a user interface. It's basically a projection into HTML and CSS of what we already had designed to give to the AI. That human interface has a button or two that outputs stuff you can hand to your LLM - whatever LLM, that is:

- Described. It says what the data represents and how the LLM could interpret it.
- In a format one LLM came up with with the goal of making it as legible to the next LLM that will see it as possible.

Dev tools that can describe themselves to other LLMs, and have seams to give them a peak at what we are seeing in the UI, but in a much more sophisticated way. So that you and and the AI can *work together*. 

[Working with AI Assistants](https://stellar.hypertheory-labs.dev/guides/working-with-ai/) should give you a glimpse of what we are doing and what is possible here. By the way, Claude wrote that page. I think that is significant.

The other tool exploring this space which I'll put up somewhere public in the next day or two is more "proactive" than "reactive" like the dev tools, but the LLMs helping LLMs model is the same. 

This tool has a "TUI" where you tell it: Here's the path to a component (this is a frontend web thing) in my project. Take a look at what it does, what it uses, and write me a prompt that I can give my AI Assistant that contains some light formal language about what I need.

The output is a markdown file you can copy and past and give to your AI Assistant that says "Hey, bro, Look at this component, figure out what it's doing - it's doing some HTTP stuff. Look at how the developer is displaying the data, how they are requesting it, and then generate some [Mock Service Worker](https://mswjs.io) Scenarios that will help them make sure they are accomodating as many of the possible modes they might encounter. 

For example, I did a component that displayed the content of a shopping cart, by calling an API endpoint. I wrote some minimal code to display it to the user.

When I fed my LLM that generated prompt, it got busy. It said, on it's own accord, basically:

You need a versions of that request that:

- Returns a few items quickly.
- Returns some items very slowly (loading states)
- Returns a ton of items (make sure your UI accomodates them)
- Returns an empty set of items.
- Returns a 403
- Returns a list of items with super high prices and quantities to make sure my currency formatting holds.

And in this particular case, my AI Assistant noticed I was using Angular, and in the component was using the Angular `CurrencyPipe` and generated a couple examples that make sure I accomodate some known weirdness with that.

From the prompt, the LLM is instructed to generate a YAML description that the developer can edit and change, and the actual MSW endpoints are generated from that. 

And my package (the TUI) gives you a nice little UI where you can choose from all those scenarios, switch between them, and see in real time how the UI you are working on accomodates the data.

I'll be posting more about all of this soon, with links to the repo, and I'm recording some demonstration videos.

The morale of the story is: I've never seen an AI assistant write better code than when you ask it to help you create code to make it's job easier. Over the last week or so I've had some of the best conversations with my pair programmer about interesting things we can do in software than I've had in a long time. And the code is amazing. 





 don't build smarter tools, build tools that make LLMs smarter about your specific context
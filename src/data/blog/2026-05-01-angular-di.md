---
title: "Scope is a Composition Decision"
author: Jeff Gonzalez
pubDatetime: 2026-05-01T15:51:39.635Z
featured: false
draft: false
tags:
  - Angular
  - DI
slug: angular-services-and-di
description: Angular's dependency injection model, providing services, etc.
---

There's a recurring debate I keep having with Angular developers, and I have a hard time landing the argument cleanly. Let me try here.

The short version: `@Injectable({providedIn: 'root'})` is the wrong default for application code, and the upcoming `@Service` decorator in Angular 22 makes the same mistake twice. Library code is a different story. But for the app you're actually building — the thing in `src/app/` — declaring scope on the service itself inverts a relationship that should never have been inverted.

## The principle

> Scope is a composition decision. Composition decisions belong at the composition root, not on the thing being composed.

That's the whole argument. Everything else in this post is just unpacking what that means and why it matters.

A service is a thing. An _instance_ of a service has a lifetime. Lifetime is determined by _who creates it and when_ — that's a property of how your app is wired together, not a property of the class itself. Putting `providedIn: 'root'` on the class declares the service's own lifetime from inside the service. That's backwards. The service has no business knowing it's a singleton. The app knows.

## What you lose

When scope lives on the service, three things get worse.

**You can't read your composition root anymore.** Open `app.config.ts` in a typical Angular app and you'll see a handful of `provideRouter`, `provideHttpClient`, `provideAnimations` calls. You will not see your `UserService`, `CartStore`, `AuthSession`, or any of the other singletons that _actually define what your app is_. They're scattered across thirty files, each declaring "I am a singleton" in isolation. To know what your app contains, you have to search. That's not architecture. That's hiding.

**You can't override per environment cleanly.** Want a different `LoggingService` in dev vs prod? With `providedIn: 'root'` you fight the framework to do it. With composition-root providers it's a `provideLogging(env)` factory and a one-line swap.

**Tests silently materialize services you didn't ask for.** This is the one I keep forgetting until it bites me. `providedIn: 'root'` services auto-instantiate in `TestBed`. Your "unit test" reaches across the app and pulls in `HttpClient`, a real `Router`, whatever that service depends on. You wrote a focused test; the framework gave you an integration test. The composition-root model forces tests to declare what they need — which is more upfront work, but it means your tests actually do what they say they do.

## Why libraries are different

A library doesn't know its composition root. It can't. A library author writing a `@my-org/feature-flags` package has no idea whether your app wants one global flag service, one per route, or per-tenant in a multi-tenant build. The library's only honest move is to declare a _default_ and let the consumer override.

`providedIn: 'root'` is exactly that mechanism: "here's a sensible default; if the app cares, it can re-provide elsewhere." For libraries, this is right.

For application code, you _are_ the composition root. There's nothing to defer to. You know the answer. Declare it where it belongs.

The line isn't `src/app` versus `node_modules`. The line is _ownership_: does this code know who composes it? If yes, scope goes at the composition point. If no, the class can declare a default.

## The Spring detour

This is not a new argument. Spring shipped it, regretted it, and walked it back over a decade.

- **Spring 1.x (2003):** scope lived in `applicationContext.xml`, on the `<bean>` element. The classes were annotation-free POJOs. Pure composition-root model.
- **Spring 2.5 (2007):** added `@Component`, `@Service`, `@Repository`, plus `@Scope("prototype")` on the class. Scope moved onto the bean. Same mistake we're discussing.
- **Spring 3+ and onward:** introduced `@Configuration` classes with `@Bean` methods. Scope went back to the composition point. The annotation-on-class style still works for backward compat, but the recommended idiom for non-trivial wiring is configuration classes.

Spring tried scope-on-class for about a decade and quietly retreated. Angular is shipping a decorator literally called `@Service` in 2026 — the same name Spring used for the wrong-direction version — and inheriting the exact wart Spring already learned its way out of.

## `@Service` makes it worse

The new `@Service` decorator in Angular 22 auto-provides in root and bans constructor injection. If you don't want auto-provision, you can write `@Service({autoProvide: false})`.

Two problems.

First, banning constructor injection is an ESLint rule. It does not need a decorator. Angular shipped that lint rule years ago in spirit; the function-style `inject()` is already idiomatic. Coupling it to scope behavior is a category error.

Second, and more importantly: `@Service` mashes two orthogonal concerns into one decorator — _scope_ (auto-provide-in-root) and _injection style_ (no constructor params). Those are independent decisions. The fact that `autoProvide: false` exists at all is the tell — someone noticed they're independent and bolted on an escape hatch. A clean design would be: one decorator (or none) for metadata, ESLint for injection style, `appConfig` for scope. Three concerns, three tools, each replaceable.

This is the same shape of mistake as `providedIn: 'root'`. Different concerns conflated into one knob, with an escape hatch that proves the conflation was wrong.

## What to do instead

The recipe is short.

1. **Don't put scope arguments on `@Injectable`** in application code. If you're using `inject()` for everything (which you should be — and which means you don't strictly need `@Injectable()` at all on most service classes), there's nothing left for the decorator to do that belongs in app code.

2. **Wire global services in `app.config.ts`.** Either directly in the providers array or via `provideXxx()` factories that return `EnvironmentProviders`. Your composition root should read like a manifest of what your app contains.

3. **Wire feature services at the route.** With `withExperimentalAutoCleanupInjectors()` in the router, route-level providers get destroyed when the route is left, which gives you correct lifetime semantics for free. This is now the strongest place to put feature-scoped state.

4. **Wire per-instance state at the component.** Form state, table state, dialog context — anything that should have one instance per visible thing on the page. This is one of the legitimate uses of component-level `providers`, not a smell.

5. **Enforce it with ESLint.** Ban `@Injectable({providedIn: ...})` in `src/app/**`. Allow it in libraries, allow it in test files. The rule is one AST match.

## The legitimate re-provisioning cases

Re-providing the same service in multiple places is sometimes correct, and the lint rule should not get in the way of it. The pattern that's always fine: same class, _peer_ locations.

- A `WizardStore` provided at every wizard route. Each wizard gets its own instance. Correct.
- A `DataGridState` provided at a grid component, where the same grid appears multiple times on a page. Each grid has its own state. Correct.
- A `FORM_CONTEXT` re-provided at a sub-form to scope context. CDK and Material do this everywhere. Correct.

The footgun is not "same class, multiple places." The footgun is _unintentional_ re-provision of services that were declared `providedIn: 'root'` and accidentally shadowed at a feature boundary, creating two singletons. That's the one specific pathology to prevent.

## The one-line takeaway

When you put `providedIn: 'root'` on a service in your app code, you are answering a composition question from the wrong end of the codebase. Move the answer to where the question is actually asked.

Spring figured this out. Angular's about to ship the same wrong-direction decorator twice. We don't have to use it.

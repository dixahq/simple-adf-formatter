# ADR-001 - Include language specific formatters in bundle

*Status*: draft (2022-09-18)

---

Formatters supporting specific frameworks have dependencies: A react formatter
requires at least `JSX.element` to be available, a Vue formatter requires - well - Vue, e.g.

It is possible to declare these dependencies as optional `peer` and `dev`
dependency, which allows dropping the package into a framework-specific project
and use the resp. formatter. (At least, it *should*. We need to verify this.)

The upside of this is are:

* Consuming projects could more easily benefit from formatter updates from the
  community.
* The developer experience is streamlined; only one-size-fits all bundle needs
  to be considered.

The approach has the following drawbacks:

* The bundle size is (unnecessarily) increased. Having only the parser and types
  in the bundle would make it weigh in at ~500B. Adding MD, JXS and Vue
  increases the size to 1.5kB, which still isn't much.
* The project definition is more complicated, optional peer dependencies are not
  commonly used.

Alternatives to consider:

* One package containing both parser and formatters. This is the currently
  implemented approach.
* One package for the parser, one package per formatter.
  * `-` More packages to deal with
  * `+` No dependency gymnastics required
  * `+` Minimal bundle sizes
  * `-` Developers have to deal with two packages instead of one and need to
    pick compatible versions.

* One package for the parser, include formatters in examples only as blueprints
  that can be copied.
  * `+` Only one package to deal with
  * `-` Formatter implementations cannot be shared with the community as natural
    part of the project.
  * `+` Example projects allow for a more thorough usage guide
  * `-` Developers have to implement/copy formatters into their own projects.
    Although probably most projects will do so anyway, perhaps extending
    existing formatters.

## Decision

```txt
This section describes our response to these forces. It is stated in full sentences, with active voice. "We will …"
```

### Rationale

```txt
Describe here the rationale for the design decision. Also indicate the rationale for significant rejected alternatives. This section may also indicate assumptions, constraints, requirements, and results of evaluations and experiments.
```

## Consequences

```txt
This section describes the resulting context, after applying the decision. All consequences should be listed here, not just the "positive" ones. A particular decision may have positive, negative, and neutral consequences, but all of them affect the team and project in the future.
```

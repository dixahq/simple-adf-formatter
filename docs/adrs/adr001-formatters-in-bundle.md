# ADR-001 - Include language specific formatters in bundle

*Status*: draft (2022-09-18)

---

Formatters supporting specific frameworks have dependencies: A React formatter
requires at least `JSX.Element` to be available, a Vue formatter requires - well - Vue, e.g.

It is possible to declare these dependencies as optional `peer` and `dev`
dependency, which allows dropping the package into a framework-specific project
and use the resp. formatter. (At least, it *should*. We need to verify this.)

The upside of this is are:

* Consuming projects could more easily benefit from formatter updates from the
  community.
* The developer experience is streamlined; only one-size-fits-all bundle needs
  to be considered.

The approach has the following drawbacks:

* The bundle size is (unnecessarily) increased. Having only the parser and types
  in the bundle would make it weigh in at ~500B. Adding MD, JXS and Vue
  increases the size to 1.5kB, which still isn't much.
* The project definition is more complicated, optional peer dependencies are not
  commonly used.

Alternatives to consider:

* One package containing both parser and formatters. This is the current
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

We'll keep all formatters in the same package using th optional peer dependency approach as described above.

We'll add technology specific example projects in the same project, but won't bundle them.

If we run into issues with optional peer dependencies, we'll re-evaluate.

### Rationale

Even with all formatters in the bundle, its size is still rather small. 
The benefits of having everything in one place (both from a consumption and a maintenance point of view) outweigh the slightly smaller bundle size.

## Consequences

* The package will have dev dependencies coming from multiple frameworks.
* Consuming projects need to provide matching peer dependencies.
* Consumption needs to be tested/shown in example projects.


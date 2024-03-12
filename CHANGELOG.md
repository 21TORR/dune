2.0.1
=====

* (bug) Support all allowed syntaxes in `AnchorIntegration`.


2.0.0
=====

* (feature) Add `AnchorIntegration`.
* (bc) The dist file names changed back to `.js`.


2.0.0-beta.2
============

* (internal) Change the way the package is published.


2.0.0-beta.1
============

* (bc) move `useDebounced`.
* (feature) add `useMediaQuery`.
* (improvement) Add explicit `types` export.
* (feature) Add `handleHttpBasicAuth()`.


2.0.0-beta.0
============

* (bc) Use `react` instead of `preact` for JSX topics.
* (internal) Improve build by removing custom logic and using `exports` in `package.json`
* (bc) Build files to `*.mjs` and `*.d.ts`.
* (improvement) Properly set `type: module` of this package.


1.6.0
=====

*   (feature) add `useDebounced`.


1.5.6
=====

*   (internal) Republish, due to broken release.


1.5.5
=====

*   (improvement) Build TypeScript while preserving the comments.


1.5.4
=====

*   (improvement) `closest()` now properly checks the element itself. If you want the old behavior, use `closest(element.parentElement)` instead.
*   (improvement) You can now call `closest()` with `null` as element.
*   (bug) Fix `delegate` not actually registering the event listener.
*   (improvement) Bump all dependencies.


1.5.3
=====

*   (bug) Fix `registerBodyClickHandler` for pages that have no or a small body.


1.5.2
=====

*   (bug) Fix broken release in `1.5.1`.


1.5.1
=====

*   (improvement) Add callback to `addConsecutiveClasses()`. 


1.5.0
=====

*   (improvement) Add possibility to pass multiple classes to toggle.
*   (feature) Add `addConsecutiveClasses()`.


1.4.0
=====

*   (feature) Add `matchMediaQuery()`.


1.3.0
=====

*   (feature) Add `safeParseJson()`.
*   (feature) Add `parseElementContentAsJson()`.
*   (improvement) Allow to pass a single element to `mount()`.
*   (feature) Add `mountJsx()`.


1.2.1
=====

*   (bug) Actually register the event listener in `once` + add tests.


1.2.0
=====

*   (feature) Add `registerBodyClickHandler()` and `initDismissibleContainer()`.
*   (feature) Add `onNextAnimationFrame()`.


1.1.0
=====

*   (feature) Add `toggleClass()`.


1.0.0
=====

*   (feature) Add `find()` and `findOne()` in `dom/traverse`.
*   (feature) Add `on()`, `off()`, `delegate()`, `onOff()`, `once()` and `trigger()`.
*   (feature) Add `mount()`.

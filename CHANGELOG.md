2.8.0
=====

* (feature) Add `ConsentManagerIntegration`.
* (improvement) Add `hasAnyConsnet` to `useCookiebot`.


2.7.7
=====

* (improvement) Export `ApiError` and `RequestError`.


2.7.6
=====

* (bug) Fix invalid release.


2.7.5
=====

* (internal) Update publishing workflow.


2.7.4
=====

* (internal) Update publishing workflow.


2.7.3
=====

* (improvement) Improve `zod` type usage.


2.7.2
=====

* (improvement) Also pass response in `ApiError`.


2.7.1
=====

* (improvement) Pass more info in `RequestError`.
* (improvement) Use `RequestError` for every request if possible.


2.7.0
=====

* (feature) Add `UsercentricsV3` component for v3 configurations.


2.6.0
=====

* (improvement) Bump zod to `4.x`
* (feature) Add proper return values for `fetchApi()`.


2.5.2
=====

* (improvement) Added culture property to cookiebot snippet.


2.5.1
=====

* (bug) Fix invalid import in `api`.


2.5.0
=====

* (improvement) Only support React 19+.
* (feature) Add `fetchApi()` helper.
* (improvement) Remove dependency that can be built natively.


2.4.0
=====

* (feature) add `useUsercentricsServiceConsent`, a hook that integrates the status of the given usercentrics service by id


2.3.1
=====

* (improvement) Add method `integrateHttpBasicAuth()` for handling a list of Http Basic Auth Credentials
* (deprecation) Deprecate `handleHttpBasicAuth` method


2.3.0
=====

* (feature) Add `<UsercentricsSmartDataProtector>` snippet component.


2.2.3
=====

* (improvement) Improve Types of `mountJsx`.


2.2.2
=====

* (improvement) Add more parameters for `<Usercentrics>` component.
* (improvement) Add `parseLocale` function.


2.2.1
=====

* (improvement) Remove internal `elementMatches()` helper.
* (improvement) Remove outdated `CustomEvent` workaround.
* (deprecation) Deprecate `createEvent` helper.
* (improvement) Remove outdated `MediaQueryList.addEventListener()` workaround.


2.2.0
=====

* (improvement) Add `isAbortError()`.
* (feature) Add Usercentrics hook.
* (feature) Add `<Usercentrics>` snippet component.


2.1.1
=====

* (bug) Remove debug output div


2.1.0
=====

* (feature) Add `ClientOnlyPortal`.
* (feature) Add Cookiebot hook.
* (feature) Add `<Cookiebot>` snippet component.


2.0.2
=====

Fix invalid version numbers.


2.0.1
=====

* (bug) Support all allowed syntaxes in `AnchorIntegration`.
* (improvement) Widen allowed type in JSON functions.


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

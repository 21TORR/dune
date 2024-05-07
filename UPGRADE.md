2.x to 3.0
==========

* The `createEvent` helper was removed, use `new CustomEvent()` directly.
* Removed `matchMediaQuery()`, use `window.matchMedia()` directly.
* Removed `addConsecutiveClasses()`, use Framer Motion or a different animation library instead.


1.x to 2.0
============

* The import path for `mount()` has changed `/mount.js -> /react/mount.mjs`.
* The import path for `useDebounced` has changed `/debounce -> /react/hooks/debounce`.

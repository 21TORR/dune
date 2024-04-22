/**
 * Returns whether the given error is an abort "error".
 *
 * This will be thrown in a fetch() when aborting the request.
 *
 * @example
 * const controller = new AbortController();
 * fetch(..., {signal: controller.signal})
 *     .catch(error => isAbortError(error) // will be true)
 * controller.abort();
 */
export function isAbortError (error: unknown) : boolean
{
	return error instanceof DOMException && error.name === "AbortError";
}

/**
 * Finds the first element matching the selector.
 * The search can be constrained to a specific root element, via the `context` parameter.
 */
export function findFirst <ElementType extends HTMLElement = HTMLElement> (selector: string, context: Document|HTMLElement = document) : ElementType|null
{
	return context.querySelector(selector);
}


/**
 * Finds all elements matching the selector.
 * The search can be constrained to a specific root element, via the `context` parameter.
 */
export function find <ElementType extends HTMLElement = HTMLElement> (selector: string, context: Document|HTMLElement = document) : ElementType[]
{
	return Array.prototype.slice.call(context.querySelectorAll(selector));
}

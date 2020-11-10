import {fetchSiblings} from './lib/traverse-helpers';


/**
 * Finds the first element matching the selector.
 * The search can be constrained to a specific root element, via the `context` parameter.
 */
export function findFirst <ElementType extends HTMLElement> (selector: string, context: Document|HTMLElement = document) : ElementType|null
{
	return context.querySelector(selector);
}


/**
 * Finds all elements matching the selector.
 * The search can be constrained to a specific root element, via the `context` parameter.
 */
export function find <ElementType extends HTMLElement> (selector: string, context: Document|HTMLElement = document) : ElementType[]
{
	return Array.prototype.slice.call(context.querySelectorAll(selector));
}


/**
 * Returns all previous siblings
 * (optionally matching the given selector)
 *
 * The nearest sibling is the first element in the list.
 */
export function prev<ElementType extends HTMLElement> (element: HTMLElement, selector: string|null = null) : ElementType[]
{
	return fetchSiblings<ElementType>(element, selector, "previousElementSibling");
}


/**
 * Returns all following siblings
 * (optionally matching the given selector)
 *
 * The nearest sibling is the first element in the list.
 */
export function next<ElementType extends HTMLElement> (element: HTMLElement, selector: string|null = null) : ElementType[]
{
	return fetchSiblings<ElementType>(element, selector, "nextElementSibling");
}

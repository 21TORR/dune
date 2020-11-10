import {elementMatches, fetchSiblings} from './lib/traverse-helpers';


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
 * Returns all children
 */
export function children<ElementType extends HTMLElement = HTMLElement> (parent : Element, selector : string|null = null) : ElementType[]
{
	const list : ElementType[] = [];
	let child = parent.firstElementChild;

	while (child)
	{
		if (elementMatches(child, selector))
		{
			list.push(child as ElementType);
		}

		child = child.nextElementSibling;
	}

	return list;
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


/**
 * Returns the closest parent that matches the selector.
 *
 * If a root element is given, the parent is only searched up to (and excluding) this root node.
 */
export function closest<ElementType extends HTMLElement> (element: HTMLElement, selector: string, rootElement: Element|null = null) : ElementType|null
{
	let parent = element.parentElement;

	while (null !== parent && rootElement !== parent)
	{
		if (elementMatches(parent, selector))
		{
			return parent as ElementType;
		}

		parent = parent.parentElement;
	}

	return null;
}


/**
 * Returns whether the node is a child element from the parent (includes being the node itself).
 */
export function isChildOf (parent: Node, node: Node): boolean
{
	let pointer: Node|null = node;

	while (pointer !== null)
	{
		if (pointer === parent)
		{
			return true;
		}

		pointer = pointer.parentNode;
	}

	return false;
}

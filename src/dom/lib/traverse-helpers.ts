const polyfilledElementMatches = Element.prototype.matches
	|| (Element.prototype as any).msMatchesSelector
	|| (Element.prototype as any).webkitMatchesSelector;


/**
 * Returns whether the given element matches the optional selector
 *
 * @internal
 */
export function elementMatches<ElementType extends Element> (element: ElementType, selector: string|null = null) : boolean
{
	return (null === selector) || polyfilledElementMatches.call(element, selector);
}


/**
 * Fetches all siblings, in the given direction.
 * Will start from the given element, traverse in the given direction and fetch the first (or all) matches
 *
 * @internal
 */
export function fetchSiblings<ElementType extends HTMLElement> (
	element: HTMLElement,
	selector: string|null,
	accessor: "previousElementSibling" | "nextElementSibling"
) : ElementType[]
{
	let sibling = element[accessor];
	const list: ElementType[] = [];

	while (sibling)
	{
		if (elementMatches(sibling, selector))
		{
			list.push(sibling as ElementType);
		}

		sibling = sibling[accessor];
	}

	return list;
}

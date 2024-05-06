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
		if (null === selector || sibling.matches(selector))
		{
			list.push(sibling as ElementType);
		}

		sibling = sibling[accessor];
	}

	return list;
}

/**
 * Adds two classes in consecutive animation frames.
 */
export function addConsecutiveClasses (
	element: HTMLElement,
	firstClass: string,
	secondClass: string,
	onUpdate?: (end: boolean) => void,
) : void
{
	requestAnimationFrame(() =>
	{
		element.classList.add(firstClass);

		if (onUpdate)
		{
			onUpdate(false);
		}

		requestAnimationFrame(() =>
		{
			// check if something changed in the meantime
			if (element.classList.contains(firstClass))
			{
				element.classList.add(secondClass);
			}

			if (onUpdate)
			{
				onUpdate(true);
			}
		});
	});
}

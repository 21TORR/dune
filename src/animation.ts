/**
 * Adds two classes in consecutive animation frames.
 */
export function addConsecutiveClasses (element: HTMLElement, firstClass: string, secondClass: string) : void
{
	requestAnimationFrame(() => {
		element.classList.add(firstClass);

		requestAnimationFrame(() => {
			// check if something changed in the meantime
			if (element.classList.contains(firstClass))
			{
				element.classList.add(secondClass);
			}
		});
	});
}

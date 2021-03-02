/**
 * Toggles the class on the given element(s).
 */
export function toggleClass (element: HTMLElement|HTMLElement[], className: string, addClass: boolean) : void
{
	const elements = Array.isArray(element) ? element : [element];
	elements.forEach(item => {
		item.classList[addClass ? "add" : "remove"](className);
	});
}

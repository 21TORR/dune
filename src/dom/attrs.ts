/**
 * Toggles the class on the given element(s).
 */
export function toggleClass (element: HTMLElement|HTMLElement[], className: string|string[], addClass: boolean) : void
{
	const classes = Array.isArray(className) ? className : [className];
	const elements = Array.isArray(element) ? element : [element];
	elements.forEach(item => {
		classes.forEach(classToChange => item.classList[addClass ? "add" : "remove"](classToChange));
	});
}

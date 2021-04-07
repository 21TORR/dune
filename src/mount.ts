import {find} from './dom/traverse';
import {ComponentFactory, h, render} from 'preact';
import xtend from 'xtend';
import {parseElementContentAsJson} from './json';

type MountableFunction = (element: HTMLElement, ...args: unknown[]) => unknown;
interface MountableFunctionOptions {
	context?: HTMLElement|Document;
	args?: any[];
}
interface MountableJsxOptions <ComponentProperty> {
	context?: HTMLElement|Document;
	/**
	 * The container class to wrap the element in
	 */
	wrap?: string;
	args?: ComponentProperty;
}

/**
 * Mounts the mountable function on the elements.
 */
export function mount (
	selector: string|HTMLElement|HTMLElement[],
	mountable: MountableFunction,
	options: MountableFunctionOptions = {}
) : void
{
	const elements = typeof selector === "string"
		? find(selector, options.context || document)
		: Array.isArray(selector) ? selector : [selector];

	elements.forEach(element => mountable(element, ...(options.args || [])));
}


/**
 * Mounts the JSX component on the elements.
 */
export function mountJsx <ComponentProperty = Record<string, unknown>> (
	selector: string|HTMLElement|HTMLElement[],
	mountable: ComponentFactory,
	options: MountableJsxOptions<ComponentProperty> = {}
) : void
{
	const elements = typeof selector === "string"
		? find(selector, options.context || document)
		: Array.isArray(selector) ? selector : [selector];

	elements.forEach(element =>
	{
		const parent = element.parentElement;
		let params = options.args || {};
		let target: HTMLElement;

		if (!parent)
		{
			console.error(`Can't mount on container without parent.`, element);
			return;
		}

		// try to parse the content as JSON
		params = xtend(params, parseElementContentAsJson(element) || {});

		// wrap or use the parent as target
		if (options.wrap)
		{
			target = document.createElement("div");
			target.classList.add(options.wrap);
			parent.insertBefore(target, element);
		}
		else
		{
			target = parent;
		}

		// remove the original element
		parent.removeChild(element);

		render(
			h(mountable, params),
			target
		);
	});
}

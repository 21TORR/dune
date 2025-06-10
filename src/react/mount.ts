import {find} from '../dom/traverse';
import xtend from 'xtend';
import {parseElementContentAsJson} from '../json';
import {ComponentType, createElement} from 'react';
import {createRoot} from 'react-dom/client';

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
	options: MountableFunctionOptions = {},
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
	mountable: ComponentType<Partial<ComponentProperty>>,
	options: MountableJsxOptions<ComponentProperty> = {},
) : void
{
	const elements = typeof selector === "string"
		? find(selector, options.context || document)
		: Array.isArray(selector) ? selector : [selector];

	elements.forEach(element =>
	{
		const parent = element.parentElement;
		let params = options.args || {};

		if (!parent)
		{
			console.error(`Can't mount on container without parent.`, element);
			return;
		}

		// try to parse the content as JSON
		params = xtend(params, parseElementContentAsJson<Record<string, unknown>>(element) || {});

		// wrap or use the parent as target
		const target = document.createElement("div");
		parent.insertBefore(target, element);

		if (options.wrap)
		{
			target.classList.add(options.wrap);
		}

		// remove the original element
		parent.removeChild(element);

		const appRoot = createRoot(target);
		appRoot.render(createElement(mountable, params));
	});
}

import {find} from './dom/traverse';

type MountableFunction = (element: HTMLElement, ...args: unknown[]) => unknown;
interface MountableFunctionOptions {
	context?: HTMLElement|Document;
	args?: any[];
}

/**
 * Mounts the mountable function on the elements.
 */
export function mount (
	selector: string|HTMLElement[],
	mountable: MountableFunction,
	options: MountableFunctionOptions = {}
) : void
{
	const elements = typeof selector === "string"
		? find(selector, options.context || document)
		: selector;

	elements.forEach(element => mountable(element, ...(options.args || [])));
}

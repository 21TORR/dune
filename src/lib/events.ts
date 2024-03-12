import {EventName} from '../dom/events.js';

/**
 * Creates a new custom event
 */
export function createEvent (type: EventName, args: CustomEventInit): CustomEvent
{
	if (typeof CustomEvent !== "function")
	{
		const event = document.createEvent("CustomEvent");
		event.initCustomEvent(type, args.bubbles, args.cancelable, args.detail);
		return event;
	}

	return new CustomEvent(type, args);
}

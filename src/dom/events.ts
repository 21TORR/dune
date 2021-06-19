import {splitStringValue} from '../lib/string';
import {closest} from './traverse';
import {createEvent} from '../lib/events';

type EventHandler <EventType extends Event> = (event: EventType) => any;
type DelegatedEventHandler <EventType extends Event, ElementType extends HTMLElement> = (event: EventType, delegateTarget: ElementType) => any;
type ExtendedEventTarget = Array<EventTarget|null> | EventTarget | null;
export type EventName = keyof HTMLElementEventMap | string;
type ExtendedEventName = EventName[] | EventName;
type UnregisterEventCallback = () => void;

/**
 * Registers a new event listener
 */
export function on <EventType extends Event> (
	element: ExtendedEventTarget,
	type: ExtendedEventName,
	handler: EventHandler<EventType>,
	options: boolean|AddEventListenerOptions = false
) : void
{
	const elements = Array.isArray(element) ? element : [element];

	elements.forEach(element =>
	{
		if (!element)
		{
			return;
		}

		splitStringValue(type).forEach(eventType => element.addEventListener(eventType, handler, options));
	});
}


/**
 * Removes the event listener for the given event
 */
export function off (
	element: ExtendedEventTarget,
	type: ExtendedEventName,
	handler: EventHandlerNonNull
) : void
{

	const elements = Array.isArray(element) ? element : [element];

	elements.forEach(element =>
	{
		if (!element)
		{
			return;
		}

		splitStringValue(type).forEach(eventType => element.removeEventListener(eventType, handler));
	});
}


/**
 * Registers an event listener, that is automatically removed after it was executed once.
 *
 * Returns a function to unregister the handler.
 */
export function once <EventType extends Event> (
	element: EventTarget|null,
	type: EventName,
	handler: EventHandler<EventType>
) : UnregisterEventCallback
{
	if (!element)
	{
		return () => { /* empty dummy callback */ };
	}

	const wrappedHandler = (event: EventType) =>
	{
		handler(event);
		off(element, type, wrappedHandler);
	};

	on(element, type, wrappedHandler);
	return () => off(element, type, wrappedHandler);
}


/**
 * Registers a delegated event listener on the given element.
 * It will match any child element with the given selector.
 *
 * An event on the main element will NOT match.
 */
export function delegate <EventType extends Event, ElementType extends HTMLElement> (
	element: EventTarget|null,
	selector: string,
	type: EventName,
	handler: DelegatedEventHandler<EventType, ElementType>
) : UnregisterEventCallback
{
	const wrappedHandler = (event: EventType) =>
	{
		const delegateTarget = closest(event.target as HTMLElement, selector, element as HTMLElement);

		if (delegateTarget)
		{
			handler(event, delegateTarget as ElementType);
		}
	};

	return onOff(element, type, wrappedHandler);
}

/**
 * Registers an event listener on the given element and returns the function to remove it
 */
export function onOff <EventType extends Event> (
	element: EventTarget|null,
	type: EventName,
	handler: EventHandler<EventType>
) : UnregisterEventCallback
{
	if (!element)
	{
		return () => { /* empty dummy callback */ };
	}

	on(element, type, handler);
	return () => off(element, type, handler);
}


/**
 * Triggers a custom event on the given element
 */
export function trigger (
	element: EventTarget|null,
	type: EventName,
	data?: unknown
) : void
{
	// @legacy IE 11 doesn't support the global CustomEvent
	if (!element)
	{
		return;
	}

	element.dispatchEvent(createEvent(type, {
		bubbles: true,
		cancelable: true,
		detail: data,
	}));
}

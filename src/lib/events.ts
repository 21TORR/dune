import {EventName} from '../dom/events';

/**
 * Creates a new custom event
 */
export function createEvent (type: EventName, args: CustomEventInit): CustomEvent
{
	return new CustomEvent(type, args);
}

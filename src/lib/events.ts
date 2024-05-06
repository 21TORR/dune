import {EventName} from '../dom/events';

/**
 * Creates a new custom event
 *
 * @deprecated Just use the CustomEvent constructor directly
 */
export function createEvent (type: EventName, args: CustomEventInit): CustomEvent
{
	return new CustomEvent(type, args);
}

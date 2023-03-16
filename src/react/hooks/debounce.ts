import {useEffect, useState} from "react";

/**
 * Hook that debounces the given value.
 *
 * The `onSetCallback` is called every time the value is actually set.
 */
export function useDebounced <TValue = unknown> (
	value: TValue,
	delay: number,
	onSetCallback?: () => void
) : TValue
{
	// State and setters for debounced value
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(
		() =>
		{
			const timer = window.setTimeout(
				() =>
				{
					setDebouncedValue(value);

					if (onSetCallback)
					{
						onSetCallback();
					}
				},
				delay
			);

			return () => window.clearTimeout(timer);
		},
		[delay, onSetCallback, value],
	);

	return debouncedValue;
}

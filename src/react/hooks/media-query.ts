import {useEffect, useState} from "react";

/**
 * Custom hook to trigger things on breakpoints
 */
export function useMediaQuery (query: string) : boolean
{
	const [isActive, setActive] = useState(false);

	useEffect(() =>
	{
		const mediaQuery = window.matchMedia(query);
		setActive(mediaQuery.matches);

		const updater = (event: MediaQueryListEvent) => setActive(event.matches);

		// some old browsers doesn't support addEventListener on MediaQueryList, so we use a fallback for them
		if (mediaQuery.addEventListener)
		{
			mediaQuery.addEventListener("change", updater);
		}
		else
		{
			mediaQuery.addListener(updater);
		}

		return () =>
		{
			if (mediaQuery.removeEventListener)
			{
				mediaQuery.removeEventListener("change", updater);
			}
			else
			{
				mediaQuery.removeListener(updater);
			}
		};
	}, [query]);

	return isActive;
}

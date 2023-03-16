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
		mediaQuery.addEventListener("change", updater);

		return () => mediaQuery.removeEventListener("change", updater);
	}, [query]);

	return isActive;
}

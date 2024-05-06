export type MediaQueryChangeListener = (matches: boolean) => void;

export interface MediaQueryMatcher
{
	on(callback: MediaQueryChangeListener): void;
	off(callback: MediaQueryChangeListener): void;
	onOff(callback: MediaQueryChangeListener): () => void;
	matches(): boolean;
	destroy(): void;
}

/**
 * Creates a new media query matcher
 */
export function matchMediaQuery (query: string): MediaQueryMatcher
{
	const media = window.matchMedia(query);
	let listeners: MediaQueryChangeListener[] = [];
	const update = (event: MediaQueryListEvent) => listeners.forEach(listener => listener(event.matches));

	media.addEventListener("change", update);

	return {
		/**
		 * Registers a callback
		 */
		on (callback: MediaQueryChangeListener) : void
		{
			listeners.push(callback);
		},

		/**
		 * Unregisters a callback
		 */
		off (callback: MediaQueryChangeListener) : void
		{
			const index = listeners.indexOf(callback);

			if (-1 < index)
			{
				listeners.splice(index, 1);
			}
		},

		/**
		 * Returns whether the query matches right now
		 */
		matches () : boolean
		{
			return media.matches;
		},

		/**
		 * Registers a callback + returns the unregister function.
		 */
		onOff (callback: MediaQueryChangeListener) : () => void
		{
			this.on(callback);
			return () => this.off(callback);
		},

		/**
		 * Destroys the matcher
		 */
		destroy (): void
		{
			listeners = [];
			media.removeEventListener("change", update);
		}
	};
}

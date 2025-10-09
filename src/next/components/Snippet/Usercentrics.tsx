import React, {ReactElement} from "react";
import Script from "next/script";
import {parseLocale} from "../../../lib/locale";

export type UsercentricsProps = Readonly<{
	id: string;
	production?: boolean;
	locale: string;
}>;

/**
 * This component will *only* work with v2 configuration IDs. If you're trying to use this component with a v3 configuration,
 * the website will become unscrollable as Usercentrics web-component silently fails to load and blocks any scrolling.
 */
export function Usercentrics (props: UsercentricsProps): ReactElement | null
{
	const isProd = true === props.production;
	const language = parseLocale(props.locale)?.language ?? undefined;

	return (
		<Script
			id="usercentrics-cmp"
			src="https://app.usercentrics.eu/browser-ui/latest/loader.js"
			data-version={!isProd ? "preview" : undefined}
			data-settings-id={props.id}
			data-language={language}
			async
		/>
	);
}

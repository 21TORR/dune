import React, {ReactElement} from "react";
import Script from "next/script";
import {parseLocale} from "../../../lib/locale";

export type UsercentricsV3Props = Readonly<{
	id: string;
	production?: boolean;
	locale?: string;
}>;

/**
 * This component will *only* work with v3 configuration IDs. For v2 configurations, use the `Usercentrics` component instead.
 */
export function UsercentricsV3 (props: UsercentricsV3Props): ReactElement
{
	const {
		id,
		production,
		locale,
	} = props;

	const isProd = true === production;
	const language = undefined !== locale
		? (parseLocale(locale)?.language ?? undefined)
		: undefined;

	return (
		<Script
			id="usercentrics-cmp"
			src="https://web.cmp.usercentrics.eu/ui/loader.js"
			data-draft={!isProd ? "true" : undefined}
			data-settings-id={id}
			data-language={language}
			async
		/>
	);
}

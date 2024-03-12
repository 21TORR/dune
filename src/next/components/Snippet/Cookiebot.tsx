import React, {ReactElement} from "react";
import Script from "next/script.js";

export type ConsentManagerProps = Readonly<{
	id: string;
}>

export function Cookiebot (props: ConsentManagerProps): ReactElement|null
{
	return (
		<Script
			id="Cookiebot"
			src="https://consent.cookiebot.eu/uc.js"
			data-cbid={props.id}
			async
		/>
	);
}

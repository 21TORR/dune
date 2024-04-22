import React, {ReactElement} from "react";
import Script from "next/script";

export type UsercentricsProps = Readonly<{
	id: string;
}>;

export function Usercentrics (props: UsercentricsProps): ReactElement | null
{
	return (
		<Script
			id="usercentrics-cmp"
			data-settings-id={props.id}
			src="https://app.usercentrics.eu/browser-ui/latest/loader.js"
			async
		/>
	);
}

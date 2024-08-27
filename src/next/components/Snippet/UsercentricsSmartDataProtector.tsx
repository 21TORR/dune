"use client";

import React, {ReactElement} from "react";
import Script from "next/script";

type WindowWithUsercentricsSmartDataProtector = Window & Readonly<{
	uc?: {
		blockElements(elements: Record<string, string>): void;
		reloadOnOptIn(key: string): void;
		reloadOnOptOut(key: string): void;
	};
}>;

export const USERCENTRICS_SERVICE_PROVIDER_KEYS = {
	GOOGLE_MAPS: "S1pcEj_jZX",
} as const;

type UsercentricsSerivceProviderInternalKeys = keyof typeof USERCENTRICS_SERVICE_PROVIDER_KEYS;
type UsercentricsSerivceProviderKey = typeof USERCENTRICS_SERVICE_PROVIDER_KEYS[UsercentricsSerivceProviderInternalKeys] | string;
type HTMLSelector = string;

type UsercentricsSmartDataProtectorProps = Readonly<{
	/**
	 * Define here the elements that cannot be automatically recognized by Usercentrics, such as Google Maps in a div, instead of iframe.
	 */
	elements?: Record<UsercentricsSerivceProviderKey, HTMLSelector>;
	/**
	 * Define the service provider keys here for which the page should be reloaded if the related consent changes.
	 * If the key is already used in `elements`, it does not need to be added here again.
	 */
	reloadKeys?: UsercentricsSerivceProviderKey[],
}>;

export function UsercentricsSmartDataProtector (props: UsercentricsSmartDataProtectorProps): ReactElement | null
{
	const keys = new Set(
		[
			...(Object.keys(props.elements ?? {})),
			...(props.reloadKeys ?? []),
		],
	);

	return (
		<Script
			id="usercentrics-smart-data-protector"
			src="https://privacy-proxy.usercentrics.eu/latest/uc-block.bundle.js"
			onReady={() =>
			{
				const uc = (window as WindowWithUsercentricsSmartDataProtector).uc;

				if (!uc)
				{
					console.warn("uc isn't defined");
					return;
				}

				if (props.elements)
				{
					uc.blockElements(props.elements);
				}

				keys.forEach((key) =>
				{
					uc.reloadOnOptIn(key);
					uc.reloadOnOptOut(key);
				});
			}}
		/>
	);
}

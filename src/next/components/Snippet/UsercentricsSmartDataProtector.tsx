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
	elements?: Record<UsercentricsSerivceProviderKey, HTMLSelector>;
}>;

export function UsercentricsSmartDataProtector (props: UsercentricsSmartDataProtectorProps): ReactElement | null
{
	const keys = props.elements ? Object.keys(props.elements) : [];

	return (
		<Script
			id="usercentrics-smart-data-protector"
			src="https://privacy-proxy.usercentrics.eu/latest/uc-block.bundle.js"
			onReady={() =>
			{
				const uc = (window as WindowWithUsercentricsSmartDataProtector).uc;

				if (!props.elements || !uc)
				{
					return;
				}

				uc.blockElements(props.elements);

				keys.forEach((key) =>
				{
					uc.reloadOnOptIn(key);
					uc.reloadOnOptOut(key);
				});
			}}
		/>
	);
}

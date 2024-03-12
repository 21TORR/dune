"use client";

import {useEffect, useState} from "react";

type WindowWithCookiebot = Window & Readonly<{
	Cookiebot?: {
		renew(): void;
		consent?: {
			marketing: boolean;
			necessary: boolean;
			preferences: boolean;
			statistics: boolean;
			method: "explicit";
			stamp: string;
		}
	};
}>;

type ConsentSettings = {
	marketing: boolean;
	preferences: boolean;
	statistics: boolean;
	stamp: string;
};

type CookiebotSettings = Readonly<{
	openConsentManager(): void;
	consent: Omit<ConsentSettings, "stamp">;
}>;

/**
 * Hook to interact with Cookiebot.
 */
export function useCookiebot () : CookiebotSettings
{
	const [consent, setConsent] = useState<ConsentSettings>({
		stamp: "unset",
		marketing: false,
		preferences: false,
		statistics: false,
	});

	useEffect(() =>
	{
		const onConsentUpdated = () =>
		{
			const global = window as WindowWithCookiebot;

			if (!global.Cookiebot || !global.Cookiebot.consent || consent.stamp === global.Cookiebot.consent.stamp)
			{
				return;
			}

			setConsent({
				...global.Cookiebot.consent,
			});
		};
		onConsentUpdated();

		window.addEventListener("CookiebotOnConsentReady", onConsentUpdated);

		return () =>
		{
			window.removeEventListener("CookiebotOnConsentReady", onConsentUpdated);
		};
	}, [consent.stamp]);

	return {
		consent,
		openConsentManager ()
		{
			(window as WindowWithCookiebot).Cookiebot?.renew();
		},
	};
}

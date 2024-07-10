"use client";

import {useEffect, useState} from "react";

type WindowWithUsercentrics = Window & Readonly<{
	UC_UI?: {
		showFirstLayer(): void;
		showSecondLayer(): void;
		restartEmbeddings(): void;
	};
}>;

/**
 * The essential key
 */
type UsercentricsConsentCategories = "essential" | "marketing" | "functional" | "statictics" | string;
type UsercentricsEvent = CustomEvent<{
	ucCategory: Partial<Record<UsercentricsConsentCategories, boolean>>;
}>;



type UsercentricsSettings = Readonly<{
	openConsentManager(): void;
	showSecondLayer(): void;
	restartEmbeddings(): void;
	hasAnyConsent: boolean;
	/**
	 * Contains all categories with consent apart from the essential categories
	 */
	consent: Record<UsercentricsConsentCategories, boolean>;
}>;


/**
 * Custom hook to integrate with user centrics
 */
export function useUsercentrics () : UsercentricsSettings
{
	const [consent, setConsent] = useState<Record<UsercentricsConsentCategories, boolean>>({
		marketing: false,
		functional: false,
		statistics: false,
	});

	useEffect(() =>
	{
		const onUsercentricsEvent = (event: UsercentricsEvent) =>
		{
			const newConsent: Partial<Record<UsercentricsConsentCategories, boolean>> = event.detail.ucCategory;

			setConsent({
				...newConsent,
				marketing: newConsent.marketing ?? false,
				functional: newConsent.functional ?? false,
				statistics: newConsent.statistics ?? false,
			});
		};

		window.addEventListener("ucEvent", onUsercentricsEvent as EventListener);

		return () =>
		{
			window.removeEventListener("ucEvent", onUsercentricsEvent as EventListener);
		}
	}, []);

	return {
		consent,
		hasAnyConsent: Object.keys(consent).some(category => "essential" !== category && consent[category]),
		openConsentManager (): void
		{
			(window as WindowWithUsercentrics).UC_UI?.showFirstLayer();
		},
		showSecondLayer (): void
		{
			(window as WindowWithUsercentrics).UC_UI?.showSecondLayer();
		},
		restartEmbeddings (): void
		{
			(window as WindowWithUsercentrics).UC_UI?.restartEmbeddings();
		},
	}
}

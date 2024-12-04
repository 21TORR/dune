"use client";

import {useEffect, useState} from "react";

type WindowWithUsercentrics = Window & Readonly<{
	UC_UI?: {
		isInitialized(): boolean;
		getServicesBaseInfo(): UsercentricsServiceBasicInfo[];
		showFirstLayer(): void;
		showSecondLayer(serviceId?: string): void;
		acceptService(serviceId: string): void;
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

/**
 * This type has even more properties, but we have only declared the ones we currently need here.
 */
type UsercentricsServiceBasicInfo = {
	id: string;
	consent: {
		status: boolean;
	};
};


/**
 * Get the usercentrics service item by serviceId
 *
 * @param serviceId service provider id of the service in usercentrics
 */
function getUsercentricsService (serviceId: string): UsercentricsServiceBasicInfo|undefined
{
	return (window as WindowWithUsercentrics).UC_UI?.getServicesBaseInfo().find((service) => service.id === serviceId);
}



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
 * Custom hook to integrate with usercentrics
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
		};
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
	};
}



type UsercentricsServiceConsent = Readonly<{
	isAccepted: boolean;
	acceptConsent(): void;
	openInformation(): void;
}>;

/**
 * Hook that integrate the status of the given usercentrics service by id
 *
 * @param serviceId service provider id of the service in usercentrics
 */
export function useUsercentricsServiceConsent (serviceId: string): UsercentricsServiceConsent
{
	const [consent, setConsent] = useState<boolean>(false);

	const updateConsent = (newState: boolean|undefined)=>
	{
		if (newState === undefined)
		{
			return;
		}

		setConsent(newState);
	};

	useEffect(() =>
	{
		const onUsercentricsEvent = () =>
		{
			const service = getUsercentricsService(serviceId);

			updateConsent(service?.consent.status);
		};

		onUsercentricsEvent();

		window.addEventListener("ucEvent", onUsercentricsEvent as EventListener);
		window.addEventListener("UC_UI_INITIALIZED", onUsercentricsEvent as EventListener);

		return () =>
		{
			window.removeEventListener("ucEvent", onUsercentricsEvent as EventListener);
			window.removeEventListener("UC_UI_INITIALIZED", onUsercentricsEvent as EventListener);
		};
	}, []);

	return {
		isAccepted: consent,
		acceptConsent: () => (window as WindowWithUsercentrics).UC_UI?.acceptService(serviceId),
		openInformation: () => (window as WindowWithUsercentrics).UC_UI?.showSecondLayer(serviceId),
	};
}

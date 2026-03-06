"use client";

import React, {Fragment, type ReactElement, type ReactNode} from "react";
import {Cookiebot, type ConsentManagerProps} from "./Cookiebot";
import {Usercentrics, type UsercentricsProps} from "./Usercentrics";
import {UsercentricsV3, type UsercentricsV3Props} from "./UsercentricsV3";
import {useCookiebot} from "../../../react/hooks/cookiebot";
import {useUsercentrics} from "../../../react/hooks/usercentrics";

type CookiebotIntegration = Readonly<Omit<ConsentManagerProps, "id"> & {
	cookiebot: ConsentManagerProps["id"];
}>;

type UsercentricsV2Integration = Readonly<Omit<UsercentricsProps, "id"> & {
	usercentricsV2: UsercentricsProps["id"];
}>;

type UsercentricsV3Integration = Readonly<Omit<UsercentricsV3Props, "id"> & {
	usercentricsV3: UsercentricsV3Props["id"];
}>;

type ConsentIntegration = CookiebotIntegration | UsercentricsV2Integration | UsercentricsV3Integration;

function isCookiebot (consent: ConsentIntegration): consent is CookiebotIntegration
{
	return "cookiebot" in consent;
}

function isUsercentricsV2 (consent: ConsentIntegration): consent is UsercentricsV2Integration
{
	return "usercentricsV2" in consent;
}

function isUsercentricsV3 (consent: ConsentIntegration): consent is UsercentricsV3Integration
{
	return "usercentricsV3" in consent;
}

type ConsentManagerIntegrationProps = Readonly<{
	embedOnAnyConsent?: ReactNode;
	consent: ConsentIntegration;
}>;

export function ConsentManagerIntegration (props: ConsentManagerIntegrationProps): ReactElement | null
{
	const {consent, embedOnAnyConsent} = props;

	const cookiebot = useCookiebot();
	const usercentrics = useUsercentrics();

	if (isCookiebot(consent))
	{
		const {cookiebot: cookieBotId, ...rest} = consent;

		return (
			<Fragment>
				<Cookiebot id={cookieBotId} {...rest} />
				{cookiebot.hasAnyConsent && embedOnAnyConsent}
			</Fragment>
		);
	}

	if (isUsercentricsV2(consent))
	{
		const {usercentricsV2: usercentricsId, ...rest} = consent;

		return (
			<Fragment>
				<Usercentrics id={usercentricsId} {...rest} />
				{usercentrics.hasAnyConsent && embedOnAnyConsent}
			</Fragment>
		);
	}

	if (isUsercentricsV3(consent))
	{
		const {usercentricsV3: usercentricsId, ...rest} = consent;

		return (
			<Fragment>
				<UsercentricsV3 id={usercentricsId} {...rest} />
				{usercentrics.hasAnyConsent && embedOnAnyConsent}
			</Fragment>
		);
	}

	throw new Error("No supported consent option given.");
}

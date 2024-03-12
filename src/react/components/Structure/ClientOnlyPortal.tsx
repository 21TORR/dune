"use client";

import {PropsWithChildren, ReactElement, useEffect, useState} from "react";
import {createPortal} from "react-dom";

export type ClientOnlyPortalProps = Readonly<PropsWithChildren<{
	container?: HTMLElement;
}>>;

/**
 * A portal that only renders on the client. On the server it will render to nothing.
 */
export function ClientOnlyPortal (props: ClientOnlyPortalProps): ReactElement | null
{
	const [initialized, setInitialized] = useState(false);

	useEffect(() =>
	{
		setInitialized(true);
	}, []);

	return initialized
		? createPortal(props.children, props.container ?? document.body)
		: null;
}

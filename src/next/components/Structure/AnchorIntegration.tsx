"use client";

import React, {ReactElement, useEffect} from "react";
import {usePathname} from "next/navigation.js";

export type AnchorIntegrationProps = Readonly<{
	timeout?: number;
}>;

/**
 * Helper component that integrates into React, to fix broken anchor links due to layout shift.
 *
 * There is a race condition between React hydration + rendering and the position of the browser of the anchor.
 *
 * If the layout is rendered before the browser locates the anchor, everything is fine.
 * However, if the browser locates the anchor before react is finished rendering (and we have layout shift), it
 * will position it correctly and when react is finished the content will jump away. So we won't end up at the
 * correct position but somewhere else.
 *
 * This component is a hacky fix: it waits some time after the first rendering finished and will explicitly locate the
 * element and reposition.
 *
 * Usage:
 *
 * - load this component once in your tree, like in your global layout.
 */
export function AnchorIntegration (props: AnchorIntegrationProps): ReactElement | null
{
	const pathname = usePathname();

	useEffect(() =>
	{
		const hash = document.location.hash;

		if (!hash)
		{
			return;
		}

		const element = document.querySelector(hash);

		if (!element)
		{
			return;
		}

		// A hacky way to fix jumping to anchors, that don't work due to slow hydration / content shift
		window.setTimeout(
			() =>
			{
				element.scrollIntoView({
					behavior: "smooth",
				});
			},
			props.timeout ?? 250,
		);
	}, [pathname, props.timeout]);

	return <div>a</div>;
}

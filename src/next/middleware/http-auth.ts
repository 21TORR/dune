import type {NextRequest} from "next/server";

export interface Credentials {
	username: string;
	password: string;
}

/**
 * Handles basic authentication
 *
 * @deprecated Use the new method 'integrateHttpBasicAuth' allowing a list of credentials to check against instead
 */
export function handleHttpBasicAuth (
	request: NextRequest,
	username: string,
	password: string,
	responseText: string = "Auth required",
	realmLabel: string = "Secure Area",
) : Response | undefined
{
	return integrateHttpBasicAuth(
		request,
		[{username, password}],
		responseText,
		realmLabel
	);
}

/**
 * Handles basic authentication
 */
export function integrateHttpBasicAuth (
	request: NextRequest,
	users: Credentials[],
	responseText: string = "Auth required",
	realmLabel: string = "Secure Area",
) : Response | undefined
{
	const auth = request.headers.get("authorization");
	const authToken = /^Basic (?<token>.*?)$/.exec(auth || "");

	if (authToken)
	{
		const [givenUser, givenPassword] = Buffer.from(authToken.groups!.token, "base64")
			.toString()
			.split(":");

		const hasValidUser = users.some((item : Credentials) => givenUser === item.username && givenPassword === item.password);

		if (hasValidUser)
		{
			return;
		}
	}

	return new Response(responseText, {
		status: 401,
		headers: {
			'www-authenticate': `Basic realm="${realmLabel}"`,
		},
	});
}

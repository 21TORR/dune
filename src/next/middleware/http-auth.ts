import type {NextRequest} from "next/server.js";

/**
 * Handles basic authentication
 */
export function handleHttpBasicAuth (
	request: NextRequest,
	username: string,
	password: string,
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

		if (givenUser === username && givenPassword === password)
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

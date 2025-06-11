import z from "zod/v4-mini";

const errorSchema = z.object({
	ok: z.literal(false),
	error: z.optional(z.string()),
	errorMessage: z.optional(z.string()),
});



/**
 * API helper to fetch data from an API
 */
export async function fetchApi <
	DataSchema extends z.ZodMiniType,
> (
	url: string | URL,
	dataSchema?: DataSchema,
	requestSettings: RequestInit = {},
	isDebug: boolean = false,
) : Promise<z.infer<typeof dataSchema>>
{
	let response: Response;

	// region Send Request
	try
	{
		if (isDebug)
		{
			console.debug("Fetching from API", {url: url.toString()});
		}

		response = await fetch(
			url,
			Object.assign(
				{
					method: "GET",
					credentials: "include",
					cache: "no-store",
				},
				requestSettings,
			),
		);
	}
	catch (error)
	{
		console.error(
			"API request failed due to error",
			{
				err: error,
				url: url.toString(),
			},
		);

		throw error;
	}
	// endregion

	let responseData: unknown;

	// region parse JSON
	try
	{
		if (!response.headers.get("content-type")?.includes("application/json"))
		{
			throw new Error("API response is no json");
		}

		responseData = await response.json();
	}
	catch (error)
	{
		console.error(
			"API response is no JSON",
			{
				contentType: response.headers.get("content-type"),
				url: url.toString(),
				error: error,
			},
		);

		throw new Error("API response is no json");
	}
	// endregion

	const successSchema = z.object({
		ok: z.literal(true),
		data: dataSchema,
	});
	const successResponse = successSchema.safeParse(responseData);

	if (successResponse.success)
	{
		if (!response.ok)
		{
			console.error("Got success response, but API response is no success");
		}

		// @ts-expect-error data errors out
		return successResponse.data.data;
	}
	else
	{
		console.debug("No success cause", successResponse.error);
	}

	const failureResponse = errorSchema.safeParse(responseData);

	if (failureResponse.success)
	{
		if (response.ok)
		{
			console.error("Got error response, but API response is success");
		}

		throw failureResponse.data;
	}
	else
	{
		console.debug("No failure cause", failureResponse.error);
	}

	console.error(
		"Invalid API response",
		{
			responseData,
			url: url.toString(),
			error: "unparseable response",
			successIssues: successResponse.error,
			failureIssues: failureResponse.error,
		},
	);

	throw new Error(`Invalid API response`);
}

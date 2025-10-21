import {z} from "zod/mini";

const errorSchema = z.object({
	ok: z.literal(false),
	error: z.optional(z.string()),
	errorMessage: z.optional(z.string()),
	data: z.unknown(),
});

type Logger = Readonly<{
	debug: (message: string, context?: Record<string, unknown>) => void;
	error: (message: string, context?: Record<string, unknown>) => void;
}>

type ApiFetchSettings = Readonly<{
	logger?: Logger;
}>;

class ApiError extends Error
{
	readonly #errorCode: string;
	readonly #data: unknown;
	readonly #errorMessage: string|null;


	constructor (
		errorCode: string,
		data: unknown = undefined,
		errorMessage: string|null|undefined = undefined,
	)
	{
		super(`The API request failed due to an error: ${errorCode}`);
		this.#errorCode = errorCode;
		this.#data = data;
		this.#errorMessage = errorMessage ?? null;
	}

	/**
	 *
	 */
	get errorCode () : string
	{
		return this.#errorCode;
	}

	/**
	 * The data of the response
	 */
	get data () : unknown
	{
		return this.#data;
	}

	/**
	 * A user-facing error message
	 */
	get errorMessage () : string|null
	{
		return this.#errorMessage;
	}
}

class RequestError extends Error
{
	private response: Response;

	/**
	 *
	 */
	constructor (response: Response)
	{
		super();
		this.response = response;
	}

	/**
	 *
	 */
	get is404 ()
	{
		return 404 === this.response.status;
	}
}

/**
 *
 */
export function isApiError (value: unknown) : value is ApiError
{
	return value instanceof ApiError;
}

/**
 *
 */
export function isRequestError (value: unknown) : value is RequestError
{
	return value instanceof RequestError;
}



/**
 * API helper to fetch data from an API
 */
export async function fetchApi <
	DataSchema extends z.ZodMiniType,
> (
	url: string | URL,
	dataSchema?: DataSchema,
	requestSettings: RequestInit = {},
	settings: ApiFetchSettings = {},
) : Promise<z.infer<DataSchema>>
{
	let response: Response;
	const logger = settings.logger;

	// region Send Request
	try
	{
		logger?.debug("Fetching from API", {url: url.toString()});

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
		logger?.error(
			"API request failed due to an unknown error",
			{
				err: error,
				url: url.toString(),
			},
		);

		throw error;
	}
	// endregion

	const contentType = response.headers.get("content-type") ?? "application/octet-stream";
	const responseContentAsString = await response.text();
	let responseData: unknown;

	// region parse JSON
	try
	{
		if (!contentType.includes("application/json"))
		{
			throw new Error("API response is no json");
		}

		responseData = await response.json();
	}
	catch (error)
	{
		logger?.error(
			"API response is no JSON",
			{
				contentType: contentType,
				url: url.toString(),
				error: error,
				content: responseContentAsString,
				statusCode: response.status,
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
			logger?.error("Got success response, but API response is no success");
		}

		// @ts-expect-error .data errors out in zod right now. So we add this and the cast in the meantime
		return successResponse.data.data as z.infer<typeof dataSchema>;
	}

	const failureResponse = errorSchema.safeParse(responseData);

	if (failureResponse.success)
	{
		if (response.ok)
		{
			logger?.error("Got error response, but API response is success", {
				statusCode: response.status,
				content: responseContentAsString,
				contentType: contentType,
			});
		}

		throw new ApiError(
			failureResponse.data.error,
			failureResponse.data.data,
			failureResponse.data.errorMessage,
		);
	}
	else
	{
		logger?.debug("No failure cause", {
			error: failureResponse.error,
			statusCode: response.status,
			content: responseContentAsString,
			contentType: contentType,
		});
	}

	if (404 === response.status)
	{
		throw new RequestError(response);
	}

	logger?.error(
		"Invalid API response",
		{
			responseData,
			url: url.toString(),
			error: "unparseable response",
			successIssues: successResponse.error,
			failureIssues: failureResponse.error,
			statusCode: response.status,
			content: responseContentAsString,
			contentType: contentType,
		},
	);

	throw new Error(`Invalid API response`);
}

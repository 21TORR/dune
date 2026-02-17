import {z} from "zod/mini";
import type {$ZodType} from "zod/v4/core";

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
	readonly #response: Response;
	readonly #errorCode: string;
	readonly #data: unknown;
	readonly #errorMessage: string|null;


	constructor (
		response: Response,
		errorCode: string,
		data: unknown = undefined,
		errorMessage: string|null|undefined = undefined,
	)
	{
		super(`The API request failed due to an error: ${errorCode}`);
		this.#response = response;
		this.#errorCode = errorCode;
		this.#data = data;
		this.#errorMessage = errorMessage ?? null;
	}

	/**
	 *
	 */
	get is404 ()
	{
		return 404 === this.statusCode;
	}

	/**
	 *
	 */
	get statusCode () : number
	{
		return this.#response.status;
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
	readonly #response: Response;
	readonly #content: string;
	readonly #contentType: string;
	readonly #errorMessage: string;

	/**
	 *
	 */
	constructor (
		response: Response,
		content: string,
		contentType: string,
		errorMessage: string,
	)
	{
		super();
		this.#response = response;
		this.#content = content;
		this.#contentType = contentType;
		this.#errorMessage = errorMessage;
	}

	/**
	 *
	 */
	get is404 ()
	{
		return 404 === this.statusCode;
	}

	/**
	 *
	 */
	get statusCode () : number
	{
		return this.#response.status;
	}

	/**
	 *
	 */
	get content () : string
	{
		return this.#content;
	}

	/**
	 *
	 */
	get contentType () : string
	{
		return this.#contentType;
	}

	/**
	 *
	 */
	get errorMessage () : string
	{
		return this.#errorMessage;
	}

	/**
	 *
	 */
	get debug () : Record<string, unknown>
	{
		return {
			errorMessage: this.errorMessage,
			contentType: this.contentType,
			content: this.content,
			statusCode: this.statusCode,
		};
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
	DataSchema extends $ZodType,
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
	const responseContentAsString = await response.clone().text();
	let responseData: unknown;

	// region parse JSON
	try
	{
		if (!contentType.includes("application/json"))
		{
			throw new RequestError(
				response,
				responseContentAsString,
				contentType,
				"API response is no json",
			);
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

		throw error;
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
			response,
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
		throw new RequestError(
			response,
			responseContentAsString,
			contentType,
			"Request is 404",
		);
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

	throw new RequestError(
		response,
		responseContentAsString,
		contentType,
		"Invalid API response",
	);
}

/**
 * Parses the given value as JSON, without throwing any exceptions etc.
 */
export function safeParseJson <DataType = unknown> (value?: string|null) : DataType|null
{
	if (typeof value !== "string")
	{
		return null;
	}

	try
	{
		value = value.trim();
		return ("" !== value)
			? JSON.parse(value) as DataType
			: null;
	}
	catch (e)
	{
		console.error(`Failed to parse JSON: ${e.message}`, e);
		return null;
	}
}


/**
 * Parses the content of the given element as JSON
 */
export function parseElementContentAsJson <DataType = unknown> (element: HTMLElement|null) : DataType|null
{
	return null !== element
		? safeParseJson<DataType>(
			(element.textContent || "")
				.replace(/&lt;/g, "<")
				.replace(/&gt;/g, ">")
				.replace(/&amp;/g, "&")
		)
		: null;
}

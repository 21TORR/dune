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

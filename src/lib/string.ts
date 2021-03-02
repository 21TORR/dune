/**
 * Splits the string value by spaces
 *
 * @internal
 */
export function splitStringValue (value : string|string[]|null) : string[]
{
	value = value || [];

	if (Array.isArray(value))
	{
		return value;
	}

	return value === ""
		? []
		: value.trim().split(/ +/);
}

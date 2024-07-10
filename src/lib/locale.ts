/**
 * Separates a locale into country and language parts
 */
export function parseLocale (locale : string) : {language: string, country: string|null} | null
{
	const match = /^(?<language>[a-z]{2,})(-(?<country>[a-z]{2,}))?$/i.exec(locale);

	if (!match)
	{
		return null;
	}

	return {
		language: match.groups!.language,
		country: match.groups!.country ?? null,
	}
}

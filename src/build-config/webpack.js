export const registerSvgWebpackLoader = (config) =>
{
	// Grab the existing rule that handles SVG imports
	const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg") && rule.resourceQuery?.toString() !== "/raw/");
	// Modify the file loader rule to ignore *.svg, since we have it handled now.
	fileLoaderRule.exclude = /\.svg$/i;

	// Convert all other *.svg imports to React components
	config.module.rules.push({
		test: /\.svg$/i,
		issuer: { not: /\.(css|scss|sass)$/ },
		resourceQuery: { not: /url/ }, // exclude if *.svg?url
		use: [{
			loader: "@svgr/webpack",
			options: {
				dimensions: true,
				svgo: true,
				svgoConfig: {
					plugins: [
						{
							name: "preset-default",
							params: {
								overrides: {
									// ensure unique IDs when embedding multiple times
									cleanupIds: false,
									// don't remove the viewbox, to avoid scaling issues
									removeViewBox: false,
								},
							},
						},
						{
							name: "removeAttrs",
							params: {
								attrs: "data-.*",
							},
						},
						{
							// ensure unique IDs when embedding multiple times
							name: "prefixIds",
						},
					],
				},
			},
		}],
	});

	return config;
};

# ASF Analytics

[Open the app](https://sauravnrai.github.io/ASF-analytics/) · [ASF hub](https://sauravnrai.github.io/ASF/) · [Visualizer](https://sauravnrai.github.io/ASF-visualizer/)

A browser-only dataset profiler with text filtering, missing-value counts, descriptive statistics, JSON summaries, and filtered CSV exports. The contextual Visualize link explicitly replaces the shared workspace with the current filtered rows and opens the Visualizer in the same tab. The normal navigation keeps the original loaded workspace.

## Definitions
- Missing: null or empty/whitespace-only string. Zero and false are not missing.
- Numeric: finite numbers or decimal/exponent numeric strings; not booleans, hexadecimal, NaN, or Infinity.
- Statistics use valid numeric cells only. Mixed columns show both numeric and text counts.
- Mean, median, min, max and **population** standard deviation are computed over filtered records. A missing statistical result is shown as a dash; summaries serialize unrepresentable results as null.
- Completeness is the share of nonmissing cells across filtered rows and all columns.
- Search is a case-insensitive substring match across every cell. Preview shows the first 20 matched rows; statistics and exports cover all matches.

## Input and privacy
UTF-8 comma-separated CSV or JSON arrays of flat scalar-valued objects. CSV supports quoted fields, multiline text, escaped quotes and CRLF. Unique nonempty headers required. Limits: 2 MiB, 10,000 rows, 50 columns. Synthetic demo data is included. Formula-prefixed text is neutralized in spreadsheet-oriented CSV exports.

No backend, telemetry, keys, CDNs, or external fonts. Uploaded files are processed locally. Same-tab sessionStorage shares datasets between the suite's apps, but **any site on the same `sauravnrai.github.io` origin can technically access it**. Avoid sensitive data, clear saved workspace when finished, and note that browsers may restore tab sessions. If storage is blocked, use export/import instead.

## Development / deployment
`python3 -m http.server 8080 --directory docs` serves the standalone app. GitHub Pages publishes `main` → `/docs`; `.nojekyll` bypasses Jekyll. Local runtime assets intentionally duplicate the hub so deployments do not depend on another site's availability. Keep common `assets/data.js`, `navigation.js`, `styles.css`, and `data/sample.csv` synchronized with [ASF](https://github.com/sauravnrai/ASF). Workspace schema: `asf.workspace.v1`.

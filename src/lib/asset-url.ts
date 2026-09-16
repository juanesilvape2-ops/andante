/**
 * Resolves a public-asset path against the app's base URL, so absolute
 * "/assets/..." references still work when the site is deployed under a
 * subpath (e.g. GitHub Pages project sites at /andante/). `BASE_URL` always
 * has a trailing slash, so callers pass the path WITHOUT a leading slash.
 */
export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path}`;
}

/**
 * Hooks Exports
 *
 * Central export for all custom hooks
 *
 * Note: Most data fetching is done server-side for SEO.
 * Client-side hooks can be added here when needed for real-time updates or mutations.
 *
 * For API access, use:
 * - Server-side: `src/lib/server/*` functions
 * - Client-side: `src/services/api/*` services directly
 * - Mutations: `src/app/actions/*` server actions
 */

export { useDebounce } from "./use-debounce";
export { useDebouncedSearch } from "./use-debounced-search";

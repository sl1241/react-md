import { $$ } from "voby"
import { defaults } from "../defaults"
import type { SearchOptions } from "./utils"
import { DEFAULT_SEARCH_OPTIONS, getSearchString } from "./utils"

/**
 * This is a simple `array.find` implementation that will work for any
 * searchable item type and return the first item that starts with the current
 * query string ignoring case.
 *
 * @param query - The current query string to use to match with
 * @param searchable - The list of searchable items
 * @param options - The additional search options available.
 * @returns the found item in the searchable list or null
 */
export function findIgnoreCase<T = unknown>(
    query: string,
    searchable: readonly T[],
    options: SearchOptions<T> = {}
): T | null {
    const { getItemValue, valueKey: vk, trim: tr, ignoreWhitespace: iw } = defaults(
        options,
        DEFAULT_SEARCH_OPTIONS
    )

    const trim = $$(tr), ignoreWhitespace = $$(iw), valueKey = $$(vk)

    query = getSearchString(query, true, trim, ignoreWhitespace)
    if (!query.length || !searchable.length) {
        return null
    }

    const found = searchable.find((item) => {
        const value = getSearchString(
            getItemValue(item, valueKey),
            true,
            trim,
            ignoreWhitespace
        )

        return value.indexOf(query) === 0
    })

    return typeof found === "number" ? found : found || null
}

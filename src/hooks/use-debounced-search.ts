/**
 * useDebouncedSearch Hook
 *
 * Manages debounced search with URL synchronization
 */

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from './use-debounce'

interface UseDebouncedSearchOptions {
  paramName?: string
  debounceDelay?: number
  onSearch?: (value: string) => void
}

export function useDebouncedSearch({
  paramName = 'search',
  debounceDelay = 500,
  onSearch,
}: UseDebouncedSearchOptions = {}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialValue = searchParams.get(paramName) || ''
  
  const [searchValue, setSearchValue] = useState(initialValue)
  const debouncedSearch = useDebounce(searchValue, debounceDelay)

  // Update URL when debounced value changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (debouncedSearch.trim()) {
      params.set(paramName, debouncedSearch.trim())
    } else {
      params.delete(paramName)
    }
    
    // Reset to page 1 when search changes
    params.delete('page')
    
    const newUrl = params.toString()
    const currentUrl = searchParams.toString()
    
    if (newUrl !== currentUrl) {
      router.push(`/products?${newUrl}`, { scroll: false })
    }

    // Call optional callback
    if (onSearch) {
      onSearch(debouncedSearch)
    }
  }, [debouncedSearch, paramName, router, searchParams, onSearch])

  // Sync with URL changes (e.g., browser back/forward)
  useEffect(() => {
    const urlValue = searchParams.get(paramName) || ''
    if (urlValue !== searchValue) {
      setSearchValue(urlValue)
    }
  }, [searchParams, paramName])

  const handleChange = useCallback((value: string) => {
    setSearchValue(value)
  }, [])

  const handleClear = useCallback(() => {
    setSearchValue('')
  }, [])

  return {
    searchValue,
    debouncedSearch,
    handleChange,
    handleClear,
    isSearching: searchValue !== debouncedSearch,
  }
}


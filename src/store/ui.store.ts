/**
 * UI Store (Zustand)
 * 
 * Manages UI state (modals, sidebars, etc.)
 */

import { create } from 'zustand'

interface UIState {
  // Modals
  isCartOpen: boolean
  isQuickViewOpen: boolean
  isPreviewSliderOpen: boolean
  
  // Actions
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  openQuickView: () => void
  closeQuickView: () => void
  openPreviewSlider: () => void
  closePreviewSlider: () => void
}

export const useUIStore = create<UIState>((set) => ({
  isCartOpen: false,
  isQuickViewOpen: false,
  isPreviewSliderOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  openQuickView: () => set({ isQuickViewOpen: true }),
  closeQuickView: () => set({ isQuickViewOpen: false }),
  openPreviewSlider: () => set({ isPreviewSliderOpen: true }),
  closePreviewSlider: () => set({ isPreviewSliderOpen: false }),
}))


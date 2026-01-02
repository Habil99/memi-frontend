/**
 * Authentication Service
 *
 * Handles authentication operations (login, register, token refresh)
 */

import { apiClient } from "../api";
import { useAuthStore } from "@/store";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  city?: string;
  phone?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: "USER" | "ADMIN";
    city?: string;
    phone?: string;
    avatar?: string;
  };
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      "/auth/login",
      credentials
    );

    // Store tokens and user in Zustand store
    useAuthStore
      .getState()
      .setAuth(response.user, response.accessToken, response.refreshToken);

    // Also store in localStorage for persistence
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
    }

    return response;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auth/register", data);

    // Store tokens and user in Zustand store
    useAuthStore
      .getState()
      .setAuth(response.user, response.accessToken, response.refreshToken);

    // Also store in localStorage for persistence
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
    }

    return response;
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    const response = await apiClient.post<{ accessToken: string }>(
      "/auth/refresh",
      { refreshToken }
    );

    // Update access token in store
    useAuthStore.getState().updateTokens(response.accessToken);

    // Update in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", response.accessToken);
    }

    return response;
  }

  async logout(): Promise<void> {
    // Clear Zustand store
    useAuthStore.getState().logout();

    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  }

  getStoredTokens(): {
    accessToken: string | null;
    refreshToken: string | null;
  } {
    if (typeof window === "undefined") {
      return { accessToken: null, refreshToken: null };
    }

    return {
      accessToken: localStorage.getItem("accessToken"),
      refreshToken: localStorage.getItem("refreshToken"),
    };
  }

  isAuthenticated(): boolean {
    return useAuthStore.getState().isAuthenticated;
  }

  getCurrentUser() {
    return useAuthStore.getState().user;
  }
}

export const authService = new AuthService();

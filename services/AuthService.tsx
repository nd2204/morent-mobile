import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Configuration, AuthApi, LoginRequest, RefreshTokenRequest } from '~/lib/morent-api';
import axios, { AxiosError } from 'axios';
import { API_URL } from '~/lib/constants';

// Keys for storing tokens
const ACCESS_TOKEN_KEY = 'auth_access_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';
const USER_DATA_KEY = 'auth_user_data';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  accessToken: string | null;
  refreshToken: string | null;
}

interface AuthContextType extends AuthState {
  login: (loginId: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<any>;
  logout: () => Promise<void>;
  getAccessToken: () => Promise<string | null>;
}


// Create API instance with interceptors for token management
const createApiInstance = () => {
  const config = new Configuration({
    basePath: API_URL,
  });

  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add request interceptor for adding the access token
  axiosInstance.interceptors.request.use(
    async (config) => {
      try {
        const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      } catch (error) {
        console.error('Error setting auth header:', error);
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Create a flag to prevent multiple refresh attempts
  let isRefreshing = false;
  let failedQueue: any[] = [];

  const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    failedQueue = [];
  };

  // Add response interceptor for handling token refresh
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config;
      
      // Return if:
      // 1. It's not a 401 error
      // 2. It's a refresh token request that failed
      // 3. The request has already been retried
      if (
        !error.response || 
        error.response.status !== 401 || 
        originalRequest?.url?.includes('/api/auth/refresh') ||
        (originalRequest as any)._retry
      ) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // If we're already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest && token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axiosInstance(originalRequest!);
          })
          .catch((err) => Promise.reject(err));
      }

      (originalRequest as any)._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const authApi = new AuthApi(config, undefined, axiosInstance);
        const refreshRequest: RefreshTokenRequest = {
          refreshToken: refreshToken,
        };

        const response = await authApi.apiAuthRefreshPost({ refreshTokenRequest: refreshRequest });
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        
        // Store new tokens
        await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
        await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, newRefreshToken);

        // Update auth header and process queue
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        processQueue(null, accessToken);
        
        // Update the original request authorization header
        if (originalRequest) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        
        return axiosInstance(originalRequest!);
      } catch (refreshError) {
        // Failed to refresh, clear tokens and process queue with error
        await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
        await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
        await SecureStore.deleteItemAsync(USER_DATA_KEY);
        
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
  );

  return { api: new AuthApi(config, undefined, axiosInstance), axiosInstance };
};

// Create a singleton instance
const apiInstance = createApiInstance();
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    accessToken: null,
    refreshToken: null,
  });

  // Initialize auth state from stored tokens
  useEffect(() => {
    const initAuth = async () => {
      try {
        const [accessToken, refreshToken, userData] = await Promise.all([
          SecureStore.getItemAsync(ACCESS_TOKEN_KEY),
          SecureStore.getItemAsync(REFRESH_TOKEN_KEY),
          SecureStore.getItemAsync(USER_DATA_KEY),
        ]);

        if (accessToken && refreshToken && userData) {
          setState({
            isAuthenticated: true,
            isLoading: false,
            user: JSON.parse(userData),
            accessToken,
            refreshToken,
          });
        } else {
          setState({
            isAuthenticated: false,
            isLoading: false,
            user: null,
            accessToken: null,
            refreshToken: null,
          });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
          accessToken: null,
          refreshToken: null,
        });
      }
    };

    initAuth();
  }, []);

  // Get current access token (useful for components needing the token)
  const getAccessToken = async (): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  };

  // Login function
  const login = async (loginId: string, password: string): Promise<boolean> => {
    try {
      const loginData: LoginRequest = {
        loginId,
        password,
      };

      const response = await apiInstance.api.apiAuthLoginPost({ loginRequest: loginData });
      const { accessToken, refreshToken, user } = response.data;

      // Store tokens and user data
      await Promise.all([
        SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken),
        SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken),
        SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(user)),
      ]);

      setState({
        isAuthenticated: true,
        isLoading: false,
        user,
        accessToken,
        refreshToken,
      });

      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Register function
  const register = async (userData: any): Promise<any> => {
    try {
      const response = await apiInstance.api.apiAuthRegisterPost({ registerUserCommand: userData });
      const { accessToken, refreshToken, user } = response.data;

      // Store tokens and user data
      await Promise.all([
        SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken),
        SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken),
        SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(user)),
      ]);

      setState({
        isAuthenticated: true,
        isLoading: false,
        user,
        accessToken,
        refreshToken,
      });

      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      // Call logout API if needed
      await apiInstance.api.apiAuthLogoutPost();
    } catch (error) {
      console.error('Logout API error:', error);
      // Continue with local logout even if API call fails
    } finally {
      // Clear stored tokens and state
      await Promise.all([
        SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
        SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
        SecureStore.deleteItemAsync(USER_DATA_KEY),
      ]);

      setState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        accessToken: null,
        refreshToken: null,
      });
    }
  };

  // Create context value
  const contextValue: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    getAccessToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Expose the axios instance for use in other services
export const api = apiInstance.axiosInstance;
import Constants from 'expo-constants';

export const NAV_THEME = {
  light: {
    background: 'hsl(0 0% 100%)', // background
    border: 'hsl(240 5.9% 90%)', // border
    card: 'hsl(0 0% 100%)', // card
    notification: 'hsl(0 84.2% 60.2%)', // destructive
    primary: 'hsl(240 5.9% 10%)', // primary
    text: 'hsl(240 10% 3.9%)', // foreground
  },
  dark: {
    background: 'hsl(240 10% 3.9%)', // background
    border: 'hsl(240 3.7% 15.9%)', // border
    card: 'hsl(240 10% 3.9%)', // card
    notification: 'hsl(0 72% 51%)', // destructive
    primary: 'hsl(0 0% 98%)', // primary
    text: 'hsl(0 0% 98%)', // foreground
  },
};

// // Get the debugger host (IP and port of the packager)
// const debuggerHost =  Constants.expoConfig?.hostUri; // Fallback to localhost if not available
// const ip = debuggerHost.split(':')[0]; // Extract IP address (e.g., "192.168.1.100")

const DEV_API_URL = `https://coral-unbiased-scarcely.ngrok-free.app`; // Replace with your local API server address
const PROD_API_URL = 'https://api.yourdomain.com'; // Replace with your production API URL

// Use DEV_API_URL in development and PROD_API_URL in production
export const API_URL = __DEV__ ? DEV_API_URL : PROD_API_URL;

// Log the API URL in development
if (__DEV__) {
  console.log('🌐 API URL:', API_URL);
}

import { Configuration, CarApi, AuthApi, RentalApi, ReviewApi, UserApi } from 'lib/morent-api';
import { API_URL } from './constants';
import axios from 'axios';

axios.defaults.validateStatus = status => status < 500;

// Create a configuration instance
const configuration = new Configuration({
    basePath: API_URL,
    baseOptions: {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    },
});

// Export all API instances
export const carApi = new CarApi(configuration);
export const authApi = new AuthApi(configuration);
export const rentalApi = new RentalApi(configuration);
export const reviewApi = new ReviewApi(configuration);
export const userApi = new UserApi(configuration);
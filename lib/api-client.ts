import { Configuration, CarApi, AuthApi, RentalApi, ReviewApi, UserApi } from 'lib/morent-api';
import { API_URL } from './constants';
import axios from 'axios';
import { api } from '~/services/AuthService';

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

export const createApiClients = () => {
  const config = new Configuration({
    basePath: API_URL,
    baseOptions: {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  });

  return {
    carApi: new CarApi(config, undefined, api),
    userApi: new UserApi(config, undefined, api),
  };
};

// Export all API instances
export const carApi = new CarApi(configuration, undefined, api);
export const userApi = new UserApi(configuration, undefined, api);
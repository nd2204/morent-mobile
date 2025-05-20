import { Configuration, CarApi, UserApi, PaymentApi } from 'lib/morent-api';
import { API_URL } from './constants';
import axios from 'axios';
import { api } from '~/services/AuthService';

axios.defaults.validateStatus = status => status < 500;

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
    paymentApi: new PaymentApi(config, undefined, api),
    userApi: new UserApi(config, undefined, api),
  };
};
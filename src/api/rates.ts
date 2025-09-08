import { URL_API } from '@/utils/consts';

import { AxiosResponse } from 'axios';

import axiosInstance from '.';

import { RatesResponse } from './types/rates';

const URL = URL_API + '/rates';

export const getRates = (): Promise<AxiosResponse<RatesResponse>> => axiosInstance.get(URL);

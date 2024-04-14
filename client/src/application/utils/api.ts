import axios from 'axios';
import qs from 'qs';
import { SearchResult } from '../components/common.types';
const BASE_URL = 'http://localhost:3001/api/v1/';
export const getSelf = () => axios.get(`${BASE_URL}auth/self`, {withCredentials: true}).then(r=>r.data);
export const search = (q: string) : Promise<SearchResult> => axios.get(`${BASE_URL}search?${qs.stringify({q})}`, {withCredentials: true}).then(r=>r.data);

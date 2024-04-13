import axios from 'axios';
export const getSelf = () => {
	return axios.get('http://localhost:3001/api/v1/auth/self', {withCredentials: true}).then(r=>r.data);
}
import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://burger-builder-6d2ad.firebaseio.com/'
})

export default instance;

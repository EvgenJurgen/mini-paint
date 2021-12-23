import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyAPRgXZxqZT8CQjluYfCZBKIoLlL_b-o8s',
	authDomain: 'mini-paint-4c2f2.firebaseapp.com',
	projectId: 'mini-paint-4c2f2',
	storageBucket: 'mini-paint-4c2f2.appspot.com',
	messagingSenderId: '1013656905911',
	appId: '1:1013656905911:web:2a80d3f488087cd3874532',
};

const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);

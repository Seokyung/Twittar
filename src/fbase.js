import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTHDOMAIN,
	projectId: process.env.REACT_APP_PROJECTID,
	storageBucket: process.env.REACT_APP_STORAGEBUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGGINGSENDERID,
	appId: process.env.REACT_APP_APPID,
};

const app = initializeApp(firebaseConfig);

export const authService = getAuth(app);

export const dbService = getFirestore();

export const storageService = getStorage(app);

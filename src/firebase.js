import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBKki03fW6uqEoZ9zcfrjEj7Mp5zs1X3_A",
  authDomain: "twittar-12a71.firebaseapp.com",
  projectId: "twittar-12a71",
  storageBucket: "twittar-12a71.appspot.com",
  messagingSenderId: "622693674085",
  appId: "1:622693674085:web:b71a1d767a4b0b6765aa8c"
};

export const app = initializeApp(firebaseConfig);
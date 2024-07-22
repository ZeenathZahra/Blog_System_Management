import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//     storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_MESSANGING_ID,
//     appId: process.env.NEXT_PUBLIC_APP_ID,
// };
const firebaseConfig = {
    apiKey: "AIzaSyAu_6AuSidsC-Qv48rkCd6wwI6m6v9gJ1Q",
    authDomain: "lyeana-blog-55baf.firebaseapp.com",
    projectId: "lyeana-blog-55baf",
    storageBucket: "lyeana-blog-55baf.appspot.com",
    messagingSenderId: "826211512442",
    appId: "1:826211512442:web:67df220e855c150f490bc3",
    measurementId: "G-JFVPSFZ8RT"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
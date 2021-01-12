import firebase from "firebase/app";
import "@firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTO_DOMAIN,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APP_ID,
  measurementId: process.env.FB_MEASUREMENT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const authApp = firebase.auth();

export const databaseApp = firebase.firestore();

// add github provider
const provider = new firebase.auth!.GithubAuthProvider();
provider.addScope("repo, gist");

export const githubProvider = provider;

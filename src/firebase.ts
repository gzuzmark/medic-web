import * as firebase from "firebase";

export const initFirebase = () => {
    const id = process.env.REACT_APP_FIREBASE_ID;
    const apiKey = process.env.REACT_APP_FIREBASE_KEY;
    const config = {
        apiKey,
        databaseURL: `https://${id}.firebaseio.com`
    };
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
};

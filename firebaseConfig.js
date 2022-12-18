// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { get, getDatabase, ref, set, update } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCGzwm-0ubNU1kp2g2xeeXZKp249zIGamM",
    authDomain: "stockmarketdashboard-459df.firebaseapp.com",
    databaseURL: "https://stockmarketdashboard-459df-default-rtdb.firebaseio.com",
    projectId: "stockmarketdashboard-459df",
    storageBucket: "stockmarketdashboard-459df.appspot.com",
    messagingSenderId: "909850626706",
    appId: "1:909850626706:web:3a9f9d773bc94c6efbf44b",
    measurementId: "G-177158Q4NS"
};


const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const db = getDatabase(app)

export { app, auth, db };

export async function persistPost(title, text, timeStamp, uid) {
    await set(ref(db, 'posts/' + title), {
        title: title,
        text: text,
        timeStamp: timeStamp,
        response: "",
        uuid: uid,
    });
}

export function getUsers() {
    return get(ref(db, "users")).then((querySnapshot) => {
        return querySnapshot.val()
    })
}

export function retrievePosts(id) {
    return get(ref(db, "posts")).then((querySnapshot) => {

        var vals = []
        const snapshot = querySnapshot.val()
        for (var el in snapshot) {
            vals.push(snapshot[el])
        }

        return vals
    })
}

export function retrievePost(id) {
    return get(ref(db, "posts/" + id)).then((querySnapshot) => {

        // Loop through the data and store
        // it in array to display
        const snapshot = querySnapshot.val()
        return snapshot
    })
}


export async function forgotPassword(email) {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Your password reset link has been sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }

}

export function logout() {
    signOut(auth)
}

export async function signInUser(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert("Incorrect username or password, please try again!");
    }
}


export async function createUser(email, password, stocks) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        persistUser(email, stocks,user.uid)
    }
    catch (error) {
        alert("That username already exists, please try a different one.")
    }
}

export async function persistUser(email, stocks, id) {
    await set(ref(db, 'users/' + id), {
        email: email,
        stocks: stocks,
        uuid: id,
    });
}



// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, OAuthProvider, RecaptchaVerifier, signInWithEmailAndPassword, signInWithPhoneNumber, signInWithPopup, signOut } from 'firebase/auth';
import {addDoc, collection, getFirestore, doc, setDoc} from 'firebase/firestore'
import { toast } from 'react-toastify';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCCXnuLktsumnF97xaapf4POflBIsB-tjk',
  authDomain: 'tingle-aaaa1.firebaseapp.com',
  projectId: 'tingle-aaaa1',
  storageBucket: 'tingle-aaaa1.appspot.com',
  messagingSenderId: '263906791274',
  appId: '1:263906791274:web:a2a54d527648164fb11f13',
  measurementId: 'G-65S0J7VZ25',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Initialize the Firebase app first
const db = getFirestore(app)

// Now use the initialized app in getAuth
const auth = getAuth(app); // Use the initialized app here

const googleProvider = new GoogleAuthProvider()


const signInWithGoogle = async () => {
    try {
        const response = await signInWithPopup(auth, googleProvider)
        const user = response.user

        
        await setDoc(doc(db, "users", user.uid),{
            uid : user.uid,
            name: user.displayName,
            email: user.email,
            authProvider: 'google',
            createdAt: new Date()
        }, {merge : true})

        console.log(user);
        
        
    } catch (error) {
        console.log(error.message);
        toast.error(error.code.split('/')[1].split('-').join(' '))

    }    
}


const createUser = async (name, email, password) => {


    try {
        const response = await createUserWithEmailAndPassword(auth, email, password)
        const user = response.user

        await setDoc(doc(db, 'users', user.uid),{
            uid : user.uid,
            name,
            authProvider : 'Local',
            email
        })
    } catch (error) {
        console.log(error.message);
        toast.error(error.message || error.code.split('/')[1].split('-').join(' '));

    }

}


const loginWithEmail = async (email, password) => {

    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error.message);
        toast.error(error.message || error.code.split('/')[1].split('-').join(' '));
        
    }

}


const sendOtp = async (phoneNumber) => {
    try {
        // Initialize reCAPTCHA
        const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            size: 'invisible', // can also be 'normal' for visible
            callback: (response) => {
                console.log('reCAPTCHA solved', response);
            },
            'expired-callback': () => {
                console.log('reCAPTCHA expired');
            }
        });

        // Render the reCAPTCHA widget (if needed)
        await recaptchaVerifier.render();

        // Send OTP
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
        console.log('OTP sent', confirmationResult);

        // Prompt the user to enter the OTP
        const otp = window.prompt('Please enter the OTP sent to your phone');
        if (!otp) throw new Error('No OTP entered');

        // Confirm OTP
        const result = await confirmationResult.confirm(otp);
        console.log('User signed in', result.user);
    } catch (error) {
        console.error('Error during sign-in:', error);
    }
};


const signInWithApple = async () => {

    const appleProvider = new OAuthProvider('apple.com')

    try {
        
        const response = await signInWithPopup(auth, appleProvider)
        const user = response.user
        

        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: user.displayName || 'Anonymous', // Apple doesn't always provide a name
            email: user.email,
            authProvider: 'apple',
            createdAt: new Date(),
          }, { merge: true });

          console.log(user);
        
          
    } catch (error) {
        console.log(error.message);
        toast.error(error.code.split('/')[1].split('-').join(' '))

    }

}



const logOut = async () => {

  try {
      await signOut(auth)

      console.log('user signed out');
      
  } catch (error) {
     console.log(error.message);
     toast.error(error.code.split('/')[1].split('-').join(' '))

  }

}


export {signInWithGoogle, sendOtp, signInWithApple, logOut, db, auth, createUser, loginWithEmail}
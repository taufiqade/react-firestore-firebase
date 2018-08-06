import firebase from 'firebase/app';
import 'firebase/database'; // If using Firebase database
import 'firebase/firestore'; // If using Firebase database
import {firebaseConfig} from './../config/'

const fire = firebase.initializeApp(firebaseConfig);

export default fire;

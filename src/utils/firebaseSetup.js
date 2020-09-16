import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB1Jptpz97s1PnfjMdahZ5Srhq6aUM_Kpg',
  authDomain: 'ib-comp-sci-blog.firebaseapp.com',
  databaseURL: 'https://ib-comp-sci-blog.firebaseio.com',
  projectId: 'ib-comp-sci-blog',
  storageBucket: 'ib-comp-sci-blog.appspot.com',
  messagingSenderId: '1041790253093',
  appId: '1:1041790253093:web:2fd3463682a073ca15e7cc',
};

firebase.initializeApp(firebaseConfig);

export default firebase;

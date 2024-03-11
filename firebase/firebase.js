import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBsNRNbfjf1UCKEz1oQTLeYvEWSgZlllAs',
    authDomain: 'trobeautrovrai.firebaseapp.com',
    projectId: 'trobeautrovrai',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
// Firebase Cloud Messaging Configuration File.
// Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyDXt91bxDpsZrF3zYxaKBN27bXaov2G29A",
    authDomain: "pwa-pushnotification-31d40.firebaseapp.com",
    projectId: "pwa-pushnotification-31d40",
    storageBucket: "pwa-pushnotification-31d40.firebasestorage.app",
    messagingSenderId: "991423945200",
    appId: "1:991423945200:web:464a215e6ab3b320cde535"
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
    // The method getToken(): Promise<string> allows FCM to use the VAPID key credential
    // when sending message requests to different push services
    return getToken(messaging, { vapidKey: `BBxBkkqubsa4ptjsOUqUtWD4nu9H9Mbuaf8grNX1dZYDnwlSttlVAUX-tEK95JTZOBz-cXQN5sGkzzzueq0lAJo` }) //to authorize send requests to supported web push services
        .then((currentToken) => {
            if (currentToken) {
                console.log('current token for client: ', currentToken);

                if(localStorage.getItem('fcmToken') && currentToken !==localStorage.getItem('fcmToken')){
                    localStorage.setItem('fcmToken', currentToken);

                }

                else if(!localStorage.getItem('fcmToken')){
                    localStorage.setItem('fcmToken', currentToken);

                }


            } else {
                console.log('No registration token available. Request permission to generate one.');
            }
        })
        .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
        });
};

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });



// Firebase Cloud Messaging Configuration File.
// Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyAXqNtctv9kYnfCxPLlwctQvzoGMGWM5-E",
    authDomain: "pwa-push-project.firebaseapp.com",
    projectId: "pwa-push-project",
    storageBucket: "pwa-push-project.firebasestorage.app",
    messagingSenderId: "412520000343",
    appId: "1:412520000343:web:21998c03f0d081cd982c12"
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
    // The method getToken(): Promise<string> allows FCM to use the VAPID key credential
    // when sending message requests to different push services
    return getToken(messaging, { vapidKey: `BD5i314iKTkhFP0KOuUyXVzo7rswE2el43VfeY4E4BJT3JMQ8q4OYCcjgFD0AVm1fwBiqoIR-vqbQ-MT2WFM8LU` }) //to authorize send requests to supported web push services
        .then((currentToken) => {
            if (currentToken) {
                console.log('Current token for client: ', currentToken);

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



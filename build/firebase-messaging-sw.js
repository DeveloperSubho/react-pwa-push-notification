// This a service worker file for receiving push notifitications.
// See `Access registration token section` @ https://firebase.google.com/docs/cloud-messaging/js/client#retrieve-the-current-registration-token

// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');


// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDXt91bxDpsZrF3zYxaKBN27bXaov2G29A",
  authDomain: "pwa-pushnotification-31d40.firebaseapp.com",
  projectId: "pwa-pushnotification-31d40",
  storageBucket: "pwa-pushnotification-31d40.firebasestorage.app",
  messagingSenderId: "991423945200",
  appId: "1:991423945200:web:464a215e6ab3b320cde535"
};


firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// Handle incoming messages while the app is not in focus (i.e in the background, hidden behind other tabs, or completely closed).
messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
      notificationOptions);
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Register the service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("${process.env.PUBLIC_URL}/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}

// Get FCM Token
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, { vapidKey: "YOUR_VAPID_KEY" });
      console.log("FCM Token:", token);
    } else {
      console.warn("Permission not granted for notifications");
    }
  } catch (error) {
    console.error("Error getting notification permission:", error);
  }
};

// Listen for foreground messages
onMessage(messaging, (payload) => {
  console.log("Message received in foreground:", payload);
});
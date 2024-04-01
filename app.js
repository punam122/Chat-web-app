// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCeEHmHYnxM5ef20qNyA3SIqvLg97rxTbQ",
    authDomain: "chat-web-app-4315e.firebaseapp.com",
    databaseURL: "https://chat-web-app-4315e-default-rtdb.firebaseio.com",
    projectId: "chat-web-app-4315e",
    storageBucket: "chat-web-app-4315e.appspot.com",
    messagingSenderId: "720468536024",
    appId: "1:720468536024:web:c053e9b70f4e73964885ad",
    measurementId: "G-5JPTVC5YLQ"
  };

  
  firebase.initializeApp(firebaseConfig);
  
  const db = firebase.database();
  
  const username = prompt("Please Tell Us Your Name");
  function sendMessage(e) {
    e.preventDefault();
  
    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;
  
    // clear the input box
    messageInput.value = "";
  
    //auto scroll to bottom
    document
      .getElementById("messages")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  
    // create db collection and send in the data
    db.ref("messages/" + timestamp).set({
      username,
      message,
    });
  }
  const fetchChat = db.ref("messages/");

fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span>${messages.username}: </span>${messages.message}</li>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});
// Import stylesheets
import "./style.css";

// Import liff
import liff from "@line/liff";

import axios from "axios";

// Write Javascript code!
const body = document.getElementById("body");

const userImg = document.getElementById("userImg");
const userId = document.getElementById("userId");
const userName = document.getElementById("userName");
const userStatus = document.getElementById("userStatus");
const userEmail = document.getElementById("userEmail");

const btnShare = document.getElementById("btnShare");
const btnRegister = document.getElementById("btnRegister");

axios
  .get("https://asia-east2-digitalwish-sticker.cloudfunctions.net/customers")
  .then(resp => {
    console.log(resp.data[0].email);
  });

/*
axios
  .post("https://asia-east2-digitalwish-sticker.cloudfunctions.net/customers", {
    msg: "Hello World!!"
  })
  .then(res => {
    console.log(`statusCode: ${res.statusCode}`);
    console.log(res);
  })
  .catch(error => {
    console.error(error);
  });
*/
async function main() {
  liff.ready.then(() => {
    if (liff.isInClient()) {
      getUserProfile();
    }
  });
  await liff.init({ liffId: "1655562497-nV3zqGQ4" });
}
main();

async function getUserProfile() {
  const profile = await liff.getProfile();
  userImg.src = profile.pictureUrl;
  userId.innerHTML = "<b>User ID:</b> " + profile.userId;
  userName.innerHTML = "<b>User Name:</b> " + profile.displayName;
  userStatus.innerHTML = "<b>User Status:</b> " + profile.statusMessage;
  userEmail.innerHTML = "<b>User Email:</b> " + liff.getDecodedIDToken().email;
}

btnRegister.onclick = () => {
  axios
    .get("https://asia-east2-digitalwish-sticker.cloudfunctions.net/customers")
    .then(resp => {
      console.log(resp.data[0].email);
      liff
        .sendMessages([
          {
            type: "text",
            text: resp.data[0].email
          }
        ])
        .then(() => {
          console.log("message sent");
        })
        .catch(err => {
          console.log("error", err);
        });
    });
};

const siginurl = "https://trekking-tech.onrender.com/api/auth/signup";

const alert1 = document.getElementById("alert1");

const alert2 = document.getElementById("alert2");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const sign_in = document.getElementById("sign_in");
// const express = require("express");

// app.use(static.use("public"));
const signin = async (e) => {
  e.preventDefault();
  const object = {
    username: username.value,
    password: password.value,
    email: email.value,
  };
  console.log(object);

  await fetch(siginurl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  })
    .then(async (res) => {
      const data = await res.json();
      console.log(data);
      if (data.value === 0) {
        localStorage.setItem("authtoken", data.authtoken);
        window.location.replace("https://trekking-tech.netlify.app/login.html");
      } 

      else if(data.value ===-2) {
        alert.innerHTML = "Password should be atleast 5 in length";
            setTimeout(function () {
              jsHide("alert1");
            }, 6000);

            function jsHide(id) {
              document.getElementById(id).style.display = "none";
            }
      }
      else{
        alert.innerHTML = "Invalid Credentials";
            setTimeout(function () {
              jsHide("alert2");
            }, 6000);

            function jsHide(id) {
              document.getElementById(id).style.display = "none";
            }
      }

        

      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

sign_in.addEventListener("click", signin);

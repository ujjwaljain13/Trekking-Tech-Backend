const siginurl = "http://localhost:5000/api/auth/signup";

const alert = document.getElementById("alert");
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
        window.location.replace("http://127.0.0.1:5500/login.html");
      } else {
        alert.innerHTML = `<span><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
            user already exist .</span>`;
      }
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

sign_in.addEventListener("click", signin);

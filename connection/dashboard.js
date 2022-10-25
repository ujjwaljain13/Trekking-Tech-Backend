// const { response } = require("express");

const token = localStorage.getItem("authtoken");
const username = document.getElementById("username");
const email = document.getElementById("email");
const alert = document.getElementById("alert");
const tick1 = document.getElementById("tick1");
const tick2 = document.getElementById("tick2");
const tick3 = document.getElementById("tick3");
const tick4 = document.getElementById("tick4");
const tick5 = document.getElementById("tick5");
const tick6 = document.getElementById("tick6");
const allurl = "http://localhost:5000/api/auth/alldata";

const alldata = async () => {
  await fetch(allurl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
  })
    .then(async (res) => {
      const data = await res.json();
      console.log(data.user.events);
      if (data.value === 0) {
        username.innerHTML = data.user.username;
        email.innerHTML = data.user.email;
        // tick.innerHTML = data.user.events;
        for (let i = 0; i < data.user.events.length; i++) {
          if (data.user.events[i] === "ETHIndia") {
            tick1.innerHTML = "✔️";
          } else if (data.user.events[i] === "define") {
            tick2.innerHTML = "✔️";
          } else if (data.user.events[i] === "Ur-Hackathon") {
            tick3.innerHTML = "✔️";
          } else if (data.user.events[i] === "Tenet") {
            tick4.innerHTML = "✔️";
          } else if (data.user.events[i] === "SWOC S3") {
            tick5.innerHTML = "✔️";
          } else if (data.user.events[i] === "Innovate") {
            tick6.innerHTML = "✔️";
          }
        }
      }
      // '<ion-icon name="checkmark-circle-outline"></ion-icon>';
      else {
        alert.innerHTML = `<span><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
            Server error Occured.</span>`;
        window.location.replace("http://127.0.0.1:5500/login.html");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

alldata();

const log_out = document.getElementById("log_out");

const func = () => {
  localStorage.clear("authtoken");
};

log_out.addEventListener("click", func);

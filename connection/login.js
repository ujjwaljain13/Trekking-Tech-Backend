const loginurl = "http://localhost:5000/api/auth/login";

const alert = document.getElementById("alert");
const username = document.getElementById("username");
const password = document.getElementById("password");
const log_in_btn = document.getElementById("login_btn");
console.log("ok");
const login = async (e) => {
  e.preventDefault();
  const object = {
    username: username.value,
    password: password.value,
  };
  await fetch(loginurl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  })
    .then(async (res) => {
      const data = await res.json();
      console.log(data);
      if (data.value === -2) {
        alert.style.visibility = "visible";
        alert.innerHTML = `<span><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
            Invalid credentials.</span>`;
      }
      localStorage.setItem("authtoken", data.authtoken);
      if (data.value === 0) {
        window.location.replace("http://127.0.0.1:5500/dashboard.html");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

log_in_btn.addEventListener("click", login);

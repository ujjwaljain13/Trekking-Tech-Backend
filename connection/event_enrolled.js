const revokeurl = "https://trekking-tech.onrender.com/api/events/revoke";
const enrollurl = "https://trekking-tech.onrender.com/api/events/enrolled";
const token = localStorage.getItem("authtoken");

let reg_stat = document.getElementById("enroll_btn");
const q1 = window.location.search;
const event_name = q1.substring(1);

const object = {
  event_name: event_name,
};
const revoke = async () => {
  await fetch(revokeurl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
    body: JSON.stringify(object),
  })
    .then(async (res) => {
      const data = await res.json();
      console.log(data);

      if (data.value === 0) {
        document.getElementById("alert");
        swal("Revoked", "You have been successfully revoked!!", "error");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const enroll = async () => {
  await fetch(enrollurl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
    body: JSON.stringify(object),
  })
    .then(async (res) => {
      const data = await res.json();
      console.log(data);
      // const { events } = req.body;
      //   if (data.value === 0) {
      //     enroll_btn.addEventListener("click", func);
      //   }
      //   const eve_data = client.query(`select events from users;`);
      // if (eve_data[0] == "ETHIndia") {
      //   func();
      // }
      if (data.value === 0) {
        document.getElementById("alert");
        swal("Success", "You have been successfully registered!!", "success");
      }

      if (data.value === -2) {
        document.getElementById("alert");
        swal("Information", "You are already registered", "info");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const func = () => {
  document.getElementById("enroll_btn").innerHTML = "Enrolled";
  document.getElementById("enroll_btn").style.color = "green";
};

const enroll_btn = document.getElementById("enroll_btn");

enroll_btn.addEventListener("click", enroll);
// enroll_btn.addEventListener("click", func);
const revoke_btn = document.getElementById("revoke_btn");

revoke_btn.addEventListener("click", revoke);

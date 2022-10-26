const timeLeft = document.getElementById("timeleft");
const timeLeft0 = document.getElementById("timeleft0");
// const { htmlToText } = require(html-to-text);
// const email = document.getElementById("email");
// const alert = document.getElementById("alert");
const eveurl = "https://trekking-tech.onrender.com/api/auth/eventdata";
const q = window.location.search;
const eve_name = q.substring(1);

const object1 = {
  "eve_name": eve_name
};

// const t= htmlToText(document.getElementById("timeleft"));
//   console.log(t);

const eventdata = async () => {
  await fetch(eveurl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object1),
  })
     
    .then(async (res) => {
      const data = await res.json();
      console.log(data.user.eventname);
      if (data.value === 0) {
       timeLeft.innerHTML = data.user.event_date ;
        // email.innerHTML = data.user.email;
      }
      const t=timeLeft.innerText;
      console.log(t);
      // const t="November 03,2022 12:00:00";
        const event = new Date(t);
    
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;
      let timerId;
    
      function countDown() {
        const today = new Date();
        const timeSpan = event - today;
        //milliseconds
        console.log(timeSpan);
    
        if (timeSpan <= -day) {
          timeLeft0.innerHTML = "Hope you had enjoyed the event!!";
          clearInterval(timerId);
          return;
        }
    
        if (timeSpan <= 0) {
          timeLeft0.innerHTML = "Event Ongoing";
          clearInterval(timerId);
          return;
        }
    
        const days = Math.floor(timeSpan / day);
        const hours = Math.floor((timeSpan % day) / hour);
        const minutes = Math.floor((timeSpan % hour) / minute);
        const seconds = Math.floor((timeSpan % minute) / second);
    
        timeLeft0.innerHTML =
          days +
          "Days" +
          " : " +
          hours +
          "Hrs" +
          " : " +
          minutes +
          "Mins" +
          " : " +
          seconds +
          "Secs";
      }
    
      timerId = setInterval(countDown, second);




    })
    .catch((err) => {
      console.log(err);
    });
};

eventdata();

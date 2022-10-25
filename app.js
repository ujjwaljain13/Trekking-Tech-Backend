const feedDisplay = document.querySelector("#disname");

await fetch("http://localhost:100/dashboard")
  .then(async (response) => {
    const data = response.json();
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

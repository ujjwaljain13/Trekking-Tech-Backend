const url = "http://localhost:100/login";

const func = async () => {
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

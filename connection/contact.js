function SendMail() {
  emailjs.send("service_z08svzw", "template_rn188xc", {
    to_name: "himanshu",
    from_name: "admin",
    message: "hello",
  });
  // .then(function (res) {
  //   console.log("success", res.status);
  //   alert("Success!" + res.status);
  // });
}

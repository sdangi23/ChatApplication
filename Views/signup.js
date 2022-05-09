document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("signup").addEventListener("click", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    let userdetails = {
        name: name,
        email: email,
        phone: phone,
        password: password, 
  };
console.log("check me")
  axios
  .post("http://54.145.181.21:3000/signup", userdetails)
  .then((result) => {
    alert(result.data.message);
    window.location.replace('./login.html')
  });
})
});
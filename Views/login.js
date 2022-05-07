document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("signup").addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    let userdetails = {
        email: email,
        password: password, 
  };
  axios
  .post("http://localhost:3000/login", userdetails)
  .then((result) => {
    alert(result.data.message);
    window.location.replace('./home.html')
  });
})
});
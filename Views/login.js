document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("signup").addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    let userdetails = {
        email: email,
        password: password, 
  };
  console.log(userdetails);
  axios
  .post("http://localhost:3000/login", userdetails)
  .then((result) => {
    alert(result.data.message); 
    if(result.status === 202){   
    localStorage.setItem('token' , result.data.Accesstoken)
    window.location.replace('./home.html')
    }else{
      document.getElementById("password").value="";
    }
  })
  .catch(error => {
        alert('Login-Failed Try again');
        document.getElementById("email").value="";
        document.getElementById("password").value="";
  })
})
});
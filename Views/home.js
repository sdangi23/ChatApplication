document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("sendMsg").addEventListener("click", (e) => {
    e.preventDefault();
    const message = document.getElementById("text-content").value;
    const token = localStorage.getItem('token');
    const msgdetails = {
        message: message, 
        token: token
    }

    console.log(msgdetails);


  axios.post('http://localhost:3000/savemsg', msgdetails, { headers: { "Authorization": token } })
  .then((result) => {
    alert(result.data.message); 
    if(result.status === 201){   
        document.getElementById("text-content").value="";
    }else{
      console.log('Failed')
    }
  })
  .catch(error => {
        console.log(error);
  })
})
});
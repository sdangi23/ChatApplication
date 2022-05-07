document.addEventListener('DOMContentLoaded', () => {
  
    showAllMsg();


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

async function showAllMsg(){
    const token = localStorage.getItem('token');
    const dbmsgs = await axios.get('http://localhost:3000/getmsg' , { headers: { "Authorization": token } });

    const textsArr = dbmsgs.data.texts;

    const container = document.getElementById('chat-box');
    container.innerHTML = '<div class="chat-box" id="chat-box"></div>'
    textsArr.forEach( (elem) => {
      const msgDiv = document.createElement('div');
      msgDiv.innerHTML = `<div class="message secondary">
      ${elem.userName} :: ${elem.message}
      <div class="timestamp">02:11</div>
    </div>`
      
      container.appendChild(msgDiv);
    })
}
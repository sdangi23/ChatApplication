document.addEventListener('DOMContentLoaded', () => {

  showAllMsg();
  setInterval( () => {
      updateMsg();
    } , 3000);


    document.getElementById("sendMsg").addEventListener("click", (e) => {
    e.preventDefault();
      

    const message = document.getElementById("text-content").value;
    const token = localStorage.getItem('token');
    const msgdetails = {
        message: message, 
        token: token
    }
    saveMsg(msgdetails, token);
})
});

async function saveMsg(msgdetails, token){
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
}

async function showAllMsg(){
    const token = localStorage.getItem('token');
    const dbmsgs = await axios.get('http://localhost:3000/getmsg' , { headers: { "Authorization": token } });

    const textsArr = dbmsgs.data.texts;
    let localTexts = [];
    if(textsArr.length < 10 && textsArr.length > 0){
    localStorage.setItem('lastMsg' , JSON.stringify(textsArr));
    }
    else if(textsArr.length > 10){
      
      const lastMsgSaved = textsArr.length;
      localTexts = textsArr.filter( (text) => text.msgid > (lastMsgSaved-10) );
      localStorage.setItem('lastMsg' , JSON.stringify(localTexts));
      console.log('inside show all' , localTexts.length);
    }

    const container = document.getElementById('chat-box');
    container.innerHTML = '<div class="chat-box" id="chat-box"></div>'
    localTexts.forEach( (elem) => {
      const msgDiv = document.createElement('div');
      msgDiv.innerHTML = `<div class="message secondary">
      ${elem.userName} :: ${elem.message}
      <div class="timestamp">02:11</div>
    </div>`
      
      container.appendChild(msgDiv);
    })
}

async function updateMsg(){
    const localArr = JSON.parse(localStorage.getItem('lastMsg'));
    const lastId = localArr[localArr.length-1].msgid+1;
    const token = localStorage.getItem('token');
    const dbmsgs = await axios.get(`http://localhost:3000/updatemsg?id=${lastId}` , { headers: { "Authorization": token } });
    const newArr = dbmsgs.data.texts;
    console.log('----- main call to ho ra hu --------- ');
    if(newArr.length === 0){
      return;
    }
    const textsArr = localArr.concat(newArr);
    console.log(textsArr);
    let localTexts = [];
    if(textsArr.length < 10 && textsArr.length > 0){
      localStorage.setItem('lastMsg' , JSON.stringify(textsArr));
      }
      else if(textsArr.length > 10){
        const lastMsgId = textsArr[textsArr.length-1].msgid;
        localTexts = textsArr.filter( (text) => text.msgid > (lastMsgId-10) );
        console.log('inside updateMsg ' ,localTexts.length);
        localStorage.setItem('lastMsg' , JSON.stringify(localTexts));
      }
    console.log('----- main update ho ra hu baar baar --------- ');
    const container = document.getElementById('chat-box');
    container.innerHTML = '<div class="chat-box" id="chat-box"></div>'
    localTexts.forEach( (elem) => {
      const msgDiv = document.createElement('div');
      msgDiv.innerHTML = `<div class="message secondary">
      ${elem.userName} :: ${elem.message}
      <div class="timestamp">02:11</div>
    </div>`
      
      container.appendChild(msgDiv);
      
    })
  
}
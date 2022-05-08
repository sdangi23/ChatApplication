document.addEventListener('DOMContentLoaded', () => {

  //loading signedup users

  //loading & updating messages
  showAllMsg();
  setInterval( () => {
      updateMsg();
    } , 3000);

    //creating a chat group
    document.getElementById('create-group').addEventListener('click' , (e) => {
        e.preventDefault();
        showAvailableUsers();
    })

    //Send Message Button Functionality
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

async function showAvailableUsers(){
  console.log('------------------ yes i am working ------------');
  const dbout = await axios.get('http://localhost:3000/getusers');
  const dbusers = dbout.data.dbusers;

  const userContainer = document.getElementById('myModal2');
  userContainer.innerHTML = `<div class="modal-content" id="myModal2">
  <span class="close">&times;</span>
  <input type="text" id="grpname" name="grpname" placeholder="Enter Name Of Your Group"><br>
</div>`;
  
  dbusers.forEach( (user) => {
    const usrbtn = document.createElement('button');
    usrbtn.innerHTML = `<button class="usr-btn" id="${user.id}" onclick="addToGrp(${user.id})"> ${user.name}</button>`;
    userContainer.appendChild(usrbtn);
  })

  //popup functionality
  {
  const modal = document.getElementById("myModal");
    
    // Get the button that opens the modal
    const btn = document.getElementById("create-group");
    
    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];
    
    // When the user clicks the button, open the modal 
    btn.onclick = function() {
      modal.style.display = "block";
    }
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

}

async function addToGrp(uId){
  const groupName = document.getElementById('grpname').value;
  console.log('----------group name desired ==> ' , groupName);
}
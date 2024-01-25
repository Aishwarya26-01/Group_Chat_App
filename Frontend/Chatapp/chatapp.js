async function userMessage(event){
    event.preventDefault();
    try {
        const token=localStorage.getItem('token')
        const messageDetails = {
            message:document.getElementById('message').value
        }
    
        const response = await axios.post('http://localhost:3000/chat/sendmessage',messageDetails,{headers:{"Authorization":token}})
        console.log(response);

        if(response.status === 200){
            console.log(response.data.message);
            showMessageonscreen(response.data.message);

            document.getElementById('message').value='';
        }
    } 
    catch(error) {
        document.body.innerHTML+=`<div style="color: red;text-align: center;">
                                      <h3>${error}</h3>
                                  </div>`
    }
};

async function displayMessage(allChat){
    const parentNode = document.getElementById('chat_messages');
    parentNode.innerHTML = '';
    console.log(allChat);
    for(i in allChat){
        showMessageonscreen(allChat[i]);
    }
}

function showMessageonscreen(user){
    console.log(user.message, user.name);
    const parentNode=document.getElementById('chat_messages');
    const childNode=`<li id='${user.id}'>${user.name}:${user.message}</li>`
    parentNode.innerHTML += childNode;
}

window.addEventListener('DOMContentLoaded',async()=>{
    const token=localStorage.getItem('token');
    try {
        const response = await axios.get('http://localhost:3000/chat/getmessage', {headers:{"Authorization":token}});
        console.log(response.data.allChat);
        if(response.status === 202){
            displayMessage(response.data.allChat)
        }

    } catch (error) {
        document.body.innerHTML+=`<div style="color: red;text-align: center;">
                                      <h3>${error}</h3>
                                  </div>`
    }
})

async function callApi(){
    const token=localStorage.getItem('token');
    try {
        const response = await axios.get('http://localhost:3000/chat/getmessage', {headers:{"Authorization":token}});
        console.log(response.data.allChat);
        if(response.status === 202){
            displayMessage(response.data.allChat)
        }

    } catch (error) {
        document.body.innerHTML+=`<div style="color: red;text-align: center;">
                                      <h3>${error}</h3>
                                  </div>`
    }
}

setInterval(callApi,1000);
async function userMessage(event){
    try {
        event.preventDefault();
        
        const token=localStorage.getItem('token')
        const messageDetails = {
            message:document.getElementById('message').value
        }
    
        const response = await axios.post('http://localhost:3000/chat/sendmessage',messageDetails,{headers:{"Authorization":token}})
        console.log(response);

        if(response.status===200){
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

function showMessageonscreen(user){
    console.log(user.message,user.name);
    const parentNode=document.getElementById('chat_messages');
    const childNode=`<li>${user.name}:${user.message}</li>`
    parentNode.innerHTML += childNode;
}
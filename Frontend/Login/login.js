async function loginUser(event) {
    try{
        event.preventDefault();

        const obj = { 
            email:event.target.email.value, 
            password:event.target.password.value
        }
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';

        const response = await axios.post("http://localhost:3000/user/login", obj)
            if(response.status === 200) {
                alert(response.data.message)
                localStorage.setItem('token',response.data.token)
                window.location.href="../Chatapp/chatapp.html"
            }
        }
    catch(err){
        console.log(JSON.stringify(err))
        alert(err.response.data.message)
        document.body.innerHTML += `<div style="color:red;">${err.response.data.message} <div>`;
    }
}
async function registerUser(event) {
    try{
        event.preventDefault();
        const obj = {
            name:event.target.name.value,
            email:event.target.email.value,
            phonenumber:event.target.phonenumber.value,
            password:event.target.password.value
        }

        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phonenumber').value = '';
        document.getElementById('password').value = '';

        const response = await axios.post("http://localhost:3000/user/signup", obj);
        console.log(response);
        if(response.status === 201) {
            alert(response.data.message)
        } else if(response.status === 202) {
            alert(response.data.message)
            throw new Error('Failed to signup');
        }
    }
    catch(err){
        document.body.innerHTML += `<div style="color:red;">${err} <div>`;
    }
}
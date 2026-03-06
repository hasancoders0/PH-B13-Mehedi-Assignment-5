const btnLogin = document.getElementById("btn-login");
// Login Button Click Event
btnLogin.addEventListener("click", () => {
    // post form submission
   const postSubmitText = document.getElementById("post-submission");
   postSubmitText.innerHTML = "";
 // Get user name and check varify with "admin"
    const userName = document.getElementById("get-username").value;
    let validUsername;
    if(userName.length === 0){
        postSubmitText.innerHTML = `<p class="text-alert">please enter your user name<p>`;
        return;
    }
    if(userName === "admin"){
        validUsername = true;
    }else{
        validUsername = false;
    }


 // get password and check varify with "admin123"
    const userPassword = document.getElementById("get-password").value;
    let validUserPass;
    if(userPassword.length === 0){
        postSubmitText.innerHTML = `<p class="text-alert">please enter password<p>`;
        return;
    }
    if(userPassword === "admin123"){
        validUserPass = true;
    }else{
        validUserPass = false;
    }

    if(validUsername != true || validUserPass != true){
        postSubmitText.innerHTML = `<p class="text-alert">Invalid Username or Password!<p>`;
        return
    }else{
        postSubmitText.innerHTML = `<p class="text-success">Login Success!<p>`;
        window.location.href = "./home.html";
    }
});

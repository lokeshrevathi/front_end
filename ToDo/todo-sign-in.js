import * as todoDao from "./tododao.js";
const signInForm = document.getElementById("sign-in-form-id");
signInForm.addEventListener('submit', () => {
    signInUser();
});
async function signInUser() {
    let response;
    let mailId = document.getElementById("sign-in-mail-id").value;
    let password = document.getElementById("sign-in-password").value;
    try {
        response = await todoDao.signInUser(mailId, password);
    } catch(error) {
        console.log(error);
    }
    if (response.ok) {
        alert("signed in successfully...!");
        document.getElementById("redirect-todo").submit();
    } else {
        alert("Invalid username or password...!");
    }

    // todoDao.signInUser(mailId, password).then(response => {
    //     if (200 == response.status) {
    //         alert("signed in successfully...!");
    //         document.getElementById("redirect-todo").submit();
    //     } else {
    //         alert("Invalid username or password...!");
    //     }
    // }).catch(error => console.log("Error:", error));
}
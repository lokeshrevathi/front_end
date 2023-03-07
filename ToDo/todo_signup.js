import * as todoDao from "./tododao.js";
const signUpForm = document.getElementById("sign-up-form-id");
signUpForm.addEventListener('submit', () => {
    signUpUser();
});
async function signUpUser() {
    let response;
    let userResponse;
    let userRequest = {
        name : document.getElementById("sign-up-user-name").value,
        mailId : document.getElementById("sign-up-mail-id").value,
        password : document.getElementById("sign-up-password").value
    }
    let lists = [{
        name:"My Day",
        staticList:true,
        active:true,
        user:{}
    },{
        name:"Important",
        staticList:true,
        user:{}
    },{
        name:"Planned",
        staticList:true,
        user:{}
    },{
        name:"Assigned to me",
        staticList:true,
        user:{}
    }];
    console.log("userRequest", userRequest);
    try {
        response = await todoDao.addUser(userRequest);
    } catch(error) {
        console.log(error);
    }
    console.log("response", response);
    if (response.ok) {
        userResponse = await response.json();
        console.log("userResponse", userResponse);
        lists.forEach(list => {
            console.log(list.name);
            list.user = userResponse;
            todoDao.addTaskList(list);
        });
        alert("Signed up successfully....!");
        document.getElementById("redirect-sign-in").submit();
    }

    // todoDao.addUser(userRequest).then(response => {
    //     console.log("response",response);
    //     if (200 == response.status) {
    //         // console.log("response.json", response.json())
    //         response.json().then(result => {
    //             let i = 1;
    //             lists.forEach(list => {
    //                 console.log(i, list);
    //                 list.user = result;
    //                 todoDao.addTaskList(list);
    //             });
    //         });
            // alert("Signed up successfully....!");
            // document.getElementById("redirect-sign-in").submit();
    //     }
    // }).catch(error => console.log("Error:", error));
}
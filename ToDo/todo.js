let toggleIcon;
let checkedToggleicon;
let searchContainerShow;
let mainContainerFull;
let currentUser;
let closeSignOutDiv;
const taskUrl = 'http://localhost:8080/api/v1/task/';
const completedUrl = 'http://localhost:8080/api/v1/task/completed/';
const searchedTaskUrl = 'http://localhost:8080/api/v1/task';
const postMethod = 'POST';
const putMethod = 'PUT';
let searchContainerConunt;
const searchBar = document.getElementById("search-bar-id");
window.addEventListener('load', function() {
    toRedirect();
    // toggleIcon = "saved";
    // searchContainerConunt = 0;
    // searchContainerShow = true;
    // mainContainerFull = false;
    // closeSignOutDiv = true;

});
function toRedirect() {
    getSignedInUser().then(response => {
        if (200 == response.status) {
            response.json().then(user => {
                currentUser = user;
                showTasks(user);
                showCompletedTask(user);
            });
            disableSearchBar();
            maniMenuIcon();
            showProfileIcon();
        } else {
            indexpage();
        }
    });
    toggleIcon = "saved";
    searchContainerConunt = 0;
    searchContainerShow = true;
    mainContainerFull = false;
    closeSignOutDiv = true;
}
document.getElementById("task-value").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});
function removeEventListeners(element) {
    element.removeEventListener('click', function() {
        editTask(element);
    });
}
function disableSearchBar(element) {
    let searchBarDiv = document.getElementById("search-bar-div-id");
    if (1 < searchBarDiv.childElementCount) {
        element.previousSibling.remove();
        element.remove();
    }
    let disabledSearchBar = document.createElement("div");
    disabledSearchBar.className = "search-bar";
    searchBarDiv.appendChild(disabledSearchBar);
    disabledSearchBar.addEventListener('click', () => {
        enableSearchBar(disabledSearchBar);
    });
}
function enableSearchBar(element) {
    let searchBarDiv = document.getElementById("search-bar-div-id");
    element.remove();
    let searchBar = document.createElement("input");
    let closeSearchBox = document.createElement("span");
    searchBar.className = "search-box";
    searchBar.type = "text";
    searchBar.placeholder = "Search";
    closeSearchBox.className = "material-symbols-outlined";
    closeSearchBox.innerText = "close";
    element.appendChild(searchBar);
    searchBarDiv.appendChild(searchBar);
    searchBarDiv.appendChild(closeSearchBox);
    searchBar.focus();
    closeSearchBox.addEventListener('click', () => {
        disableSearchBar(closeSearchBox);
        document.getElementById("searched-task").remove();
        searchContainerConunt = 0;
    });
    searchBar.addEventListener('input', () => {
        searchContainerConunt++;
        if (searchContainerConunt == 1) {
            createSearchContainer();
        }
        let searchDiv = document.getElementById("searched-task").childNodes[2].childNodes[0];
        let sCount = searchDiv.childElementCount;
        if (0 != sCount) {
            searchDiv.innerHTML = '';
        }
        showSearchedTasks(searchBar.value);
    });
}
function editFunc(element, value) {
    let editDiv = element.parentNode;
    let saveIcon = document.createElement("i");
    if (toggleIcon == "onEdit") {
        alert("Please save the task....!");
        console.log(editDiv.previousSibling.childNodes[0]);
        return false;
    }
    toggleIcon = "onEdit";
    editDiv.previousSibling.childNodes[0].disabled = false;
    saveIcon.className = "fa fa-floppy-o trash-align";
    editDiv.removeChild(editDiv.childNodes[0]);
    editDiv.appendChild(saveIcon);
    editDiv.previousSibling.childNodes[0].focus();
    saveIcon.addEventListener('click', function() {
        saveFunc(saveIcon, value);
    });
    console.log(editDiv.previousSibling.childNodes[0]);
    editDiv.previousSibling.childNodes[0].addEventListener('keypress', event => {
        if (event.key === "Enter") {
            saveFunc(saveIcon, value);
        }
    });
}
function saveFunc(element, value) {
    toggleIcon = "saved";
    let editDiv = element.parentNode;
    let oldvalue = value.taskName;
    value.taskName = editDiv.previousSibling.childNodes[0].value;
    console.log(value);
    if (oldvalue != value.taskName) {
        postTask(value, "PUT").then(data => console.log("success", data)).catch(error => console.log("Error:", error));
    }
    let editIcon = document.createElement("i");
    let editedTaskElement = editDiv.previousSibling.childNodes[0];
    if (editedTaskElement.value == "") {
        alert("please enter task....!");
        count--;
        editDiv.previousSibling.childNodes[0].focus();
        return false;
    }
    editedTaskElement.disabled = "true";
    editIcon.className = "fa fa-pencil trash-align";
    editDiv.removeChild(editDiv.childNodes[0]);
    editDiv.appendChild(editIcon);
    editIcon.addEventListener('click', () => {
        editFunc(editIcon, value);
    });
}
function customPopup(element, value, taskStatus, obj) {
    console.log(element);
    let popupDiv = document.createElement("div");
    let popupMessage = document.createElement("div");
    let bottomDiv = document.createElement("div");
    let okButtonDiv = document.createElement("div");
    let cancelButtonDiv = document.createElement("div");
    let okButton = document.createElement("button");
    let cancelButton = document.createElement("button");
    popupDiv.className = "popup";
    popupMessage.className = "popup-message";
    popupMessage.innerText = value ;
    bottomDiv.className = "bottom-div";
    okButtonDiv.className = "ok-button-div";
    cancelButtonDiv.className = "cancel-button-div";
    okButton.innerText = "ok";
    okButton.className = "ok-button";
    cancelButton.innerText = "cancel";
    cancelButton.className = "cancel-button";
    okButtonDiv.appendChild(okButton);
    cancelButtonDiv.appendChild(cancelButton);
    bottomDiv.appendChild(okButtonDiv);
    bottomDiv.appendChild(cancelButtonDiv);
    popupDiv.appendChild(popupMessage);
    popupDiv.appendChild(bottomDiv);
    document.body.appendChild(popupDiv);
    okButton.addEventListener('click', () => {
        popupDiv.remove();
        removeTask(element, taskStatus, obj);
    });
    cancelButton.addEventListener('click', function() {
        popupDiv.remove();
    });
}
function removeTask(element, taskStatus, value) {
    let tasks = Array.from(element.parentNode.parentNode.childNodes);
    console.log(value);
    value.deleted = true;
    postTask(value, "PUT").then(data => console.log("success", data)).catch(error => console.log("Error:", error));
    // getTasks(url).then(taskList => {
    //     let taskObj = taskList[position];
    //     taskObj.deleted = true;
    //     postTask(taskObj, "PUT").then(data => console.log("success", data)).catch(error => console.log("Error:", error));

    // });
    element.parentElement.remove();
    removeMidChild();
}
function midDiv() {
    let completedElementCount = document.getElementById("container-two").childElementCount;
    let containerMiddle = document.getElementById("container-middle");
    let middleLeftSide = document.createElement("div");
    let downArrow = document.createElement("i");
    let dropDownCheckbox = document.createElement("input");
    let middleDiv = document.createElement("div");
    let middleRightSide = document.createElement("div");
    if (completedElementCount == 1) {
        middleLeftSide.className = "mid-left-side";
        downArrow.id = "down-arrow";
        downArrow.className = "fa fa-angle-down";
        dropDownCheckbox.id = "check-box";
        dropDownCheckbox.type = "checkbox";
        dropDownCheckbox.setAttribute("onchange", "hideElement(this)");
        middleLeftSide.appendChild(downArrow);
        middleLeftSide.appendChild(dropDownCheckbox);
        middleDiv.className = "mid-div";
        middleDiv.innerText = "Completed";
        middleRightSide.id = "mid-right-side";
        middleRightSide.className = "mid-right-side";
        containerMiddle.appendChild(middleLeftSide);
        containerMiddle.appendChild(middleDiv);
        containerMiddle.appendChild(middleRightSide);
    }
    document.getElementById("mid-right-side").innerText = completedElementCount;
}
function removeMidChild() {
    let completedElementCount = document.getElementById("container-two").childElementCount;
    let containerMiddle = document.getElementById("container-middle");
    console.log(completedElementCount);
    if (completedElementCount == 0) {
        containerMiddle.innerHTML = '';
    }
    document.getElementById("mid-right-side").innerText = completedElementCount;
}
function completed(element, value, taskStatus) {
    console.log(value, "for completed");
    let elementContainer = element.parentNode.parentNode;
    let elementDiv = element.parentNode;
    let checkMark = document.createElement("span");
    let container = document.getElementById("container-two");
    element.remove();
    checkMark.innerText = "check_circle";
    checkMark.className = "material-symbols-outlined";
    checkMark.addEventListener('click', () => {
        redo(checkMark, value);
    });
    elementDiv.appendChild(checkMark);
    if (toggleIcon == "onEdit") {
        alert("Please save the task....!");
        element.checked = false;
        return false;
    }
    value.completed = true;
    postTask(value, "PUT").then(data => console.log("success", data)).catch(error => console.log("Error:", error));
    elementContainer.childNodes[2].removeChild(elementContainer.childNodes[2].childNodes[0]);
    container.appendChild(elementContainer);
    midDiv();
}
function redo(element, value, taskStatus) {
    let elementContainer = element.parentNode.parentNode;
    let elementDiv = element.parentNode;
    let container = document.getElementById("container");
    let editIcon = document.createElement("i");
    let circleCheckBox = document.createElement("span");
    element.remove();
    circleCheckBox.innerText = "circle";
    circleCheckBox.setAttribute("type", "checkbox");
    circleCheckBox.setAttribute("class", "material-symbols-outlined");
    circleCheckBox.addEventListener('click', () => {
        completed(circleCheckBox, value);
    });
    value.completed = false;
    postTask(value, "PUT").then(data => console.log("success", data)).catch(error => console.log("Error:", error));
    editIcon.className = "fa fa-pencil trash-align";
    elementContainer.childNodes[0].appendChild(circleCheckBox);
    elementContainer.childNodes[2].appendChild(editIcon);
    container.appendChild(elementContainer);
    eventListeners(editIcon);
    removeMidChild();
}
function hideElement(element) {
    let arrow = document.getElementById("down-arrow");
    let hideDiv = document.getElementById("container-two");
    if (element.checked) {
        arrow.style.transform = "rotate(-90deg)";
        hideDiv.className = "hide-element";
    } else {
        arrow.style.transform = "rotate(0deg)";
        hideDiv.className = "show-element";
    }
}
function addTask() {
    let addedTask = { 
        taskName : document.getElementById("task-value").value,
        userDTO : currentUser
    };
    if (addedTask.taskName == "") {
        alert("Please add the task...!");
        return false;
    }
    postTask(addedTask, "POST").then(data => {
        console.log("success", data);
        createTaskDiv(data);
    }).catch(error => console.log("Error:", error));
    document.getElementById("task-value").value = "";
}
function showTasks(user) {
    getTasks('http://localhost:8080/api/v1/task/' + user.id).then(function(result) {
        console.log(result);
        for (let i of result) {
            createTaskDiv(i, "redo");
        }
    });
}
function showCompletedTask(user) {
    getTasks('http://localhost:8080/api/v1/task/completed/' + user.id).then(function(result) {
        for (let i of result) {
            createCompletedTaskDiv(i, "completed");
        }
    });
}
function addLastTask() {
    getTasks(taskUrl).then(function(result) {
        createTaskDiv(result[result.length - 1]);
    });
}
function createTaskDiv(value, taskStatus) {
    checkedToggleicon = taskStatus;
    let taskContainer = document.getElementById("container");
    taskContainer.appendChild(createTodoTaskDiv(value, taskStatus));
}
function createTodoTaskDiv(value, taskStatus) {
    let task = document.createElement("div");
    let taskInnerLeft = document.createElement("div");
    let circleCheckBox = document.createElement("span");
    let taskInnerMiddle = document.createElement("div");
    let taskValue = document.createElement("input");
    let editIconDiv = document.createElement("div");
    let editIcon = document.createElement("i");
    let taskInnerRight = document.createElement("div");
    let trashIcon = document.createElement("i");
    task.className = "added-task";
    taskInnerLeft.className = "task-left-side-sub";
    circleCheckBox.innerText = "circle";
    circleCheckBox.setAttribute("type", "checkbox");
    circleCheckBox.setAttribute("class", "material-symbols-outlined");
    circleCheckBox.addEventListener('click', () => {
        completed(circleCheckBox, value, taskStatus);
    });
    taskInnerLeft.appendChild(circleCheckBox);
    taskInnerMiddle.className = "task-right-side-sub";
    taskValue.id = "task-name";
    taskValue.disabled = "true";
    taskValue.className = "task-value-align";
    taskValue.value = value.taskName;
    taskInnerMiddle.appendChild(taskValue);
    editIconDiv.id = "edit-task-div";
    editIconDiv.className = "edit-task-show";
    editIcon.className = "fa fa-pencil trash-align";
    editIconDiv.appendChild(editIcon);
    editIcon.addEventListener('click', () => {
        editFunc(editIcon, value);
    });
    taskInnerRight.className = "add-task-sub";
    taskInnerRight.id = "remove-task";
    trashIcon.className = "fa fa-trash trash-align";
    taskInnerRight.appendChild(trashIcon);
    taskInnerRight.addEventListener('click', () => {
        customPopup(taskInnerRight, 'Do you want to delete the task....!', taskStatus, value)
    });
    task.appendChild(taskInnerLeft);
    task.appendChild(taskInnerMiddle);
    task.appendChild(editIconDiv);
    task.appendChild(taskInnerRight);
    return task;
}
function createCompletedTaskDiv(value, taskStatus) {
    checkedToggleicon = taskStatus;
    let taskContainer = document.getElementById("container-two");
    let task = document.createElement("div");
    let taskInnerLeft = document.createElement("div");
    let circleCheckBox = document.createElement("span");
    let taskInnerMiddle = document.createElement("div");
    let taskValue = document.createElement("input");
    let editIconDiv = document.createElement("div");
    let taskInnerRight = document.createElement("div");
    let trashIcon = document.createElement("i");
    task.className = "added-task";
    taskInnerLeft.className = "task-left-side-sub";
    circleCheckBox.innerText = "check_circle";
    circleCheckBox.setAttribute("type", "checkbox");
    circleCheckBox.setAttribute("class", "material-symbols-outlined");
    circleCheckBox.addEventListener('click', () => {
        redo(circleCheckBox, value, taskStatus);
    });
    taskInnerLeft.appendChild(circleCheckBox);
    taskInnerMiddle.className = "task-right-side-sub";
    taskValue.id = "task-name";
    taskValue.disabled = "true";
    taskValue.className = "task-value-align";
    taskValue.value = value.taskName;
    taskInnerMiddle.appendChild(taskValue);
    editIconDiv.id = "edit-task-div";
    editIconDiv.className = "edit-task-show";
    taskInnerRight.className = "add-task-sub";
    taskInnerRight.id = "remove-task";
    trashIcon.className = "fa fa-trash trash-align";
    taskInnerRight.appendChild(trashIcon);
    taskInnerRight.addEventListener('click', () => {
        customPopup(taskInnerRight, 'Do you want to delete the task....!', taskStatus, value);
    })
    task.appendChild(taskInnerLeft);
    task.appendChild(taskInnerMiddle);
    task.appendChild(editIconDiv);
    task.appendChild(taskInnerRight);
    taskContainer.appendChild(task);
    midDiv();
}
async function postTask(data, methods) {
    const response = await fetch(taskUrl, {
        method: methods,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return response.json();
}
async function getTasks(url) {
    const response = await fetch(url, {
        method: "GET",
    });
    // console.log(response);
    return  response.json();
}
async function getTasksByName(name) {
    let url = 'http://localhost:8080/api/v1/task?id=' + currentUser.id + '&taskName=' + name;
    const response = await fetch(url);
    return response.json();
}
function createSearchContainer() {
    let searchDiv = document.createElement("div");
    let searchDivTop = document.createElement("div");
    let searchDivMiddle = document.createElement("div");
    let searchDivBottomOuter = document.createElement("div");
    let searchDivBottom = document.createElement("div");
    searchDiv.id = "searched-task";
    searchDiv.className = "searched-task-container";
    searchDivTop.className = "searched-task-container-top";
    searchDivMiddle.className = "searched-task-container-middle";
    searchDivBottomOuter.id = "searched-task-bottom-outer";
    searchDivBottomOuter.className = "searched-task-container-bottom-outer-show";
    searchDivBottom.id = "searched-task-bottom";
    searchDivBottom.className = "searched-task-container-bottom";
    searchDiv.appendChild(searchDivTop);
    // searchDivMiddle.appendChild(navigateSearchedTasks());
    searchDiv.appendChild(searchDivMiddle);
    searchDivBottomOuter.appendChild(searchDivBottom);
    searchDiv.appendChild(searchDivBottomOuter);
    // document.body.appendChild(searchDiv);
    document.getElementById("mani-body-right-id").appendChild(searchDiv);
    navigateSearchedTasks(searchDivMiddle);
}
function showSearchedTasks(value) {
    let container = document.getElementById("searched-task-bottom");
    getTasksByName(value).then(result => {
        document.getElementById("navigate-count").innerText = result.length;
        for (let i of result) {
            container.appendChild(createTodoTaskDiv(i,"searched"));
        }
    })
}
function navigateSearchedTasks(element) {
    let navigateDiv = document.createElement("div");
    let iconDiv = document.createElement("div");
    let textDiv = document.createElement("div");
    let countDiv = document.createElement("div");
    let dropDownIcon = document.createElement("i");
    dropDownIcon.className = "fa fa-angle-down arrow-down";
    navigateDiv.id = "searched-navigate";
    navigateDiv.className = "searched-navigate-container";
    iconDiv.className = "navigate-icon-container";
    textDiv.className = "navigate-text-container";
    countDiv.id = "navigate-count";
    countDiv.className = "navigate-count-container";
    textDiv.innerText = "Tasks";
    iconDiv.appendChild(dropDownIcon);
    navigateDiv.appendChild(iconDiv);
    navigateDiv.appendChild(textDiv);
    navigateDiv.appendChild(countDiv);
    element.appendChild(navigateDiv);
    navigateDiv.addEventListener('click', () => {
        searchContainerShow = !searchContainerShow;
        hideSearchContainer(element.nextSibling, dropDownIcon);
    });
}
function hideSearchContainer(container, icon) {
    if (searchContainerShow) {
        container.className = "searched-task-container-bottom-outer-show";
        icon.style.transform = "rotate(0deg)";
    } else {
        container.className = "searched-task-container-bottom-outer-hide";
        icon.style.transform = "rotate(-90deg)";
    }
}
function maniMenuIcon() {
    let leftDiv = document.getElementById("main-left-div");
    let menuIconDiv = document.createElement("div");
    let menuIcon = document.createElement("span");
    menuIcon.className = "material-symbols-outlined";
    menuIcon.innerText = "menu";
    menuIconDiv.className = "menu-icon-div";
    menuIconDiv.appendChild(menuIcon);
    leftDiv.appendChild(menuIconDiv);
    menuIcon.addEventListener('click', () => {
        mainContainerFull = !mainContainerFull;
        mainContainerAlignFull(leftDiv, leftDiv.nextElementSibling);
    });
}
function mainContainerAlignFull(left, right) {
    if (mainContainerFull) {
        right.className = "main-body-right-full";
        left.className = "main-body-left-hide";
    } else {
        left.className = "main-body-left-show";
        right.className = "main-body-right-normal";
    }
}
function showProfileIcon() {
    let menuBar = document.getElementById("menu-bar");
    let profileIconDiv = document.createElement("div");
    let profileIcon = document.createElement("span");
    profileIcon.className = "material-symbols-outlined";
    profileIcon.innerText = "account_circle";
    profileIconDiv.className = "profile-icon-div";
    profileIconDiv.appendChild(profileIcon);
    menuBar.appendChild(profileIconDiv);
    profileIconDiv.addEventListener('click', () => {
        closeSignOutDiv = !closeSignOutDiv;
        if (!closeSignOutDiv) {
            createSignOut();
        } else {
            document.getElementById("sign-out-div").remove();
        }
    });
}
function createSignOut() {
    let signOutDiv = document.createElement("div");
    let topDiv = document.createElement("div");
    let topLeft = document.createElement("div");
    let signOutButtonDiv = document.createElement("div");
    let signOutButton = document.createElement("button");
    let bottomDiv = document.createElement("div");
    let bottomLeft = document.createElement("div");
    let bottomRight = document.createElement("div");
    signOutDiv.id = "sign-out-div";
    signOutDiv.className = "sign-out-div";
    topDiv.className = "sign-out-top-div";
    topLeft.className = "sign-out-top-left";
    signOutButtonDiv.className = "sign-out-button-div";
    signOutButton.className = "sign-out-button";
    signOutButton.innerText = "Sign out";
    bottomDiv.className = "sign-out-bottom-div";
    bottomLeft.className = "sign-out-bottom-left";
    bottomRight.className = "sign-out-bottom-right";
    topDiv.appendChild(topLeft);
    signOutButtonDiv.appendChild(signOutButton);
    topDiv.appendChild(signOutButtonDiv);
    signOutDiv.appendChild(topDiv);
    bottomDiv.appendChild(bottomLeft);
    bottomDiv.appendChild(bottomRight);
    signOutDiv.appendChild(bottomDiv);
    document.body.appendChild(signOutDiv);
    signOutButton.addEventListener('click', () => {
        signOutDiv.remove();
        signOutUser(currentUser.id).then(response => {
            if (response.status == 200) {
                document.getElementById("container").innerText = '';
                document.getElementById("container-middle").innerText = '';
                document.getElementById("container-two").innerText = '';
                toRedirect();
            }
        });
    });
}
function indexpage() {
    let indexBody = document.createElement("div");
    let startedButton = document.createElement("button");
    indexBody.className = "index-body";
    startedButton.className = "start-button";
    startedButton.innerText = "get Started";
    indexBody.appendChild(startedButton);
    document.body.appendChild(indexBody);
    startedButton.addEventListener('click', () => {
        startedButton.remove();
        signingDiv(indexBody);
    });
}
function signingDiv(element) {
    let signingDiv = document.createElement("div");
    let signUpButton = document.createElement("button");
    let signInButton = document.createElement("button");
    signUpButton.className = "sign-in-button";
    signUpButton.innerText = "Sign Up";
    signInButton.className = "sign-up-button";
    signInButton.innerText = "Sign In";
    signingDiv.className = "signing-div";
    signingDiv.appendChild(signUpButton);
    signingDiv.appendChild(signInButton);
    element.appendChild(signingDiv);
    signUpButton.addEventListener('click', () => {
        signingDiv.remove();
        createUser(element);
    });
    signInButton.addEventListener('click', () => {
        signingDiv.remove();
        signIn(element);
    })
}
function createUser(element) {
    let createAccountDiv = document.createElement("div");
    let text = document.createElement("p");
    let userNameDiv = document.createElement("div");
    let userNameLabel = document.createElement("label");
    let userNameInput = document.createElement("input");
    let mailIdDiv = document.createElement("div");
    let mailIdLabel = document.createElement("label");
    let mailIdInput = document.createElement("input");
    let passwordDiv = document.createElement("div");
    let passwordLabel = document.createElement("label");
    let passwordInput = document.createElement("input");
    let submitAccount = document.createElement("button");
    userNameLabel.innerText = "User Name";
    mailIdLabel.innerText = "Mail Id";
    passwordLabel.innerText = "Password";
    createAccountDiv.className = "create-account-div";
    text.className = "create-account-text";
    text.innerText = "Create Account";
    userNameDiv.className = "user-name-div";
    mailIdDiv.className = "mail-id-div";
    passwordDiv.className = "password-div";
    userNameInput.className = "user-name-input";
    mailIdInput.className = "mail-id-input";
    mailIdInput.type = "email";
    passwordInput.className = "password-input";
    passwordInput.type = "password";
    submitAccount.innerText = "Sign up";
    createAccountDiv.appendChild(text);
    userNameDiv.appendChild(userNameLabel);
    userNameDiv.appendChild(userNameInput);
    createAccountDiv.appendChild(userNameDiv);
    mailIdDiv.appendChild(mailIdLabel);
    mailIdDiv.appendChild(mailIdInput);
    createAccountDiv.appendChild(mailIdDiv);
    passwordDiv.appendChild(passwordLabel);
    passwordDiv.appendChild(passwordInput);
    createAccountDiv.appendChild(passwordDiv);
    createAccountDiv.appendChild(submitAccount);
    element.appendChild(createAccountDiv);
    submitAccount.addEventListener('click', () => {
        alert("Account created successflly...!");
        createAccountDiv.remove();
        user = {
            name : userNameInput.value,
            mailId : mailIdInput.value,
            password : passwordInput.value,
            tasks : []
        };
        console.log(user);
        addUser(user, "POST", "http://localhost:8080/api/v1/user/")
        .then(data => console.log("success", data))
        .catch(error => console.log("Error:", error));
        signingDiv(element);
    });
}
function signIn(element) {
    let signInDiv = document.createElement("div");
    let text = document.createElement("p");
    let mailIdDiv = document.createElement("div");
    let mailIdLabel = document.createElement("label");
    let mailIdInput = document.createElement("input");
    let passwordDiv = document.createElement("div");
    let passwordLabel = document.createElement("label");
    let passwordInput = document.createElement("input");
    let submit = document.createElement("button");
    signInDiv.className = "sign-in-div";
    text.innerText = "Sign In";
    text.className = "sign-in-text";
    mailIdLabel.innerText = "Mail Id";
    passwordLabel.innerText = "Password";
    mailIdDiv.className = "mail-id-div";
    mailIdInput.className = "mail-id-input";
    mailIdInput.type = "email";
    passwordDiv.className = "password-div";
    passwordInput.className = "password-input";
    passwordInput.type = "password";
    submit.innerText = "Sign In";
    passwordDiv.appendChild(passwordInput);
    signInDiv.appendChild(text);
    mailIdDiv.appendChild(mailIdLabel);
    mailIdDiv.appendChild(mailIdInput);
    signInDiv.appendChild(mailIdDiv);
    passwordDiv.appendChild(passwordLabel);
    passwordDiv.appendChild(passwordInput);
    signInDiv.appendChild(passwordDiv);
    signInDiv.appendChild(submit);
    element.appendChild(signInDiv);
    submit.addEventListener('click', () => {
        signInTodo(mailIdInput.value, passwordInput.value).then(response => {
            if (200 == response.status) {
                element.remove();
                response.json().then(user => {
                    currentUser = user;
                    showTasks(user);
                    showCompletedTask(user);
                });
                // showTasks();
                // showCompletedTask();
                disableSearchBar();
                maniMenuIcon();
                showProfileIcon();
            } else {
                alert("incorrect mail id or password....!")
            }
        });
    });
}
async function signOutUser(id) {
    let url = 'http://localhost:8080/api/v1/user/' + id;
    const response = await fetch(url, {
        method: 'PATCH'
    });
    return response;
}
async function getSignedInUser() {
    let url = 'http://localhost:8080/api/v1/user/';
    const response = await fetch(url);
    return response;
}
async function signInTodo(mailId, password) {
    let url = 'http://localhost:8080/api/v1/user/mail-id/' + mailId + '/password/' + password;
    const response = await fetch(url);
    return response;
}
async function addUser(data, methods, url) {
    const response = await fetch(url, {
        method: methods,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return response.json();
}
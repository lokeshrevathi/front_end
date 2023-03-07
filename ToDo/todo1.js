
 import * as todoDao from "./tododao.js";
const addNewList = document.getElementById("add-new-list");
const addIcon = document.getElementById("add-icon");
const profilePopupDiv = document.getElementById("profile-popup");
const headerProfile = document.getElementById("header-profile-id");
const signOutButton = document.getElementById("sign-out-button");
const addTaskbutton = document.getElementById("add-remove-icon-div-id");
const completedTask = document.getElementById("completed-task-div");
var isPopupProfileShowed = false;
var selectedList = null;
var lists = [];
var icons = new Map([["My Day", {icon:"light_mode",id:"my-day"}],
["Important", {icon:"star",id:"important"}],
["Planned", {icon:"calendar_month",id:"planned"}],
["Assigned to me", {icon:"person",id:"assigned-to-me"}]]);
window.addEventListener('load', async () => {
    profilePopupDiv.style.visibility = "hidden";
    // // console.log(selectedList);
    let activeListResponse;
    let activeList;
    let user = await getCurrentUser();
    // // console.log(user);
    showProfileIcon(user);
    loadTaskList(user);
    hideMidElement();
    activeListResponse = await todoDao.getActivedTaskList();
    if (activeListResponse.ok) {
        activeList = await activeListResponse.json();
        // // console.log(activeList);
        // // console.log(icons);
        if (activeList.name == "My Day" || activeList.name == "Important" || activeList.name == "Planned" || activeList.name == "Assigned to me") {
            changeMainBody(activeList, icons.get(activeList.name).icon, document.getElementById(icons.get(activeList.name).id));
        } else {
            // // console.log(activeList.id);
            changeMainBody(activeList, "list", document.getElementById(activeList.id));
        }
    } else {
        toTasksList(document.getElementById("static-div-five"));
    }
});
signOutButton.addEventListener('click', () => {
    signOutUser();
});
headerProfile.addEventListener('click', () => {
    isPopupProfileShowed = !isPopupProfileShowed;
    if (isPopupProfileShowed) {
        profilePopupDiv.style.visibility = "visible";
    } else {
        profilePopupDiv.style.visibility = "hidden";
    }
});
addIcon.addEventListener('click', () => {
    addNewList.focus();
});
addNewList.addEventListener('keydown', (event) => {
    let list = {
        name:null,
        user:{}
    }
    if (event.key == "Enter") {
        getCurrentUser().then(currentUser => {
            // // console.log(currentUser);
            list.name = addNewList.value;
            list.user = currentUser;
            lists.push(list);
            todoDao.addTaskList(list).then(response => {
                if (200 == response.status) {
                    response.json().then(result => {
                        createDynamicList(result);
                        changeMainBody(result, "list");
                    });
                }
            });
            addNewList.value = '';
            addNewList.blur();
        });
    }
});
addTaskbutton.addEventListener('click', () => {
    console.log(addTaskbutton.parentNode);
    let inputElement = addTaskbutton.parentNode.childNodes[3].childNodes[1];
    if (inputElement.value == "") {
        alert("Please enter the task...!");
        return false;
    }
    addTask(inputElement.value);
});
addTaskbutton.parentNode.childNodes[3].childNodes[1].addEventListener('keydown', event => {
    if (event.key === "Enter") {
        let inputElement = addTaskbutton.parentNode.childNodes[3].childNodes[1];
        if (inputElement.value == "") {
            alert("Please enter the task...!");
            return false;
        }
        addTask(inputElement.value);
    }
});
function addTask(value) {
    let element = addTaskbutton.parentNode;
    let addTaskDiv = document.getElementById("added-task-div");
    // element.classList.add("bottom-margin");
    let newTask = element.cloneNode(true);
    newTask.classList.add("bottom-margin");
    let circleIcon = newTask.childNodes[1].childNodes[1];
    let inputElement = element.childNodes[3].childNodes[1];
    let clonedInputElement = newTask.childNodes[3].childNodes[1];
    let editIcon = newTask.childNodes[5];
    let importantIcon = newTask.childNodes[7];
    let removeIcon = newTask.childNodes[9].childNodes[1];
    clonedInputElement.disabled = true;
    editIcon.style.visibility = "visible";
    importantIcon.style.visibility = "visible";
    removeIcon.innerText = "delete";
    newTask.classList.add("added-task-animation");
    console.log(editIcon);
    circleIcon.addEventListener('mouseover', event => {
        circleIcon.innerText = "check_circle";
        circleIcon.addEventListener('mouseout', event => {
            circleIcon.innerText = "circle";
        });
    });
    addTaskDiv.insertBefore(newTask, addTaskDiv.firstChild);
    circleIcon.addEventListener('click', event => {
        completeTask(newTask, circleIcon);
        // completedTask.appendChild(newTask);
        // hideMidElement();
    });
    // addTaskDiv.appendChild(newTask);
    inputElement.value = "";
}
function completeTask(completedElement, circleIcon) {
    // completedTask.appendChild(completedElement);
    circleIcon.innerText = "check_circle";
    completedTask.insertBefore(completedElement, completedTask.firstChild);
    hideMidElement();
}
function hideMidElement() {
    let completedCountDiv = document.getElementById("completed-task-count");
    let completedTaskDiv = document.getElementById("completed-task-div");
    console.log(completedCountDiv.childNodes[5].childNodes[1]);
    completedCountDiv.childNodes[5].childNodes[1].innerText = completedTaskDiv.childElementCount;
    if (completedTaskDiv.childElementCount == 0) {
        completedCountDiv.style.visibility = "hidden";
    } else {
        completedCountDiv.style.visibility = "visible";
    }
}
function loadTaskList(user) {
    todoDao.getTaskListByUserId(user.id).then(result => {
        showStaticList(result);
        result.forEach(list => {
            if (!list.staticList) {
                createDynamicList(list);
            }
        });
        // // console.log(icons);
    });
}
function showProfileIcon(user) {
    let iconSpace = document.getElementById("profile-pic");
    let profilePopupIcon = document.getElementById("profile-popup-circle-id");
    let name = user.name.toUpperCase().charAt(0);
    iconSpace.innerHTML = name;
    profilePopupIcon.innerHTML = name;
    document.getElementById("profile-user-name").innerHTML = user.name;
    document.getElementById("profile-mail-id").innerHTML = user.mailId;
    // console.log(name);
}
async function signOutUser() {
    let userRequest = await getCurrentUser();
    let response = await todoDao.signOutUser(userRequest.id);
    if (response.ok) {
        document.getElementById("redirect-to-index").submit();
    }
}
async function getCurrentUser() {
    return (await todoDao.getSignedInUser()).json();
}
function createDynamicList(obj) {
    const dynamicList = document.getElementById("dynamic-list");
    const staticListElement = document.getElementById("static-div-five");
    const newElement = staticListElement.cloneNode(true);
    newElement.id = obj.id;
    newElement.childNodes[1].childNodes[1].childNodes[1].innerText = "list";
    newElement.childNodes[1].childNodes[3].childNodes[1].innerText = obj.name;
    dynamicList.appendChild(newElement);
    newElement.addEventListener('click', () => {
        changeMainBody(obj, "list", newElement);
    });
}
async function changeMainBody(list, icon, element) {
    let result;
    let obj;
    let response = await todoDao.getActivedTaskList();
    let isOk = response.ok;
    // console.log(response);
    if (isOk) {
        result = response.json();
        obj = await result;
        // console.log(response, result, obj);
        if (list.id != obj.id) {
            todoDao.toDoInActiveTaskList(obj.id).then(data => console.log(data)).catch(error => console.log(error));
            todoDao.toDoActiveTaskList(list.id).then(data => console.log(data)).catch(error => console.log(error));
        }
        getHover(element);
    } else {
        todoDao.toDoActiveTaskList(list.id).then(data => console.log(data)).catch(error => console.log(error));
        getHover(element);
    }
    document.getElementById("title-div-id").style.minWidth = list.name.length * 12 + "px";
    document.getElementById("icon-id").innerText = icon;
    document.getElementById("title-id").innerText = list.name;
}
function showStaticList(list) {
    let myDay = document.getElementById("my-day");
    let important = document.getElementById("important");
    let planned = document.getElementById("planned");
    let assignedToMe = document.getElementById("assigned-to-me");
    let task = document.getElementById("static-div-five");
    // console.log("taskList", list);
    myDay.addEventListener('click', () => {
        // console.log(list[0]);
        list.filter(obj => "My Day" == obj.name).forEach( obj => changeMainBody(obj, "light_mode", myDay));
        // changeMainBody(list[0], "light_mode");
    });
    important.addEventListener('click', () => {
        // console.log(list[1]);
        list.filter(obj => "Important" == obj.name).forEach( obj => changeMainBody(obj, "star", important));
        // changeMainBody(list[1], "star");
    });
    planned.addEventListener('click', () => {
        // console.log(list[2]);
        list.filter(obj => "Planned" == obj.name).forEach( obj => changeMainBody(obj, "calendar_month", planned));
        // changeMainBody(list[2], "calendar_month");
    });
    assignedToMe.addEventListener('click', () => {
        // console.log(list[3]);
        list.filter(obj => "Assigned to me" == obj.name).forEach( obj => changeMainBody(obj, "person", assignedToMe));
        // changeMainBody(list[3], "person");
    });
    task.addEventListener('click', () => {
        toTasksList(task);
    });
}
async function toTasksList(element) {
    let activeListResponse;
    let activeList;
    let mainIcon = document.getElementById("icon-id");
    let mainTitle = document.getElementById("title-id");
    document.getElementById("title-div-id").style.minWidth = 5 * 12 + "px";
    mainIcon.innerText = "home";
    mainTitle.innerText = "Tasks";
    activeListResponse = await todoDao.getActivedTaskList();
    if (activeListResponse.ok) {
        activeList = await activeListResponse.json();
        // console.log(activeList);
        todoDao.toDoInActiveTaskList(activeList.id).then(data =>  console.log(data)).catch(error =>  console.log(error));   
    }
    getHover(element);
}
function getHover(element) {
    if (null == selectedList && null != element) {
        // console.log(element);
        selectedList = element;
        element.classList.add("active");
    } else if (null != element) {
        // console.log(selectedList.classList);
        selectedList.classList.remove("active");
        // console.log(selectedList.classList);
        element.classList.add("active");
        selectedList = element;
    }
}
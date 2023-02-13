let toggleIcon;
let checkedToggleicon;
const taskUrl = 'http://localhost:8080/api/v1/task';
const completedUrl = 'http://localhost:8080/api/v1/task/completed';
const postMethod = 'POST';
const putMethod = 'PUT';
const searchBar = document.getElementById("search-bar-id");

window.addEventListener('load', function() {
    showTasks();
    showCompletedTask();
    disableSearchBar();
    toggleIcon = "saved";
});
document.getElementById("task-value").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});
function eventListeners(element) {
    element.addEventListener('click', function() {
        editFunc(element);
    });
}
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
}
function saveFunc(element, value) {
    toggleIcon = "saved";
    let editDiv = element.parentNode;
    // let tasks = Array.from(editDiv.parentNode.parentNode.childNodes);
    // let position = tasks.indexOf(editDiv.parentNode);
    value.taskName = editDiv.previousSibling.childNodes[0].value;
    // getTasks(taskUrl).then(result => {
    //     let taskObj = result[position - 1];
    //     taskObj.taskName = updatedTask;
    //     postTask(taskObj, "PUT").then(data => console.log("success", data)).catch(error => console.log("Error:", error));
    // });
    postTask(value, "PUT").then(data => console.log("success", data)).catch(error => console.log("Error:", error));
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
    eventListeners(editIcon);
}
function customPopup(element, value, taskStatus) {
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
        removeTask(element, taskStatus);
    });
    cancelButton.addEventListener('click', function() {
        popupDiv.remove();
    });
}
function removeTask(element, taskStatus) {
    alert("remove");
    let tasks = Array.from(element.parentNode.parentNode.childNodes);
    let position = tasks.indexOf(element.parentNode);
    let url = (taskStatus == "redo") ? taskUrl : completedUrl;
    getTasks(url).then(taskList => {
        let taskObj = taskList[position];
        taskObj.deleted = true;
        postTask(taskObj, "PUT").then(data => console.log("success", data)).catch(error => console.log("Error:", error));

    })
    element.parentElement.remove();
    removeMidChild();
}
// function completedTask(element) {
//     if (element.checked) {
//         completed(element);
//     } else {
//         redo(element);
//     }
// }
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
    // let tasks = Array.from(elementDiv.parentNode.parentNode.childNodes);
    // let position = tasks.indexOf(elementDiv.parentNode);
    // console.log(position);
    // getTasks(taskUrl).then(taskList => {
    //     let taskObj = taskList[position];
    //     console.log(taskObj);
    //     taskObj.completed = true;
    //     postTask(taskObj, "PUT").then(data => console.log("success", data)).catch(error => console.log("Error:", error));

    // });
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
    // let tasks = Array.from(elementDiv.parentNode.parentNode.childNodes);
    // let position = tasks.indexOf(elementDiv.parentNode);
    // console.log(position);
    // let url = ("redo" == taskStatus) ? taskUrl : completedUrl;
    // getTasks(url).then(taskList => {
    //     let taskObj = taskList[position];
    //     console.log(taskObj);
    //     taskObj.completed = false;
    //     postTask(taskObj, "PUT").then(data => console.log("success", data)).catch(error => console.log("Error:", error));

    // });
    value.completed = false;
    postTask(value, "PUT").then(data => console.log("success", data)).catch(error => console.log("Error:", error));
    // circleCheckBox.setAttribute("onclick", "completed(this)");
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
    let addedTask = { taskName : document.getElementById("task-value").value};
    let newTask = {};
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
function showTasks() {
    getTasks(taskUrl).then(function(result) {
        console.log(result);
        for (let i of result) {
            createTaskDiv(i, "redo");
        }
    });
}
function showCompletedTask() {
    getTasks(completedUrl).then(function(result) {
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
    // circleCheckBox.setAttribute("onclick", "completed(this)");
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
        customPopup(taskInnerRight, 'Do you want to delete the task....!', taskStatus)
    });
    // taskInnerRight.setAttribute("onclick", "customPopup(this, 'Do you want to delete the task....!')");
    task.appendChild(taskInnerLeft);
    task.appendChild(taskInnerMiddle);
    task.appendChild(editIconDiv);
    task.appendChild(taskInnerRight);
    taskContainer.appendChild(task);
    // eventListeners(editIcon);
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
        customPopup(taskInnerRight, 'Do you want to delete the task....!', taskStatus)
    })
    // taskInnerRight.setAttribute("onclick", "customPopup(this, 'Do you want to delete the task....!')");
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
function getTasks(url) {
    const response = fetch(url, {
        method: "GET",
    });
    // console.log(response);
    return response.then(response => response.json());
}
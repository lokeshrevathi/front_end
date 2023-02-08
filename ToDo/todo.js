let toggleIcon;
const taskUrl = 'http://localhost:8080/api/v1/task';
window.addEventListener('load', function() {
    showTasks();
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
function editFunc(element) {
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
        saveFunc(saveIcon);
    });
}
function saveFunc(element) {
    toggleIcon = "saved";
    let editDiv = element.parentNode;
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
function customPopup(element, value) {
    let popupDiv = document.createElement("div");
    let popupMessage = document.createElement("div");
    let bottomDiv = document.createElement("div");
    let okButtonDiv = document.createElement("div");
    let cancelButtonDiv = document.createElement("div");
    let okButton = document.createElement("button");
    let cancelButton = document.createElement("button");
    popupDiv.className = "popup";
    popupMessage.className = "popup-message";
    popupMessage.innerText = value;
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
        removeTask(element);
    });
    cancelButton.addEventListener('click', function() {
        popupDiv.remove();
    });
}
function removeTask(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    removeMidChild();
}
function completedTask(element) {
    if (element.checked) {
        completed(element);
    } else {
        redo(element);
    }
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
function completed(element) {
    let elementContainer = element.parentNode.parentNode;
    let elementDiv = element.parentNode;
    let checkMark = document.createElement("i");
    let container = document.getElementById("container-two");
    elementDiv.appendChild(checkMark);
    if (toggleIcon == "onEdit") {
        alert("Please save the task....!");
        element.checked = false;
        return false;
    }
    // elementContainer.childNodes[2].className = "edit-task-hide";
    elementContainer.childNodes[2].removeChild(elementContainer.childNodes[2].childNodes[0]);
    checkMark.className = "fa fa-check check-mark";
    checkMark.id = "check-mark"
    container.appendChild(elementContainer);
    midDiv();
}
function redo(element) {
    let elementContainer = element.parentNode.parentNode;
    let container = document.getElementById("container");
    let editIcon = document.createElement("i");
    editIcon.className = "fa fa-pencil trash-align";
    elementContainer.childNodes[2].appendChild(editIcon);
    container.appendChild(elementContainer);
    element.parentNode.removeChild(element.parentNode.childNodes[1]);
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
    if (addedTask.taskName == "") {
        alert("Please add the task...!");
        return false;
    }
    postTask(addedTask).then(data => console.log("success", data)).catch(error => console.log("Error:", error));
    document.getElementById("task-value").value = "";
    showTasks();
}
function showTasks() {
    getTasks().then(function(result) {
        for (let i of result) {
            let taskContainer = document.getElementById("container");
            let task = document.createElement("div");
            let taskInnerLeft = document.createElement("div");
            let circleCheckBox = document.createElement("input");
            let taskInnerMiddle = document.createElement("div");
            let taskValue = document.createElement("input");
            let editIconDiv = document.createElement("div");
            let editIcon = document.createElement("i");
            let taskInnerRight = document.createElement("div");
            let trashIcon = document.createElement("i");
            task.className = "added-task";
            taskInnerLeft.className = "task-left-side-sub";
            circleCheckBox.setAttribute("type", "checkbox");
            circleCheckBox.setAttribute("class", "checkbox-round");
            circleCheckBox.setAttribute("onchange", "completedTask(this)");
            taskInnerLeft.appendChild(circleCheckBox);
            taskInnerMiddle.className = "task-right-side-sub";
            taskValue.id = "task-name";
            taskValue.disabled = "true";
            taskValue.className = "task-value-align";
            taskValue.value = i.taskName;
            taskInnerMiddle.appendChild(taskValue);
            editIconDiv.id = "edit-task-div";
            editIconDiv.className = "edit-task-show";
            editIcon.className = "fa fa-pencil trash-align";
            editIconDiv.appendChild(editIcon);
            taskInnerRight.className = "add-task-sub";
            taskInnerRight.id = "remove-task";
            trashIcon.className = "fa fa-trash trash-align";
            taskInnerRight.appendChild(trashIcon);
            taskInnerRight.setAttribute("onclick", "customPopup(this, 'Do you want to delete the task....!')");
            task.appendChild(taskInnerLeft);
            task.appendChild(taskInnerMiddle);
            task.appendChild(editIconDiv);
            task.appendChild(taskInnerRight);
            taskContainer.appendChild(task);
            eventListeners(editIcon);
        }
    });
}
function addedTasks(value) {
}
async function postTask(data) {
    const response = await fetch(taskUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return response.json();
}
async function getTasks() {
    const response = await fetch(taskUrl, {
        method: "GET",
    });
    // console.log(response.json())
    return response.json();
}
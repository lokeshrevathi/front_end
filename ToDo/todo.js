let toggleIcon;
window.addEventListener('load', function() {
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
// function editTask(element) {
//     // let element = document.getElementById("edit-task-div");
//     count++;
//     if (count % 2 != 0) {
//         editFunc(element);
//     } else {
//         saveFunc(element);
//     }
// }
function editFunc(element) {
    let editDiv = element.parentNode;
    if (toggleIcon == "onEdit") {
        alert("Please save the task....!");
        console.log(editDiv.previousSibling.childNodes[0]);
        return false;
    }
    toggleIcon = "onEdit";
    console.log(element.parentNode.parentNode);
    let saveIcon = document.createElement("i");
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
    popupDiv.className = "popup";
    let popupMessage = document.createElement("div");
    popupMessage.className = "popup-message";
    popupMessage.innerText = value;
    let bottomDiv = document.createElement("div");
    bottomDiv.className = "bottom-div";
    let okButtonDiv = document.createElement("div");
    okButtonDiv.className = "ok-button-div";
    let cancelButtonDiv = document.createElement("div");
    cancelButtonDiv.className = "cancel-button-div";
    let okButton = document.createElement("button");
    okButton.innerText = "ok";
    okButton.className = "ok-button";
    let cancelButton = document.createElement("button");
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
    if (completedElementCount == 1) {
        let middleLeftSide = document.createElement("div");
        middleLeftSide.className = "mid-left-side";
        let downArrow = document.createElement("i");
        downArrow.id = "down-arrow";
        downArrow.className = "fa fa-angle-down";
        let dropDownCheckbox = document.createElement("input");
        dropDownCheckbox.id = "check-box";
        dropDownCheckbox.type = "checkbox";
        dropDownCheckbox.setAttribute("onchange", "hideElement(this)");
        middleLeftSide.appendChild(downArrow);
        middleLeftSide.appendChild(dropDownCheckbox);
        let middleDiv = document.createElement("div");
        middleDiv.className = "mid-div";
        middleDiv.innerText = "Completed";
        let middleRightSide = document.createElement("div");
        middleRightSide.id = "mid-right-side";
        middleRightSide.className = "mid-right-side";
        // middleRightSide.innerText = completedElementCount;
        containerMiddle.appendChild(middleLeftSide);
        containerMiddle.appendChild(middleDiv);
        containerMiddle.appendChild(middleRightSide);
        // let dropDownIcon = document.createElement("i");
        // dropDownIcon.className = 
    }
    document.getElementById("mid-right-side").innerText = completedElementCount;
}
function removeMidChild() {
    let completedElementCount = document.getElementById("container-two").childElementCount;
    console.log(completedElementCount);
    if (completedElementCount == 0) {
        let containerMiddle = document.getElementById("container-middle");
        containerMiddle.innerHTML = '';
    }
    document.getElementById("mid-right-side").innerText = completedElementCount;
}
function completed(element) {
    if (toggleIcon == "onEdit") {
        alert("Please save the task....!");
        element.checked = false;
        return false;
    }
    let elementContainer = element.parentNode.parentNode;
    let elementDiv = element.parentNode;
    // elementContainer.childNodes[2].className = "edit-task-hide";
    elementContainer.childNodes[2].removeChild(elementContainer.childNodes[2].childNodes[0]);
    
    let checkMark = document.createElement("i");
    checkMark.className = "fa fa-check check-mark";
    checkMark.id = "check-mark"
    elementDiv.appendChild(checkMark);
    let container = document.getElementById("container-two");
    container.appendChild(elementContainer);
    midDiv();
}
function redo(element) {
    let elementContainer = element.parentNode.parentNode;
    // elementContainer.childNodes[2].className = "edit-task-show";
    // document.getElementById("edit-task-div").addEventListener('click', editTask);
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
    let taskContainer = document.getElementById("container");
    let task = document.createElement("div");
    let addedTask = document.getElementById("task-value").value;
    if (addedTask == "") {
        alert("Please add the task...!");
        return false;
    }
    task.className = "added-task";
    let taskInnerLeft = document.createElement("div");
    taskInnerLeft.className = "task-left-side-sub";
    let circleCheckBox = document.createElement("input");
    circleCheckBox.setAttribute("type", "checkbox");
    circleCheckBox.setAttribute("class", "checkbox-round");
    circleCheckBox.setAttribute("onchange", "completedTask(this)");
    taskInnerLeft.appendChild(circleCheckBox);
    let taskInnerMiddle = document.createElement("div");
    taskInnerMiddle.className = "task-right-side-sub";
    let taskName = document.createElement("input");
    taskName.id = "task-name";
    taskName.disabled = "true";
    // let node = document.createTextNode(addedTask);
    taskName.className = "task-value-align";
    taskName.value = addedTask;
    taskInnerMiddle.appendChild(taskName);
    let editIconDiv = document.createElement("div");
    editIconDiv.id = "edit-task-div";
    editIconDiv.className = "edit-task-show";
    // editIconDiv.setAttribute("onclick", "editTask(this)");
    let editIcon = document.createElement("i");
    editIcon.className = "fa fa-pencil trash-align";
    editIconDiv.appendChild(editIcon);
    let taskInnerRight = document.createElement("div");
    taskInnerRight.className = "add-task-sub";
    taskInnerRight.id = "remove-task";
    let trashIcon = document.createElement("i");
    trashIcon.className = "fa fa-trash trash-align";
    taskInnerRight.appendChild(trashIcon);
    taskInnerRight.setAttribute("onclick", "customPopup(this, 'Do you want to delete the task....!')");
    task.appendChild(taskInnerLeft);
    task.appendChild(taskInnerMiddle);
    task.appendChild(editIconDiv);
    task.appendChild(taskInnerRight);
    taskContainer.appendChild(task);
    document.getElementById("task-value").value = "";
    eventListeners(editIcon);
    // document.getElementById("edit-task-div").addEventListener('click', editTask);
}
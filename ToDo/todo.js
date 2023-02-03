document.getElementById("task-value").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});
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
    let elementContainer = element.parentNode.parentNode;
    let elementDiv = element.parentNode;
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
    let container = document.getElementById("container");
    container.appendChild(elementContainer);
    element.parentNode.removeChild(element.parentNode.childNodes[1]);
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
    taskInnerLeft.className = "task-height task-left-side-sub";
    let circleCheckBox = document.createElement("input");
    circleCheckBox.setAttribute("type", "checkbox");
    circleCheckBox.setAttribute("class", "checkbox-round");
    circleCheckBox.setAttribute("onchange", "completedTask(this)");
    taskInnerLeft.appendChild(circleCheckBox);
    let taskInnerMiddle = document.createElement("div");
    taskInnerMiddle.className = "task-height task-right-side-sub";
    let taskName = document.createElement("p");
    let node = document.createTextNode(addedTask);
    taskName.className = "task-value-align";
    taskName.appendChild(node);
    taskInnerMiddle.appendChild(taskName);
    let taskInnerRight = document.createElement("div");
    taskInnerRight.className = "add-task-sub";
    taskInnerRight.id = "remove-task";
    let trashIcon = document.createElement("i");
    trashIcon.className = "fa fa-trash trash-align";
    taskInnerRight.appendChild(trashIcon);
    taskInnerRight.setAttribute("onclick", "removeTask(this)");
    task.appendChild(taskInnerLeft);
    task.appendChild(taskInnerMiddle);
    task.appendChild(taskInnerRight);
    taskContainer.appendChild(task);
    document.getElementById("task-value").value = "";
}
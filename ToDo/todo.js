document.getElementById("task-value").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});
function removeTask(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
}
function completedTask(element) {
    if (element.checked) {
        let elementContainer = element.parentNode.parentNode;
        let elementDiv = element.parentNode;
        let checkMark = document.createElement("i");
        checkMark.className = "fa fa-check check-mark";
        checkMark.id = "check-mark"
        elementDiv.appendChild(checkMark);
        let container = document.getElementById("container-two");
        container.appendChild(elementContainer);
    } else {
        let elementContainer = element.parentNode.parentNode;
        let container = document.getElementById("container");
        container.appendChild(elementContainer);
        element.parentNode.removeChild(element.parentNode.childNodes[1]);
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
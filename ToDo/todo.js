document.getElementById("task-value").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});
// document.getElementById("remove-task").addEventListener("",);
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
    let circleCheckBox = document.createElement("i");
    circleCheckBox.className = "fa fa-circle-thin circle-checkbox";
    taskInnerLeft.appendChild(circleCheckBox);
    let taskInnerMiddle = document.createElement("div");
    taskInnerMiddle.className = "task-height task-right-side-sub";
    let taskName = document.createElement("p");
    let node = document.createTextNode(addedTask);
    taskName.className = "task-value-align";
    taskName.appendChild(node);
    taskInnerMiddle.appendChild(taskName);
    let taskInnerRight = document.createElement("div");
    taskInnerRight.className = "task-height add-task-sub";
    taskInnerRight.id = "remove-task";
    let trashIcon = document.createElement("i");
    trashIcon.className = "fa fa-trash trash-align";
    taskInnerRight.appendChild(trashIcon);
    task.appendChild(taskInnerLeft);
    task.appendChild(taskInnerMiddle);
    task.appendChild(taskInnerRight);
    taskContainer.appendChild(task);
    document.getElementById("task-value").innerHTML = null;
}
//user
export async function getSignedInUser() {
    const response = fetch('http://localhost:8080/api/v1/user/signed-in-user');
    return response;
}
export async function addUser(user) {
    return fetch('http://localhost:8080/api/v1/user/', {
        method : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
}
export async function signInUser(mailId, password) {
    return fetch('http://localhost:8080/api/v1/user/' + mailId + '/' + password);
}
export async function signOutUser(id) {
    const response = fetch('http://localhost:8080/api/v1/user/' + id, {
        method : "PATCH"
    });
    return response;
}

//taskList
export async function getTaskListByUserId(id) {
    const response = await fetch('http://localhost:8080/api/v1/tasklist/' + id);
    return response.json();
}
export async function addTaskList(list) {
    const response = await fetch('http://localhost:8080/api/v1/tasklist/', {
        method : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(list)
    });
    return response;
}
export async function getActivedTaskList() {
    const response = fetch('http://localhost:8080/api/v1/tasklist/');
    return response;
}
export async function toDoActiveTaskList(id) {
    const response = await fetch('http://localhost:8080/api/v1/tasklist/' + id, {
        method : "PATCH"
    });
    return response;
}
export async function toDoInActiveTaskList(id) {
    const response = await fetch('http://localhost:8080/api/v1/tasklist?id=' + id, {
        method : "PATCH"
    });
    return response;
}

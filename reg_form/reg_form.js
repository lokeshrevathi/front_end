function displayValues() {
    const user = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        dateOfBirth : document.getElementById('dob').value,
        phoneNo : document.getElementById('phoneNo').value,
        mailId : document.getElementById('mailId').value,
        gender : getValue(document.getElementsByName('gender')).pop(),
        skill : getValue(document.getElementsByName('skill')),
        qualification : document.getElementById('qualification').value
    }
    if (user.skill.length == 0) {
        alert("please fill the skill field...!");
        return false;
    }
    if (isNotValidDob(user.dateOfBirth)) {
        alert("Your age is not in limit(18 - 50)");
        return false;
    }
    document.write(user.skill);
    console.log(user);
}
function getValue(list) {
    return Array.from(list).filter(node => node.checked).map(node => node.value);
}
function isNotValidDob(dob) {
    const currentYear = new Date().getFullYear();
    const dobYear = new Date(dob).getFullYear();
    if (18 > currentYear - dobYear || currentYear - dobYear > 50) {
        return true;
    }
    return false;
}
import * as todoDao from "./tododao.js";
window.addEventListener('load', async () => {
    const response = await todoDao.getSignedInUser();
    if (200 == response.status) {
        document.getElementById("to-redirect-todopage").submit();
    }
});
import { auth, provider } from "./firebase-config.js";
import { signInWithPopup } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

document.getElementById("googleLogin").addEventListener("click", async () => {
    try {
        await signInWithPopup(auth, provider);
        window.location.href = "dashboard.html";
    } catch (error) {
        console.error("Error signing in:", error);
    }
});

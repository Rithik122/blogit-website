import { auth, db, storage } from "./firebase-config.js";
import { signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";

document.getElementById("logoutButton").addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
});

document.getElementById("blogForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const imageUpload = document.getElementById("imageUpload").files[0];

    let imageUrl = "";
    if (imageUpload) {
        const storageRef = ref(storage, `images/${imageUpload.name}`);
        await uploadBytes(storageRef, imageUpload);
        imageUrl = await getDownloadURL(storageRef);
    }

    await addDoc(collection(db, "posts"), {
        title,
        content,
        imageUrl,
        timestamp: serverTimestamp()
    });

    window.location.href = "dashboard.html";
});

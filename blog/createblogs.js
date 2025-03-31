import { db } from "./firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

async function createBlog(title, content) {
    try {
        await addDoc(collection(db, "posts"), {
            title: title,
            content: content,
            likes: 0,  // 🔹 Add this to initialize likes
            timestamp: new Date()
        });

        alert("Blog created successfully!");
        window.location.href = "blogs.html"; // Redirect to blogs page
    } catch (error) {
        console.error("Error creating blog: ", error);
    }
}

// Call this function when the user submits a blog
document.getElementById("blogForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    createBlog(title, content);
});

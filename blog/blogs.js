import { handleLike } from "./likes.js";
import { db } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
async function loadBlogs() {
    const blogContainer = document.getElementById("blogContainer");
    blogContainer.innerHTML = ""; 

    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
        const blogData = doc.data();
        const postId = doc.id;

        console.log("Creating post:", postId, blogData.title);

        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
            <h2>${blogData.title}</h2>
            <p>${blogData.content}</p>
            <button class="like-btn" data-id="${postId}">❤️ ${blogData.likes || 0} Likes</button>
        `;

        blogContainer.appendChild(postElement);
    });

    setTimeout(() => {
        document.querySelectorAll(".like-btn").forEach((button) => {
            button.addEventListener("click", function (event) {
                const postId = event.target.getAttribute("data-id");
                console.log("Like button clicked for post:", postId); // ✅ Debug log
                handleLike(postId, event.target);
            });
        });
    }, 500);
}

document.addEventListener("DOMContentLoaded", loadBlogs);

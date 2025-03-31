import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot, orderBy, query } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyBqQclilPlmgOAxKCCqebHcyNiJqaTHNRg",
    authDomain: "my-blog-ba5b5.firebaseapp.com",
    projectId: "my-blog-ba5b5",
    storageBucket: "my-blog-ba5b5.firebasestorage.app",
    messagingSenderId: "701815874034",
    appId: "1:701815874034:web:a141158c931c79d49e8b6b",
    measurementId: "G-2XVVXK3Z1Q"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

const googleLoginBtn = document.getElementById("googleLogin");
const logoutBtn = document.getElementById("logout");
const userInfo = document.getElementById("userInfo");
const blogForm = document.getElementById("blogForm");
const blogPostsContainer = document.getElementById("blogPosts");
const darkModeToggle = document.getElementById("darkModeToggle");

googleLoginBtn.addEventListener("click", async () => {
    try {
        const result = await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Error signing in:", error);
    }
});

logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        userInfo.textContent = `Signed in as: ${user.displayName}`;
        googleLoginBtn.style.display = "none";
        logoutBtn.style.display = "block";
        blogForm.style.display = "block";
    } else {
        userInfo.textContent = "";
        googleLoginBtn.style.display = "block";
        logoutBtn.style.display = "none";
        blogForm.style.display = "none";
    }
});

blogForm.addEventListener("submit", async (event) => {
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
        timestamp: new Date()
    });

    blogForm.reset();
});

const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

onSnapshot(q, (snapshot) => {
    blogPostsContainer.innerHTML = "";
    snapshot.forEach((doc) => {
        const post = doc.data();
        blogPostsContainer.innerHTML += `
            <div class="post">
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                ${post.imageUrl ? `<img src="${post.imageUrl}" class="post-image">` : ""}
            </div>
        `;
    });
});

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

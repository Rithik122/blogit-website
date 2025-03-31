import { db } from "./firebase-config.js";
import { doc, getDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
export async function handleLike(postId, button) {
    if (!postId) {
        console.error("Error: postId is missing");
        return;
    }

    const postRef = doc(db, "posts", postId);

    try {
        console.log("Updating likes for:", postId);

        const postSnap = await getDoc(postRef);
        if (postSnap.exists()) {
            const currentLikes = postSnap.data().likes || 0;

            await updateDoc(postRef, { likes: increment(1) });

            button.innerText = `❤️ ${currentLikes + 1} Likes`;

            console.log("Likes updated successfully!");
        } else {
            console.error("Error: Post does not exist");
        }
    } catch (error) {
        console.error("Error updating likes: ", error);
    }
}

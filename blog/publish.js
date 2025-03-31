import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();
const fileInput = document.getElementById("fileInput");

document.getElementById("publishBtn").addEventListener("click", async () => {
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select an image!");
        return;
    }

    const storageRef = ref(storage, `images/${file.name}`);

    try {
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);

        console.log("Image uploaded:", imageUrl);
        alert("Blog published with image!");
    } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image!");
    }
});

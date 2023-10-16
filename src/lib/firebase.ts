// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { NextResponse } from "next/server";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ai-note-taking-b44e4.firebaseapp.com",
  projectId: "ai-note-taking-b44e4",
  storageBucket: "ai-note-taking-b44e4.appspot.com",
  messagingSenderId: "895864514446",
  appId: "1:895864514446:web:3891b7714d6c7f17ffa6df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// this method will be used to get and set files.
export const storage = getStorage(app)

export async function uploadFileToFirebase(image_url: string, name: string) {
  try {
    const response = await fetch(image_url)
    const buffer = await response.arrayBuffer()
    const file_name = name.replace('', '') + Date.now() + ".jpeg"
    const storageRef = ref(storage, file_name)

    await uploadBytes(storageRef, buffer, {
      contentType: 'image/jpeg'
    })

    const firebase_url = await getDownloadURL(storageRef)
    return firebase_url
  } catch (error) {
    console.error(error)
  }
}
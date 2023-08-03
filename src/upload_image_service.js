import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";
import axios from "axios";
export const uploadImageToFirebaseStorage = async (file) => {
  if (!file) {
    return;
  }
  const name = new Date().getTime();
  const imageRef = ref(storage, `stack_images/${name}`);
  await uploadBytes(imageRef, file)
    .then((snapshot) => {
      console.log("Uploaded a blob or file!");
    })
    .catch((err) => {
      console.log(`upload image failed ${err}`);
    });
  const url = await getDownloadURL(imageRef);
  if (url) {
    return url;
  }
  return null;
};

export const sendImageToStackAi = async (imageUrl) => {
  try {
    const response = await fetch(
      "https://www.stack-inference.com/run_deployed_flow?flow_id=64cb07feb34619a800cdeede&org=a00ef8a4-9c4c-455d-80a4-852b6d84e27f",
      {
        headers: {
          Authorization: "Bearer 3edf041f-52a9-46e9-88b9-53655d3fc7d2",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          "im2txt-0": imageUrl,
          user_id: `<USER or Conversation ID>`,
        }),
      }
    );
    const result = await response.json();
    console.log("result is " + result["out-0"]);
    return result["out-0"];
  } catch (err) {
    console.log(`send to api failed ${err}`);
    return null;
  }
};

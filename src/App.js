import { Button, Card, Input, Spin, Typography } from "antd";
import { useState } from "react";
import {
  sendImageToStackAi,
  uploadImageToFirebaseStorage,
} from "./upload_image_service";
const { Title, Text } = Typography;
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState(null);
  const sendImage = async (e) => {
    setIsLoading(true);
    const url = await uploadImageToFirebaseStorage(image);
    const response = await sendImageToStackAi(url);
    setOutput(response);
    setIsLoading(false);
  };
  if (isLoading) {
    return (
      <div className="App">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <div className="App">
      <Title>Pick an Image</Title>
      <Card>
        <Input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <div style={{ height: 8 }} />
        <Button onClick={sendImage}>Send</Button>
      </Card>
      <div style={{ height: 32 }} />
      <div style={{ margin: 32 }}>
        <Card>{output ? <Text>{output}</Text> : <Text>No results</Text>}</Card>
      </div>
    </div>
  );
}

export default App;

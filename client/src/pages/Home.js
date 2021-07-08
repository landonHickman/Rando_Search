import React, { useState, useEffect } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { Button, Form, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Home = () => {
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    let res = await axios.get("/api/images");
    console.log(res.data);
    setImages(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(files);
    try {
      let data = new FormData();
      data.append("file", files[0].file);
      let res = await axios.post("/api/images/upload", data);
      console.log("res", res.data.image);
      createImageUi(res.data.image)
    } catch (err) {
      alert("err");
      console.log("err", err);
      console.log("err.response", err.response);
    }
  };

  const createImageUi = (img) => {
    setImages([img, ...images])
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Home</h1>
      <Form onSubmit={handleSubmit}>
        <FilePond
          files={files}
          allowReorder={true}
          allowMultiple={false}
          onupdatefiles={setFiles}
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />
        <Button type="submit">Submit</Button>
      </Form>
      <div  style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
      {images.map((i) => {
        return (
            <Row key={i.id}>
            <Col>
            <Card style={{ maxHeight: '200px', width: '250px', margin: "5px" }}>
              <Card.Body>
                <Card.Text>{i.id}</Card.Text>
              </Card.Body>
              <Card.Img variant="top" src={i.url} />
            </Card>
            </Col>
            </Row>
        );
      })}
      </div>
    </div>
  );
};

export default Home;

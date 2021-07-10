import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../styles/styles";

const PageForm = (props) => {
  const [name, setName] = useState(props.name ? props.name : "");
  const [image, setImage] = useState(
    props.image
      ? props.image
      : "https://c8.alamy.com/comp/2BHG705/colourful-conceptual-images-2BHG705.jpg"
  );
  const { topicId, createPage, pageId, updatePage } = props;
  const history = useHistory();
  console.log('topicID',topicId)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (pageId) {
        let res1 = await axios.put(`/api/topics/${topicId}/pages/${pageId}`, {
          page_title: name,
          image: image,
        });
        console.log("update", res1.data);
        updatePage(res1.data);
      } else {
        let res = await axios.post(`/api/topics/${topicId}/pages`, {
          page_title: name,
          image: image,
        });
        createPage(res.data);
        console.log("create", res.data);
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Name</p>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <p>Image</p>
        <input value={image} onChange={(e) => setImage(e.target.value)} />
        <Button>Submit</Button>
      </form>
    </div>
  );
};
export default PageForm;

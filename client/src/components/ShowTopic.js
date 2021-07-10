import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import TopicForm from "./TopicForm";
import ArticlePage from "../pages/ArticlePage";
import { Button } from "../styles/styles";
import PageForm from "../components/PageForm";

const ShowTopic = (props) => {
  const [pages, setPages] = useState([]);
  const [pageId, setPageId] = useState([]);
  const [showArticle, setShowArticle] = useState(false);
  const [showPages, setShowPages] = useState(true);
  const [showEditButton, setShowEditButton] = useState(true);
  const [showTopicForm, setShowTopicForm] = useState(false);
  const [showPageForm, setShowPageForm] = useState(false);
  const [toggleCreatePageButton, setToggleCreatePageButton] = useState(true);
  const [toggleDeleteButton, setToggleDeleteButton] = useState(true);
  const { authenticated } = useContext(AuthContext);
  const {
    topic,
    setShowImg,
    editTopic,
    setShowTopicButtons,
    setShowTopic,
    deleteTopic,
  } = props;

  // console.log('topic',topic)

  useEffect(() => {
    getPage();
  }, []);

  const getPage = async () => {
    let res = await axios.get(`/api/topics/${topic.id}/pages`);
    // console.log(res.data)
    setPages(res.data);
  };

  const renderPages = () => {
    return pages.map((p) => {
      return (
        <div
          key={p.id}
          style={{ padding: "10px", justifyContent: "center" }}
          onClick={(e) => handelRevealArticle(p)}
        >
          <h2>{p.page_title}</h2>
          <img src={p.image} style={{ height: "200px" }} />
          <Button onClick={handleViewArticle}>View article</Button>
        </div>
      );
    });
  };
  const handleViewArticle = () => {
    setToggleCreatePageButton(false);
    setToggleDeleteButton(false);
    setShowEditButton(false);
  };

  const handelRevealArticle = (id) => {
    console.log(id);
    setPageId(id);
    setShowArticle(true);
    setShowPages(false);
  };

  const handleTopicForm = () => {
    setShowTopicForm(true);
    setShowPages(false);
    setShowEditButton(false);
    setShowImg(false);
  };

  const handleDelete = async (d) => {
    // console.log(d);
    let res = await axios.delete(`/api/topics/${d}`);
    // console.log(res.data);
    setShowTopicButtons(true);
    setShowTopic(false);
    deleteTopic(res.data);
  };
  const handleCreatePage = () => {
    setShowPageForm(!showPageForm);
  };

  const createPage = (p) => {
    setPages([p, ...pages]);
  };

  const updatePage = (up) => {
    console.log("update passed", up);
    console.log("Page Id", pageId);
    setPageId(up);
  };

  const handleDeletePage = async (id) => {
    let res = await axios.delete(`/api/topics/${topic.id}/pages/${id}`);
    setPageId("");
    setPages(pages.filter(p=>p.id !== id));
    setShowArticle(false);
    setShowPages(true);
  };

  return (
    <div>
      <h1>{topic.topic_name}</h1>
      <div>
        {authenticated && showEditButton && (
          <Button onClick={handleTopicForm}>Edit Topic</Button>
        )}
        {showTopicForm && (
          <TopicForm
            topicId={topic.id}
            name={topic.topic_name}
            editTopic={editTopic}
          />
        )}
        {authenticated && toggleDeleteButton && (
          <Button onClick={(e) => handleDelete(topic.id)}>Delete</Button>
        )}
      </div>
      {authenticated && toggleCreatePageButton && (
        <Button onClick={handleCreatePage}>Create Page</Button>
      )}
      {authenticated && showPageForm && (
        <PageForm topicId={topic.id} createPage={createPage} />
      )}
      <div style={{ display: "flex", margin: "10px", alignItems: "center" }}>
        {showArticle && (
          <ArticlePage
            topicId={topic.id}
            pageId={pageId}
            updatePage={updatePage}
            handleDeletePage={handleDeletePage}
          />
        )}
        {showPages && renderPages()}
      </div>
    </div>
  );
};

export default ShowTopic;

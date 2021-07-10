import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import ShowTopic from "../components/ShowTopic";
import "../App.css";
import { AuthContext } from "../providers/AuthProvider";
import TopicForm from "../components/TopicForm";

const Home = () => {
  const [topic, setTopic] = useState([]);
  const [topicSingular, setTopicSingular] = useState([]);
  const [showTopic, setShowTopic] = useState(false);
  const [showTopicButtons, setShowTopicButtons] = useState(true);
  const [showImg, setShowImg] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const [showTopicForm, setShowTopicForm] = useState(false);
  const { authenticated } = useContext(AuthContext);

  useEffect(() => {
    getTopics();
  }, []);

  const getTopics = async () => {
    let res = await axios.get("/api/topics");
    console.log(res.data);
    setTopic(res.data);
  };

  const handleClick = () => {
    setShowTopicForm(!showTopicForm);
    setShowImg(false);
  };

  const handleTopicClick = (id) => {
    let test = topic.find((t) => t.id === id);
    console.log(test);
    setTopicSingular(test);
    setShowTopic(true);
    setShowImg(false);
    setShowTopicButtons(false);
    setShowTopicForm(false);
    setShowButton(false);
  };
  console.log(topicSingular);

  const renderTopics = () => {
    return topic.map((t) => {
      return (
        <div key={t.id}>
          <button onClick={(e) => handleTopicClick(t.id)}>
            {t.topic_name} {t.id}
          </button>
        </div>
      );
    });
  };

  const createTopic = (t) => {
    setTopic([t, ...topic]);
  };

  const editTopic = (e) => {
    setTopicSingular(e);
  };

  const deleteTopic = (top) => {
    
    setTopic(topic.filter(t => t.id !== top.id))
  }

  return (
    <>
      <div>
        <h1>Rando Search</h1>
        {showTopicButtons && renderTopics()}
        <div></div>
        {showTopic && (
          <ShowTopic
            topic={topicSingular}
            setShowImg={setShowImg}
            editTopic={editTopic}
            setShowTopicButtons={setShowTopicButtons}
            setShowTopic={setShowTopic}
            deleteTopic={deleteTopic}
          />
        )}
      </div>
      {authenticated && showButton && (
        <button onClick={handleClick}>Create Topic</button>
      )}
      {showTopicForm && <TopicForm createTopic={createTopic} />}
      {showImg && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "800px",
          }}
        >
          <img src="https://lh3.googleusercontent.com/proxy/3tqXZ8VjyYZ3YL9oVuxtq7rrSDm83f7jXEc_7GtuI7-fiqsUKEAliQTy2v51iTUGTlcl0CcbxXvTNJl06k2wUFtm6YF33w3Y3Ct4gq1Qg882t4bkzuAGZiygfHJiYfETPGW9N5nrEkCOu_Z1B2Q" />
        </div>
      )}
    </>
  );
};

export default Home;

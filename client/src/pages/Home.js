import axios from "axios";
import React, { useState, useEffect } from "react";
import ShowTopic from "../components/ShowTopic";
import "../App.css";

import TopicForm from "../components/TopicForm";
import { Button } from "../styles/styles";

const Home = () => {
  const [topic, setTopic] = useState([]);
  const [topicSingular, setTopicSingular] = useState([]);
  const [showTopic, setShowTopic] = useState(false);
  const [showTopicButtons, setShowTopicButtons] = useState(true);
  const [showImg, setShowImg] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const [showTopicForm, setShowTopicForm] = useState(false);
  const [showTitle, setShowTitle] = useState(true);


  useEffect(() => {
    getTopics();
  }, []);

  const getTopics = async () => {
    let res = await axios.get("/api/topics");
    // console.log(res.data);
    setTopic(res.data);
  };

  const handleTopicClick = (id) => {
    let test = topic.find((t) => t.id === id);
    // console.log(test);
    setTopicSingular(test);
    setShowTopic(true);
    setShowImg(false);
    setShowTopicButtons(false);
    setShowTopicForm(false);
    setShowButton(false);
    setShowTitle(false)
  };
  // console.log(topicSingular);

  const renderTopics = () => {
    return topic.map((t) => {
      return (
        <div key={t.id}>
          <Button onClick={(e) => handleTopicClick(t.id)}>
            {t.topic_name}
          </Button>
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
      <div style={{textAlign: 'center'}}>
        {showTitle && <h1>Rando Search</h1>}
        <div style={{display: 'flex', justifyContent: 'center'}}>
        {showTopicButtons && renderTopics()}  
        </div>
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
      {showTopicForm && <TopicForm createTopic={createTopic} />}
      {showImg && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 'auto',
            width: "400px",
            backgroundRepeat: 'no-repeat',
            backgroundSize: '500px'
          }}
        >
          <img src="http://www.wastetodaymagazine.com/fileuploads/image/2020/04/22/AdobeStock35274439-Isolated-Planet-Earth-showing-Europe-and-Africa.jpg?w=736&h=414&mode=crop" alt="Earth" />
        </div>
      )}
    </>
  );
};

export default Home;

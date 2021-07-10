import React, { useEffect, useState } from "react";
import axios from "axios";

const ArticlePage = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics();
  }, []);

  const getTopics = async () => {
    try {
      let res = await axios.get(`/api/topics`);
      setTopics(res.data);
    } catch (err) {
      alert("error check console");
      console.log(err);
    }
  };

  const renderTopics = () => {
    return topics.map((topic) => {
      return (
        <div key={topic.id}>
          <h4>{topic.topic_name}</h4>
        </div>
      );
    });
  };

  return (
    <div>
      <h1>Pages</h1>
      {renderTopics()}
    </div>
  );
};

export default ArticlePage;

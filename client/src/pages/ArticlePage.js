import React, { useEffect, useState } from "react";
import axios from "axios";

const ArticlePage = (props) => {
  const [article, setArticle] = useState([]);
  const [art, setArt] = useState([])
  const { topicId, pageId } = props;
  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    try {
      let res = await axios.get(`/api/topics/${topicId}/pages/${pageId.id}/sections`);
      setArt(res.data);
    } catch (err) {
      console.error(err)
      console.log(err.response);
    }
  };
  
  const normalizeArticle = (art) => {
    const topic_id = art.map((a) => a.topic_id);
    const uniqueId = [...new Set(topic_id)];

    const articleData = [];

    uniqueId.forEach((id) => {
      let articlesFiltered = art.filter((a) => a.topic_id === id);

      const normalize = articlesFiltered.map((art1) => {
        return {
          topic_name: art1.topic_name,
          article_title: art1.article_title,
          body: art1.body,
        };
      });

      let { topic_id, topic_name } = articlesFiltered[0];

      articleData.push({
        topic_id,
        topic_name,
        topic: normalize,
      });
    });
    setArticle(articleData);
  };

  
 
 
  const renderTopics = () => {
    return art.map((article) => {
      return (
        <div key={article.id}>
          
          <h4>{article.article_title}</h4>
          <h4>{article.body}</h4>
          
        </div>
      );
    });
  };
 
  return (
    <div>
      <h2>{pageId.page_title}</h2>
      {renderTopics()}
    </div>
  );

};

export default ArticlePage;

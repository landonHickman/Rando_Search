import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Button } from "../styles/styles";
import { AuthContext } from "../providers/AuthProvider";
import PageForm from "../components/PageForm";
import ArticleForm from "../components/ArticleForm";

const ArticlePage = (props) => {
  const [article, setArticle] = useState([]);
  const [art, setArt] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const { topicId, pageId, updatePage, handleDeletePage } = props;
  const { authenticated } = useContext(AuthContext);
  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    try {
      let res = await axios.get(
        `/api/topics/${topicId}/pages/${pageId.id}/sections`
      );
      setArt(res.data);
    } catch (err) {
      console.error(err);
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

  const addArticleHandler = async (art) => {
    console.log(art)
    const request = {
      article_title: art.article_title,
      ...art
    }
    const response = await axios.post(`/api/topics/${topicId}/pages/${pageId.id}/sections`)
    setArticle([...art, response.data])
  }

  

  const renderTopics = () => {
    return art.map((article) => {
      return (
        <>
          <div key={article.id}>
            <h4>{article.article_title}</h4>
            <h4>{article.body}</h4>
            <ArticleForm />
          </div>
        </>
      );
    });
  };

  const handleEditPageClick = () => {
    setShowEditForm(!showEditForm);
  };

  return (
    <div>
      <h2>{pageId.page_title}</h2>
      <img src={pageId.image} style={{ height: "200px" }} />
      <div>
        <Button onClick={handleEditPageClick}>Edit Page</Button>
        <Button onClick={(e) => handleDeletePage(pageId.id)}>Delete</Button>
      </div>
      {authenticated && showEditForm && (
        <PageForm
          topicId={topicId}
          pageId={pageId.id}
          updatePage={updatePage}
        />
      )}
      {renderTopics()}
    </div>
  );
};

export default ArticlePage;

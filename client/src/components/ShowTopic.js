import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import { AuthContext } from '../providers/AuthProvider'
import TopicForm from './TopicForm'
import ArticlePage from '../pages/ArticlePage'

const ShowTopic = (props) => {
  const [pages, setPages] = useState([])
  const [pageId, setPageId] = useState([])
  const [showArticle, setShowArticle] = useState(false)
  const [showPages, setShowPages] = useState(true)
  const [showButton, setShowButton] = useState(true)
  const [showTopicForm, setShowTopicForm] = useState(false)
  const { authenticated} = useContext(AuthContext);
  const {topic, setShowImg, editTopic, setShowTopicButtons, setShowTopic, deleteTopic } = props
  
  console.log('topic',topic)


  useEffect(()=>{
    getPage()
  },[])

  const getPage = async () => {
    let res = await axios.get(`/api/topics/${topic.id}/pages`)
    // console.log(res.data)
    setPages(res.data)
  }

  const renderPages = () => {
    return pages.map(p=> {
      return (
        <div key={p.id} style={{ padding: '10px', justifyContent: 'center'}} onClick={(e)=>handelRevealArticle(p)} >
          <h2>{p.page_title}</h2>
          <img src={p.image} style={{height: '200px', }}/>
          <button>View article</button>
        </div>
      )
    })
  }
  const handelRevealArticle = (id) => {
    console.log(id)
    setPageId(id)
    setShowArticle(true)
    setShowPages(false)
  }

  const handleTopicForm = () => {
    setShowTopicForm(true)
    setShowPages(false)
    setShowButton(false)
    setShowImg(false)
  }

  const handleDelete = async(d) => {
    console.log(d)
    let res = await axios.delete(`/api/topics/${d}`)
    console.log(res.data)
    setShowTopicButtons(true)
    setShowTopic(false)
    deleteTopic(res.data)
  }
  
  return (
    <div>
      <h1>{topic.topic_name}</h1>
      {authenticated && showButton && <button onClick={handleTopicForm}>Edit Topic</button>}
      {showTopicForm && <TopicForm topicId={topic.id} name={topic.topic_name} editTopic={editTopic}/>}

      {authenticated && <button onClick={(e)=>handleDelete(topic.id)}>Delete</button>}
      <div style={{display: 'flex', margin: '10px', alignItems: 'center', }}>
      {showArticle && <ArticlePage topicId={topic.id} pageId={pageId}/>}
      {showPages && renderPages()}
      </div>
    </div>
  )
}

export default ShowTopic
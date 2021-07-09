import axios from 'axios'
import React, {useState, useEffect} from 'react'
import ShowTopic from '../components/ShowTopic'
import '../App.css';

const Home = () => {
  const [topic1, setTopic1] = useState([])
  const [topic2, setTopic2] = useState([])
  const [topic3, setTopic3] = useState([])
  const [showTopic1, setShowTopic1] = useState(false)
  const [showTopic2, setShowTopic2] = useState(false)
  const [showTopic3, setShowTopic3] = useState(false)

  useEffect(()=>{
    getTopics()
  },[])

  const getTopics = async ()=> {
    let res = await axios.get('/api/topics')
    console.log(res.data)
    setTopic1(res.data[0])
    setTopic2(res.data[1])
    setTopic3(res.data[2])
  }

  const handleTopic1 =() => {
    setShowTopic1(!showTopic1)
    setShowTopic2(false)
    setShowTopic3(false)
  }

  const handleTopic2 =() => {
    setShowTopic1(false)
    setShowTopic2(!showTopic2)
    setShowTopic3(false)
  }

  const handleTopic3 =() => {
    setShowTopic1(false)
    setShowTopic2(false)
    setShowTopic3(!showTopic3)
  }

  return (
    <>
    <div>

      <h1>Home</h1>
      <button onClick={handleTopic1}>{topic1.topic_name}</button>
      <button onClick={handleTopic2}>{topic2.topic_name}</button>
      <button onClick={handleTopic3}>{topic3.topic_name}</button>
      {showTopic1 && <ShowTopic topic={topic1}/>}
      {showTopic2 && <ShowTopic topic={topic2}/>}
      {showTopic3 && <ShowTopic topic={topic3}/>}
    </div>

    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '800px'}}>
      <img  src='https://lh3.googleusercontent.com/proxy/3tqXZ8VjyYZ3YL9oVuxtq7rrSDm83f7jXEc_7GtuI7-fiqsUKEAliQTy2v51iTUGTlcl0CcbxXvTNJl06k2wUFtm6YF33w3Y3Ct4gq1Qg882t4bkzuAGZiygfHJiYfETPGW9N5nrEkCOu_Z1B2Q'/>
    </div>
    </>
  )
}

export default Home;

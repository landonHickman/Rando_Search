import React, {useEffect, useState} from 'react'
import axios from 'axios'
const ShowTopic = (props) => {
  const [pages, setPages] = useState([])
  const {topic} = props

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
        <div key={p.id} style={{ padding: '10px', justifyContent: 'center'}}>
          <h2>{p.page_title}</h2>
          <img src={p.image} style={{height: '200px', }}/>
        </div>
      )
    })
  }

  return (
    <div>
      <h1>{topic.topic}</h1>
      <div style={{display: 'flex', margin: '10px', alignItems: 'center', }}>

      {renderPages()}
      </div>
    </div>
  )
}

export default ShowTopic
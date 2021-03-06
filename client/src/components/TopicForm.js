import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '../styles/styles'

const TopicForm = (props) => {
  const [name, setName]= useState(props.name ? props.name : '')
  const {topicId, editTopic} = props
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      if(topicId){
        let res1 = await axios.put(`/api/topics/${topicId}`, {topic_name: name})
        // console.log('update',res1.data)
        editTopic(res1.data)
      } else {
        let res = await axios.post('/api/topics', {topic_name: name})
        // console.log(res)
        // console.log(res.data)
        // createTopic(res.data)
        history.push('/')
      }
    }catch(err){
      alert('err')
      console.log('err',err)
      console.log('err.response',err.response)
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Name</p>
        <input value={name} onChange={(e)=>setName(e.target.value)}/>
        <Button>Submit</Button>
      </form>
    </div>

  )
}
export default TopicForm

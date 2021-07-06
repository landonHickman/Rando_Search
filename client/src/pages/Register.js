import React, {useContext} from 'react'
import { useFormInput } from '../customHooks/useFormInput'
import { AuthContext } from '../providers/AuthProvider'
import {useHistory} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


const Register = () => {
  //call history from react-router-dom so that we can pass it to AuthProvider so it can be used
  //in that file
  const history = useHistory()
  //passing handleRegister from AuthContext
  const {handleRegister} = useContext(AuthContext)
  //using the custom form input hook(initial value in field, label and placeholder for input)
  //need to drill down to get value. i.e. email.value
  //TODO: Remove dummy data.
  const name = useFormInput('Dummy', 'Name')
  const email = useFormInput('dummy@dummy.com', 'Email')
  const password = useFormInput('dummydata', 'Password')
  const ConfirmPassword = useFormInput('dummydata', 'Confirm Password')

  const handleSubmit = (e) => {
    //prevents page from refreshing
    e.preventDefault()
    //Front end validation
    if(password.value !== ConfirmPassword.value || password.value.length < 6){
      if(password.value !== ConfirmPassword.value){
        alert('Passwords do not Match!')
      }else{
        alert('Password must be longer than 6 characters.')
      }
    }else{
      handleRegister({name: name.value, email: email.value, password: password.value}, history)
    }

  }
  return(
    <>
      <h1>Create User</h1>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control {...name} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control {...email} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control {...password} type="password" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control {...ConfirmPassword} type="password" />
          </Form.Group>
          <Button variant="primary" type="submit">Submit</Button>
      </Form>
     </>
  )
}

export default Register
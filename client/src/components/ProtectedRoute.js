import React, { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'
import { Route, Redirect } from 'react-router'

//used to only allow access if they are logged in. if not redirects to login screen.
const ProtectedRoute = ({component: Component, ...rest}) => {
  //passes in authenticated from AuthProvider via useContext.
  const {authenticated} = useContext(AuthContext)

  return(
    //{...rest} sends the rest of the props. i.e. exact path='/'
    <Route {...rest} render={(props)=>(
      //if authenticated it sends user where they requested to go.
      authenticated ? (
        <Component {...props}/>
      ) : 
      //if not they are redirected to login screen.
      (
        <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
      )
    )}/>
  )
}
export default ProtectedRoute
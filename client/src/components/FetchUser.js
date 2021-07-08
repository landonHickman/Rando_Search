import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../providers/AuthProvider'

//used to allow user to refresh page manually and still stay logged in.
const FetchUser = (props) => {

  const [loaded, setLoaded] = useState(false)
  //passed in from AuthProvider.
  const {authenticated, setUser} = useContext(AuthContext)

  //mounts component then checks for user.
  useEffect(()=>{
    checkUser()
  },[])

  //checks for user. if authenticated or the token is false then loads page
  const checkUser = async() => {
    if(authenticated || !localStorage.getItem('access-token')){
      setLoaded(true)
      return;
    }
    //if the if statement is false then we attempt to get the token for the user through axios
    //and we set the user.
    try{
      const res = await axios.get("/api/auth/validate_token")
      setUser(res.data.data)
    }catch(err){
  
    }finally{
      // then it sets the page to loaded.
      setLoaded(true)
    }
  }
  //if loaded then return the pages if not then don't return anything.
  return loaded ? props.children : null
  }


export default FetchUser
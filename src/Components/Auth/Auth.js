import React from "react";
import { useNavigate } from "react-router-dom";
import './auth.css'
import axios  from "axios"

const Auth = () => {

  const [formData,setFormData] = React.useState({
    email:"",
    password:""
  })

  const navigate = useNavigate();

  const handleLogin = async(event) => {
    event.preventDefault()

    try {
      const response = await axios({
        url:"http://localhost:4000/api/v1/users/signin",
        method:'POST',
        data:formData,
        headers:{
          "Content-Type": "application/json"
        }
      })

      localStorage.setItem("currentUser",JSON.stringify(response?.data))
      const user = JSON.parse(localStorage.getItem("currentUser")) 

      if(user){
        navigate("/chat");
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <React.Fragment>
      <div className="authentication_form">
        <form>
          <div>
            <input 
            type="email" 
            placeholder="Email" 
            value={formData.email}
            onChange={(event)=>setFormData({
              ...formData,email:event.target.value
            })}
            />
          </div>
          <div>
            <input type="password" placeholder="password" 
            value={formData.password}
            onChange={(event)=>setFormData({
              ...formData,password:event.target.value
            })}
            />
          </div>
          <div>
            <button onClick={handleLogin}>Login</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Auth;

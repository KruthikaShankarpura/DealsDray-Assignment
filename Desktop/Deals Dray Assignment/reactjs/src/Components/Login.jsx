import React, { useState } from "react";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import stylelogin from "../CSS/login.module.css"
import { Button } from "@mui/material";

const yupSchema = yup.object({
  filedinput: yup.string().required("Email or Mobile is Required"),
  password: yup.string().required("Passwoord is Mandatory")
});

export default function Login() {
  let navigateto = useNavigate();
  let [message,setmessage]=useState("")
  
  let {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(yupSchema) });

  let Loginsubmit = async ({filedinput,password}) => {
    try {
      let {data,status} = await axios.post(
        "http://localhost:7800/api/users/login",
        {filedinput,password}
      );
          if (status===200){
            localStorage.setItem("token","Bearer"+" "+data.token)
            localStorage.setItem("fullname",data.fullname)
            localStorage.setItem("role",data.role)
            setmessage(data.message)
            setTimeout(()=>{
              setmessage("")
              navigateto("/");
            },1000)
          }
    } catch (err) {
      console.log("catch");
      console.log(err.response.data);
      setmessage(err.response.data.message)
            setTimeout(()=>{
              setmessage("")
            },2000)
    }}
    
  return (
    <>  
    <div className={stylelogin.main}>
      <div style={{color:"Green"}}>{!message?"":message}
            </div> 
      <h1>LOGIN FORM</h1>
      <form action="" className={stylelogin.Form} onSubmit={handleSubmit(Loginsubmit)}>
        <p>Username</p>
        <Input 
          type={"text"}
          placeholder={"Enter Email or Mobile"}
          register={{ ...register("filedinput") }} 
          errorMessage={errors.filedinput?.message}
        />
        <p>Password</p>                 
        <Input
          type={"password"}
          placeholder={"Enter your password"}
          register={{ ...register("password") }}
          errorMessage={errors.password?.message}
        />
        
        <Button variant="contained" size="medium" color="success" type="submit">
            LOGIN
        </Button>

      </form>

     
     
    </div>
    </>
  );
}



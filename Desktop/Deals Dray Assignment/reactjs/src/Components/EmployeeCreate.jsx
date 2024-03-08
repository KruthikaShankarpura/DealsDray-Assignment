import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import createemp from "../CSS/EmployeeCreate.module.css";
import axios from "axios";
import { Button } from "@mui/material";

let yupSchema = yup.object({
  fullname: yup.string().required("fullname is Mandatory").min(3),
  email: yup
    .string()
    .required("email is Mandatory")
    .email("email is not valid"),
  mobile: yup
    .string()
    .max(10)
    .required("mobile is Mandatory")
    .min(10)
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Must be a number"),
  gender: yup.string().required("gender is mandatory"),
});

export default function EmployeeCreate() {
  let [message, setmessage] = useState("");
  let {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(yupSchema) });

  let navigateto = useNavigate();
  let location = useLocation();
  useEffect(() => {
    if (location.state) {
      const fetchemployeedetails = async () => {
        try {
          const { data } = await axios.get(
            `http://localhost:7800/api/users/viewemployee/${location.state}`
          );
          Object.keys(data.data).forEach((key) => {
            setValue(key, data.data[key], { shouldValidate: true });
          });
        } catch (error) {
          console.log(error);
        }
      };
      fetchemployeedetails();
    }
  }, [location.state, setValue]);

  let submitdta = async (e) => {
    let token = localStorage.getItem("token")
    let data;
    try {
      if (!location.state) {
        let { image, ...y } = e;
        let imgurl = URL.createObjectURL(image[0]);
        let response = await axios.post(
          "http://localhost:7800/api/users/createemployee",
          { ...y, image: imgurl }, { headers: { authorization: token } }
        );
        data = response.data;
      } else {
        let { image, _id, createdAt, updatedAt, ...y } = e;

        let imgurl = URL.createObjectURL(image[0]);

        let response = await axios.put(
          `http://localhost:7800/api/users/update/${location.state}`,
          { ...y, image: imgurl }, { headers: { authorization: token } }
        );
        data = response.data;
      }
      console.log(data.message)
      setmessage(data.message);
      setTimeout(() => {
        setmessage("");
        location.state && navigateto("/employeedetails");
      }, 2000);
    } catch (err) {
      console.log("catch");
      setmessage(err.response.data.message);
      if (err.response.data.message == "jwt expired") {
        localStorage.clear()
        window.location.reload()
        // navigateto("/login")
      }
      console.log(err.response.data);
      setTimeout(() => {
        setmessage("");
      }, 2000);
    }
  };
  // let back=()=>{
  //   navigateto("/employeelist")
  // }

  return (
    <>
      {" "}
      <div className={createemp.mainnew}>
        <div
          style={{
            // height: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "Green",
          }}
        >
          {!message ? "" : <p>{message}</p>}
        </div>
        {!location.state ? (
          <h1 style={{fontSize:"25px" , fontWeight:"bold"}}>EMPLOYEE CREATION </h1>
        ) : (
          <h1 style={{fontSize:"25px" , fontWeight:"bold", color:"#9090d7"}}>EMPLOYEE UPDATION </h1>
        )}
        <form
          action=""
          onSubmit={handleSubmit(submitdta)}
          className={createemp.Formnew}
        >
          <div className={createemp.samedivnew1}>
            <Input
              type="text"
              placeholder="Fullname"
              register={{ ...register("fullname") }}
              errorMessage={errors.fullname?.message}
            />
            <Input
              type="email"
              placeholder="E-mail"
              register={{ ...register("email") }}
              errorMessage={errors.email?.message}
            />
            <Input
              type="tel"
              placeholder="Phone number"
              register={{ ...register("mobile") }}
              errorMessage={errors.mobile?.message}
            />
          </div>
          <div className={createemp.samedivnew2}>
            <div className={createemp.sidediv}>
              <p>GENDER</p>
              <Input
                type="radio"
                register={{ ...register("gender") }}
                value="Male"
                id="male"
              />
              <label htmlFor="male">Male</label>
              <Input
                type="radio"
                register={{ ...register("gender") }}
                value="Female"
                id="female"
              />
              <label htmlFor="female">Female</label>
              <Input
                type="radio"
                register={{ ...register("gender") }}
                value="Others"
                id="other"
              />
              <label htmlFor="other">Others</label>
            </div>
            <div className={createemp.sidediv}>
              <p>DESGINATION</p>
              <select {...register("designation")}>
                <option>Desgination</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            <div className={createemp.sidediv}>
              <p>COURSES</p>
              <Input
                type="checkbox"
                value="cs"
                id="cs"
                register={{ ...register("course") }}
              />{" "}
              <label htmlFor="cs">CS</label>
              <Input
                type="checkbox"
                value="civil"
                id="civil"
                register={{ ...register("course") }}
              />{" "}
              <label htmlFor="civil">CIVIL</label>
              <Input
                type="checkbox"
                value="mech"
                id="mech"
                register={{ ...register("course") }}
              />{" "}
              <label htmlFor="mech">MECH</label>
            </div>

            <div className={createemp.sidediv}>
              <label>UPLOAD</label>
              <Input
                type="file"
                accept=".jpeg, .jpg, .png"
                register={{ ...register("image") }}
              />
              {/* {location.state && <h6 style={{color:"red"}}>Please upload image </h6> } */}
            </div>
            {!location.state ? (
              <Button variant="contained" size="medium" color="primary" type="submit">
              CREATE
          </Button>
            ) : (
              <Button variant="contained" size="medium" color="primary" type="submit">
            UPDATE
        </Button>
            )}
          </div>


        </form>


      </div>
    </>
  );
}

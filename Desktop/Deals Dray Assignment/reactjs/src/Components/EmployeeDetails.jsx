import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

export default function EmployeeDetails() {
  let [all, setalltask] = useState([]);
  let [message, setmessage] = useState(false);
  let [length, setlength] = useState(0);
  let token = localStorage.getItem("token");

  let alltasks = async () => {
    try{
    if (token) {
      let { data } = await axios.get(
        "http://localhost:7800/api/users/employeelist",
        { headers: { Authorization: token } }
      );
      setlength(data.AllTasks.length);
      setalltask(data.AllTasks);
    }
  }catch(err){
    console.log(err.response.data.message)
    if(err.response.data.message=="jwt expired"){
      localStorage.clear()
      window.location.reload()

    }
  }
};
  useEffect(() => {
    alltasks();
  }, []);
  let navigateto = useNavigate();

  let Updatetask = (_id) => {
    navigateto(`/employeecreate`, { state: _id });
  };
  let Deletetask = async (_id) => {
    try {
      await axios.delete(`http://localhost:7800/api/users/delete/${_id}`);
      setmessage(true);
      setTimeout(() => {
        setmessage(false);
      }, 2000);
      alltasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        style={{
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "Green",
        }}
      >
        {!message ? "" : <h1>Deleted successfully</h1>}
      </div>
      {token ? (
        <div>
          <h1>EMPLOYEE LIST</h1>
          <b>
            <span style={{ marginLeft: "120px" }}>Total:{length}</span>
          </b>{" "}
          <Link to={"/employeecreate"}>
            <button
              style={{
                border: "none",
                outline: "none",
                background: "lightgreen",
                marginLeft: "100px",
                padding: "5px",
                borderRadius: "2px",
              }}
            >
              NEW EMPLOYEE
            </button>
          </Link>
          <Table>
            <thead>
              <tr>
                <th>Unique Id</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>Designation</th>
                <th>Gender</th>
                <th>Course</th>
                <th>Create date</th>
                <th>Action</th>
              </tr>
            </thead>

            {all.map(
              ({
                _id,
                fullname,
                email,
                mobile,
                gender,
                designation,
                course,
                createdAt,
                image,
              },index) => {
                return (
                  <tbody key={_id}>
                    <tr>
                      <td>{index+1}</td>
                      <td>
                        <img style={{ width: "50px" }} src={image} />
                      </td>
                      <td>{fullname}</td>
                      <td>{email}</td>
                      <td>{mobile}</td>
                      <td>{designation}</td>
                      <td>{gender}</td>
                      <td>{course}</td>
                      <td>{createdAt.split("T")[0]}</td>
                      <td>
                        <button
                          style={{
                            border: "none",
                            outline: "none",
                            background: "white",
                          }}
                          onClick={() => {
                            Updatetask(_id);
                          }}
                        >
                          EDIT
                        </button>
                        -
                        <button
                          style={{
                            border: "none",
                            outline: "none",
                            background: "white",
                          }}
                          onClick={() => {
                            Deletetask(_id);
                          }}
                        >
                          DELETE
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              }
            )}
          </Table>
        </div>
      ) : (
        navigateto("/login")
      )}
    </>
  );
}

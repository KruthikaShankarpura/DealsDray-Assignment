import React from "react";
import inputstyle from "../CSS/Input.module.css"


export default function Input({id,placeholder,type,register,errorMessage,name,value,htmlFor,onChange}){


    return (
        <div className={inputstyle.component}>
                <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} id={id}  {...register} />
                {/* <span htmlFor></span> */}
                <small style={{color:"red"}}>{errorMessage}</small>
        </div>
    )
}
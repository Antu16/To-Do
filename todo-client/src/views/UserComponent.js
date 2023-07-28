import axios from "axios";
import { useEffect, useState } from "react";
import { GET_USER_URL } from "../apiUrls/constants";
import { StatusCodes } from "http-status-codes";

const UserComponent = ()=>{

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setSetCompany] = useState("");
    const [age, setAge] = useState("");

    const getUserData = async ()=>{
        try{
            const userResponse = await axios.get(GET_USER_URL, { AccessControlAllowOrigin: "*" });
            console.log(userResponse);
            if(userResponse?.status === StatusCodes.OK){
                setName(userResponse?.data?.name);
                setEmail(userResponse?.data?.email);
                setSetCompany(userResponse?.data?.company);
                setAge(userResponse?.data?.age);
            }
        }catch(err){
            console.log("Error");
        }


    }

    useEffect(()=>{
        getUserData();
    }, [])


    return <>
        <div>From User Component</div>
        {name && email && age && company && <>
            <div><b>Name:</b> {name}</div>
            <div><b>Email:</b> {email}</div>
            <div><b>Age:</b> {age}</div>
            <div><b>Company:</b> {company}</div>
        </>}
    </>;
}

export default UserComponent;
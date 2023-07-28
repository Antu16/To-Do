import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalUserData } from "../utils/localStorageHelpers";
import { routesInformation } from "../utils/constants";
import axios from "axios";
import { ADD_TODO_URL } from "../apiUrls/constants";
import { getAxiosHeaderObject } from "../utils/utils";
import { StatusCodes } from "http-status-codes";

const AddTodoComponent = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUserData = getLocalUserData();

    console.log({ loggedInUserData });

    if (!loggedInUserData) {
      navigate(routesInformation.login.path);
    } else {
      setLoggedInUser(loggedInUserData);
    }
  }, []);


  const getBase64 = (file, cb)=>{
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}


    const addTodo = async(data)=>{
        try{
            console.log({data});
            const accessToken = loggedInUser?.accessToken;

            const addTodoRes = await axios.post(ADD_TODO_URL, data, getAxiosHeaderObject(accessToken));
            console.log(addTodoRes);

            if(addTodoRes?.status === StatusCodes.CREATED){
                alert("Successfully added Todo");
                navigate(routesInformation.home.path);
            }
        }catch(error){
            console.log(error)
        }
    }

  const addTodoHandler = (e)=>{
    try{
        e.preventDefault();
        console.log({image})

        console.log("Image base 64 convert");
        getBase64(image, (result) => {
            console.log("dfgdlkgj",result);

            const data = {
                title,
                description,
                image: result.split(",")[1]
            }

            addTodo(data);

        });
        
    }catch(error){
        console.log(error);
    }
  }

  return (
    <>
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="title"
            placeholder="Enter title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            type="textarea"
            className="form-control"
            id="description"
            aria-describedby="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => {
                setDescription(e.target.value);
              }}
          />
          {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            aria-describedby="image"
            placeholder="Select Image"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
        </div>
        <button type="submit" className="btn btn-primary" onClick={(e)=>{
            addTodoHandler(e);
        }}>
          Add Todo
        </button>
      </form>
    </>
  );
};

export default AddTodoComponent;

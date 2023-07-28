import { useEffect, useState } from "react";
import { getLocalUserData } from "../utils/localStorageHelpers";
import { useNavigate } from "react-router-dom";
import { roles, routesInformation } from "../utils/constants";
import Table from 'react-bootstrap/Table';
import { getAxiosHeaderObject, todoListTableHeader } from "../utils/utils";
import { DELETE_TODO_URL, GET_TODO_LIST_URL, UPDATE_TODO_STATUS_URL } from "../apiUrls/constants";
import { StatusCodes } from "http-status-codes";
import axios from "axios";


const HomeComponent = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [todos, setTodos] = useState(null);

  const navigateHandler = (path)=>{
    navigate(path);
  }

  const getTodos = async (accessToken) => {
    try {
      const todosRes = await axios.get(GET_TODO_LIST_URL, getAxiosHeaderObject(accessToken));
      console.log({ todosRes })
      if (todosRes?.status === StatusCodes.OK) {
        console.log("OK");
        console.log(todosRes?.data);
        setTodos(todosRes?.data);
      } else {
        // 
      }
    } catch ({ errResponse }) {
      console.log(errResponse);
    }
  }

  const changeStatus = async (id) => {
    try {
      console.log("statusChange", { id })
      console.log("LoggedInUser - changestatus", loggedInUser);
      const accessToken = loggedInUser?.accessToken;
      console.log(accessToken);

      const changeStatusRes = await axios.put(`${UPDATE_TODO_STATUS_URL}${id}`, {}, getAxiosHeaderObject(accessToken));

      if (changeStatusRes?.status === StatusCodes.OK) {
        getTodos(accessToken);
      }
    } catch ({ response }) {
      console.log(response);
    }
  }

  const deleteTodo = async (id) => {
    try {
      console.log("dlete", id);

      const accessToken = loggedInUser?.accessToken;

      const deleteRes = await axios.delete(`${DELETE_TODO_URL}${id}`, getAxiosHeaderObject(accessToken));

      if (deleteRes?.status === StatusCodes.OK) {
        getTodos(accessToken);
      } else {

      }
    } catch ({ response }) {

    }

  }

  useEffect(() => {
    const loggedInUserData = getLocalUserData();

    console.log({ loggedInUserData });

    if (!loggedInUserData) {
      navigateHandler(routesInformation.login.path);
    }
    else {
      setLoggedInUser(loggedInUserData);
      getTodos(loggedInUserData?.accessToken);
    }
  }, [])



  useEffect(() => {
    console.log({ loggedInUser });
  }, [loggedInUser])

  return <>
    <div>
      <div>
        <h1 className="text-center">Todo List</h1>
        {loggedInUser && loggedInUser?.roles?.length > 0 && loggedInUser?.roles?.includes(roles.admin) && <button type="button" className="btn btn-primary text-right m-1 p-1" onClick={() => {
         navigateHandler(routesInformation.addTodo.path) 
        }} >Add Todo</button>}

      </div>

      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            {todoListTableHeader.map((data, index) => (
              <th key={"header-" + index}>{data}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            todos && todos.length > 0 && todos.map((todo, index) => {
              return <tr key={`todos-row-${index}`}>
                <td key={`todos-#-${index}`}>{index + 1}</td>
                <td key={`todos-image-${index}`}>
                  {/* <img src={URL.createObjectURL(`data:image/jpeg;base64,${todo.resImage}`)} /> */}
                </td>
                <td key={`todos-title-${index}`}>{todo.title}</td>
                <td key={`todos-desc-${index}`}>{todo.description}</td>
                <td key={`todos-status-${index}`}>{todo.markedas === false ? "Open" : "Closed"}</td>
                <td key={`todos-actions-${index}`}>
                  <div className="align-center">
                    <button type="button" className="btn btn-warning m-1 p-1" onClick={() => {
                      changeStatus(todo?.id);
                    }} >Mark As Close</button>
                    {
                      loggedInUser && loggedInUser?.roles?.length > 0 && loggedInUser?.roles?.includes(roles.admin) && <button type="button" className="btn btn-danger m-1 p-1" onClick={() => {
                        deleteTodo(todo?.id);
                      }}>Delete</button>
                    }

                  </div>
                </td>
              </tr>
            })
          }
        </tbody>
      </Table>
    </div>
  </>;
}

export default HomeComponent;
// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './views/HomeComponent';
import User from './views/UserComponent';
import LoginForm from './views/SigninComponent';
import { routesInformation } from './utils/constants';
import AddTodoComponent from './views/AddTodoComponent';


function App() {
  return (
    <>
         <Routes>
            <Route path="/user" element={<User />} exact={true}/>
            <Route path={routesInformation.login.path} element={<LoginForm />}  exact={routesInformation.login.exact}/>
            <Route path={routesInformation.addTodo.path} element={<AddTodoComponent />}  exact={routesInformation.addTodo.exact}/>
            <Route path={routesInformation.home.path} element={<Home />} exact={routesInformation.home.exact}/>
         </Routes>
      </>
  );
}

export default App;

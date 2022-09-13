
import './App.css';
import Login from './webPages/login';
import Profile from './webPages/profile';
import Register from './webPages/register';
import Admin from './webPages/admin';
import {Posts} from "./webPages/posts"
import {Routes,Route} from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}  />
      <Route path='/Profile' element={<Profile/>}  />
      <Route path='/Register' element={<Register/>}  />
      <Route path='/Admin' element={<Admin/>}  />
      <Route path='/Posts' element={<Posts/>}  />

    </Routes>
  );
}

export default App;

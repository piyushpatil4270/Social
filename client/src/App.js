
import Homepage from "./components/homepage/Homepage";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import Register from "./components/register/Register";
import {BrowserRouter,Routes,Route} from  "react-router-dom"
import { Usercontextprovider } from "./context";
import Profile from "./components/profile/Profile";
import Usercomponent from "./components/usercomponent/Usercomponent";
import Postcomponent from "./components/postcomponent/Postcomponent";

function App() {
  return (
    <BrowserRouter>
    <Usercontextprovider>
    <Navbar/>
    <Routes>
    <Route path="/register" Component={Register}  />
    <Route path="/" Component={Login}  />
    <Route path="/home" Component={Homepage}  />
    <Route path="/myprofile" Component={Profile}  />
    <Route path="/user/:id" Component={Usercomponent}  />
    <Route path="/post/:id" Component={Postcomponent}  />
    </Routes>
    </Usercontextprovider>
    </BrowserRouter>
   
  
    );
}

export default App;

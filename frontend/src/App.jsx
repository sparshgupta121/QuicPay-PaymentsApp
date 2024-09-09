import{BrowserRouter,Navigate,Route,Routes} from "react-router-dom";

import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { UpdateProfile } from "./pages/UpdateProfile";
import { ContactPage } from "./pages/Contact";
import { ResetPassword } from "./pages/ResetPassword.jsx";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signin"/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/signin" element={<Signin/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/send" element={<SendMoney/>}></Route>
          <Route path="/updateprofile" element={<UpdateProfile/>}></Route>
          <Route path="/contact" element={<ContactPage/>}></Route>
          <Route path="/resetpassword" element={<ResetPassword />}></Route>
        </Routes>      
      </BrowserRouter>
    </div>
  )
}

export default App

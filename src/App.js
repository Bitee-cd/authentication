import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import { AuthProvider } from "./Context/AuthContext";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Other from "./Pages/Other";
import PrivateRoute from "./Utilities/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Other />
      <AuthProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route exact path="/" element={<Home />} />
            </Route>
            <Route path="login" element={<Login />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

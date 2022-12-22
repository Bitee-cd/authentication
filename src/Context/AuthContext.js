import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = (props) => {
  const [authtoken, setAuthToken] = useState(
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  const navigate = useNavigate();

  let loginUser = async (e) => {
    e.preventDefault();
    console.log("form submitted");
    let response = await fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();
    console.log("data: ", data);
    console.log("response: ", response);
    if (response.status === 200) {
      setAuthToken(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } else {
      alert("something went wrong");
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("authTokens");
    setUser(null);
    setAuthToken(null);
    navigate("/login");
  };

  const updateTokens = async () => {
    console.log("updateTokens called");
    let response = await fetch("http://localhost:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authtoken.refresh }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setAuthToken(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }
  };

  let ContextData = {
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  useEffect(() => {
    const time = 1000 * 60 * 5;
    let interval = setInterval(() => {
      if (authtoken) {
        updateTokens();
      }
      return () => clearInterval(interval);
    }, time);
  }, [authtoken]);

  return (
    <AuthContext.Provider value={ContextData}>
      {props.children}
    </AuthContext.Provider>
  );
};

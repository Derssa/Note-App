import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./components/Login";
import Notes from "./components/Notes";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [loaded, setloaded] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const res = await axios.get("/users/verify", {
          headers: { Authorization: token },
        });
        setIsLogin(res.data);
        setloaded(true);
        if (res.date === false) return localStorage.clear();
      } else {
        setIsLogin(false);
        setloaded(true);
      }
    };
    checkLogin();
  }, []);

  return (
    <div className="App">
      {loaded ? (
        isLogin ? (
          <Notes setIsLogin={setIsLogin} />
        ) : (
          <Login setIsLogin={setIsLogin} />
        )
      ) : null}
    </div>
  );
}

export default App;

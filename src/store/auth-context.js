
import React,{useState,useEffect} from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email,password) => {},
});



export const AuthContextProvider=(props)=>{


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInStatus = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedInStatus === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "1");
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };






  return( <AuthContext.Provider value={{
    isLoggedIn: isLoggedIn,
    onLogout: logoutHandler,
    onLogin: loginHandler,
  }}>
    {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;

import React, { useEffect, useState, useRef } from 'react'; 
import MainPage from './Pages/MainPage/MainPage';
import Login from './Pages/LoginPage/LoginPage';
import './App.css';

// eslint-disable-next-line no-empty-pattern
function App({}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");
  const effectRun = useRef(false);

  function handleLogin(loginValid) {
    // Check the username and password against some predefined values
    if (loginValid) {
      setIsLoggedIn(true);
    }
  }

  useEffect(() => {
    if (!effectRun.current && isLoggedIn) {
      console.log('isLoggedIn: ', isLoggedIn);
      console.log('hasLoggedIn: ', hasLoggedIn);
      if (isLoggedIn && !hasLoggedIn) {
        setHasLoggedIn(true);
      }

      return () => {
        setHasLoggedIn(false);
        effectRun.current = true;
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <div className="App">
      {isLoggedIn && hasLoggedIn ? 
        <MainPage
          username={currentUsername}
        /> : 
        <Login 
          onLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          setCurrentUsername={setCurrentUsername}
        />}
    </div>
  );
}

export default React.memo(App);

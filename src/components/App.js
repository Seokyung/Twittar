import React, {useState} from "react";
import AppRouter from "./AppRouter";
import { authService } from "fbase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn}/>
      <footer>&copy; {new Date().getFullYear()} twittar</footer>
    </>
  );
}

export default App;

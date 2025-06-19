import React from "react";
import { useState, useEffect } from "react";
import CommentSection from "./components/CommentSection";
import CommentBar from "./components/CommentBar";
import "./appStyle.css";


function App() {
  const { curUser, loaded } = useCurrentUser();
  // get curr user spread to section and bar




  if (!loaded) return // is there other way ?? 

  return (
    <main>
      <CommentSection curUser={curUser}></CommentSection>
      <CommentBar></CommentBar>
    </main>
  )

}

export function useCurrentUser() {
  const [curUser, setCurUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getCurUser()
      .then(data => setCurUser(data))
      .catch(e => console.error(`server error ${e}`))
      .finally(() => setLoaded(true));

  }, []);

  return { curUser, loaded }
}

export function getCurUser() {
  return fetch("http://localhost:3001/currentUser")
    .then(resonse => {
      if (!resonse.ok) throw new Error(`oops ${resonse.status}`);
      return resonse.json();
    })
}


export default App;


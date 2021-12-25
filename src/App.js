import { AuthProvider } from "./auth/Auth";
import Login from "./auth/Login";
import React from "react";
import SnapshotFirebaseAdvanced from "./SnapshotFirebaseAdvanced";
import Welcome from "./Welcome";

//import GetFirebase from './GetFirebase';
//import SnapshotFirebase from './SnapshotFirebase';

function App() {
  //const get = false;

  return (
    <>
      <AuthProvider>
        {/* <Welcome /> */}
        {/* <Login /> */}
        {/* {get ? <GetFirebase /> : <SnapshotFirebase />} */}
        <SnapshotFirebaseAdvanced />
      </AuthProvider>
    </>
  );
}

export default App;

//DOCS: https://firebase.google.com/docs/firestore/

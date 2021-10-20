// import { Router, Switch, Route } from 'react-router-dom';
import "./App.scss";
import ClientCard from "./components/ClientCard";
import React, { useEffect, useContext } from "react";
import useAppData from "./hooks/useAppData";

function App() {
  const {state, updateState} = useAppData();
  const Data = React.createContext();
  const DataUpdate = React.createContext();

  return (
    <Data.Provider value={state}>
      <DataUpdate.Provider value={updateState}>
        <div className="App">
          <p>{JSON.stringify(state)}</p>
        </div>
      </DataUpdate.Provider>
    </Data.Provider>

  );
}

export default App;

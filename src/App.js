import React from 'react';
import {useSelector} from "react-redux";
import './App.css';
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
    const loggedIn = useSelector(store => !!store.token);

    return (
        <div className="App">
            {loggedIn
                ? <Dashboard/>
                : <Login/>}
        </div>
    );
}

export default App;

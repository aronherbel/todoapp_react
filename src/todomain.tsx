import { useState } from "react";
import App from "./App";
import Login from "./login";

export default function Todomain(){
    const [logedIn, setLogedIn] = useState(false);
 
 
 
    return(
    <>
        {logedIn ? (

            <App />

        ) : (

            <Login  setLogedIn={(bool: boolean) => setLogedIn(bool)}/>    
        )
        }
           
    </>
 )
}
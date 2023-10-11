import { useState } from "react";
import App from "./App";
import Login from "./login";


export default function Todomain(){
    const [logedIn, setLogedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
    const [passwordForCurrentUser, setPasswordForCurrentUser] = useState("")
 
    return(
    <>
        {logedIn ? (

            <App 
                setLogedIn={setLogedIn}
                setCurrentUser={setCurrentUser}
                setPasswordForCurrentUser={setPasswordForCurrentUser} 
                currentUser={currentUser} 
                passwordForCurrentUser={passwordForCurrentUser}           
                 />
        ) : (

            <Login  
            setLogedIn={(bool: boolean) => setLogedIn(bool)}
            setCurrentUser={setCurrentUser}
            setPasswordForCurrentUser={setPasswordForCurrentUser}
            />    
        )
        }
           
    </>
 )
}
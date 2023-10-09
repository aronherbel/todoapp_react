import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { mainColor } from "./colors";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import { FC, useState } from "react";
import "./App.css";
import { Md5 } from "ts-md5";

type LoginProps = {
    emailInputValue: string;
    passwordInputValue: string;
};

export const Login: FC<LoginProps> = ({
    emailInputValue,
    passwordInputValue
}) =>{
  const [showPassword, setShowPassword] = useState(false);
 

  function accountLogin(){
    let passwordInput: any = Md5.hashStr('password');
    
  }
 

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <Box className="App">
        <Box className="Container" sx={{ padding: "2em", margin: "2em", backgroundImage: "url(https://cdn.wallpapersafari.com/50/3/ESL5di.png)"}}>
          <header>
            <Typography variant="h3" sx={{ color: mainColor }}>
              Your ToDo Login
            </Typography>
          </header>
          <main>
            <Box sx={{ display: "flex", m: 2, width: "25ch", height: "2em", marginBottom: "1em" }}>
              <TextField
                id="input-with-sx"
                label="Email"
                variant="standard"
                value={emailInputValue}
              />
            </Box>
            <FormControl sx={{ display: "flex", m: 2, width: "25ch", height: "2em" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                value={passwordInputValue}
              />
              <Button onClick={accountLogin}>Enter</Button>
            </FormControl>
            
          </main>
        </Box>
      </Box>
    </>
  );
}

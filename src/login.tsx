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

const uriLogin: string = "https://localhost:7140/users/authenticate";

type LoginProps = {
  setLogedIn: (bool: boolean) => void;
};

export default function Login({setLogedIn} : LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


 async function accountLogin() {
    let hashedPassword: string = Md5.hashStr(password);
    console.log(hashedPassword);
    let userName: string = email;

    let formData = new FormData();
    formData.append('userName', userName);
    formData.append('hashedPassword', hashedPassword);
    
    try {
      const response = await fetch(uriLogin, {
        body: formData,
        method: "post"
      });
      const responseData = await response.json();

      if(responseData.statusCode === 200){
        setLogedIn(true);
        console.log("your logged in with: ", userName)
      } else {
      console.error("Your password or user name are not correct");
      }
    } catch (error) {
      console.error("Your password or user name are not correct", error);
    }
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <>
     <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage:
          "url(https://cdn.wallpapersafari.com/50/3/ESL5di.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "2em",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h4" sx={{ color: mainColor, marginBottom: "1em" }}>
          Your ToDo Login
          <hr className="seperateLine" />
        </Typography>
        
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: "1em" }}
        />
        <FormControl variant="outlined" fullWidth sx={{ marginBottom: "1em" }}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button
          variant="contained"
          onClick={accountLogin}
          sx={{ backgroundColor: mainColor, color: "white" }}
        >
          Enter
        </Button>
      </Box>
    </Box>
    </>
  );
}

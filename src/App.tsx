import React, { FC, useState } from 'react';
import './App.css';
import { Avatar, Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import { dunkelColor, mainColor, secondaryColor } from './colors';
import { deepOrange } from '@mui/material/colors';
import { get } from 'http';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

//TASK ARRAY
let tasks = [
  {id: 0, name: "apfel kaufen", isDone: false, isPriority: false},
  {id: 1, name: "apfel kaufen", isDone: false, isPriority: false}
]


let currentId = tasks.length;
//QUERY -> TALK TO BACKEND
//ON ITINIALIZE FILL ARRAY

//ADDTASK
//DELETETASK
//UPDATE (PRIO/DONE)


let Cardfield = () =>{

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </React.Fragment>
  );
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );

}

const Inputfield = () => {
  const [textInputValue, setTextInputValue] = useState<string>("");
  const [textInputError, setTextInputError] = useState<boolean>(false);

  const handleChange = (e:any) => setTextInputValue(e.target.value);

  const addTask = () => {

    const newtask = {
      id: currentId++, name: textInputValue, isDone: false, isPriority: false
    }

    tasks.push(newtask)

    if(textInputValue==""){
      setTextInputError(true);
    } else {
      setTextInputError(false);
      //ADD TASK TO ARRAY
      setTextInputValue("");
    }
    console.log(tasks);
  }
  
    return(
      <div style={{display: "flex", position: "relative"}}>
        <TextField error={textInputError} value={textInputValue} onChange={handleChange} placeholder='new task' fullWidth label="enter your task.." id='inputTask' />
        <AddCircleOutlineIcon onClick={addTask} sx={{position: "absolute", right: ".5em", top: ".46em", padding: "0",  width: "1.5em", height: "1.5em"}}></AddCircleOutlineIcon>
      </div>
      );
};






export default function App() {
  return (
    <div className="App">
      <div className="Container">
        <header>
          <Typography variant='h2' sx={{color:mainColor}}>Aron'<span style={{color: dunkelColor }}>s </span> To<span style={{color: dunkelColor}}>Do</span></Typography>        
          <div className='Profile'>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
            <p style={{ margin: "0"}}>Profile</p>
          </div>
        </header>
        <hr className='seperateLine'/>
        <main>
          <div className='Inputfield'>
            <Inputfield/>
          </div>
          
          <div className='Cardfield'>
            <Cardfield/>
          </div>
        </main>
      </div>
    </div>
  );
}

//<!--MAP ALL TASKS IN ARRAY TO CARDS (for loop) -->



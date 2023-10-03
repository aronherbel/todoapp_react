import React, { FC, useState } from "react";
import "./App.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { dunkelColor, mainColor, secondaryColor } from "./colors";
import { deepOrange } from "@mui/material/colors";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

//TASK ARRAY

//QUERY -> TALK TO BACKEND
//ON ITINIALIZE FILL ARRAY

//ADDTASK
//DELETETASK
//UPDATE (PRIO/DONE)
export function BasicAccordion() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>more</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export type CardFieldNormalProps = {
  taskName: string;
  isPriority: boolean;
  isDone: boolean;
};

export const CardfieldNormal: FC<CardFieldNormalProps> = ({
  taskName,
  isPriority,
  isDone,
}) => {
  return (
    <Box sx={{ height: "50%", margin: "1em" }}>
      <Card variant="outlined">
        <CardContent
          sx={{
            fontSize: 14,
            backgroundColor: isDone ? secondaryColor : "",
            borderColor: "black",
          }}
          className={isPriority ? "priority" : ""}
        >
          <Typography color="text.secondary" gutterBottom>
            Your To do
          </Typography>
          <Typography variant="h5" component="div">
            {taskName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {isDone ? "Done" : ""}
            {isPriority ? "Important" : ""}
            {!isDone && !isPriority ? "Task" : ""}
          </Typography>
          <Typography variant="body2">
            <BasicAccordion />
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export type InputfieldProps = {
  textInputError: boolean;
  textInputValue: string;
  handleChange: any;
  addTask: any;
};
export const Inputfield: FC<InputfieldProps> = ({
  textInputError,
  textInputValue,
  handleChange,
  addTask,
}) => {
  return (
    <div style={{ display: "flex", position: "relative" }}>
      <TextField
        error={textInputError}
        value={textInputValue}
        onChange={handleChange}
        placeholder="new task"
        fullWidth
        label="enter your task.."
        id="inputTask"
      />
      <AddCircleOutlineIcon
        onClick={addTask}
        sx={{
          position: "absolute",
          right: ".5em",
          top: ".46em",
          padding: "0",
          width: "1.5em",
          height: "1.5em",
        }}
      ></AddCircleOutlineIcon>
    </div>
  );
};

export default function App() {
  let [tasks, setTasks] = useState([
    { id: 0, name: "apfel kaufen", isDone: false, isPriority: true },
    { id: 1, name: "apfel bauen", isDone: false, isPriority: true },
    { id: 2, name: "apfel hauen", isDone: false, isPriority: false },
  ]);
  let currentId = tasks.length;

  const [textInputValue, setTextInputValue] = useState<string>("");
  const [textInputError, setTextInputError] = useState<boolean>(false);
  const handleChange = (e: any) => setTextInputValue(e.target.value);

  const [spacing, setSpacing] = useState(2);

  const addTask = () => {
    const newtask = {
      id: currentId++,
      name: textInputValue,
      isDone: false,
      isPriority: false,
    };
    if (textInputValue === "") {
      setTextInputError(true);
    } else {
      setTextInputError(false);
      setTasks([...tasks, newtask]);
      console.log(tasks);
      setTextInputValue("");
    }
    console.log(tasks);
  };

  return (
    <div className="App">
      <div className="Container">
        <header>
          <Typography variant="h2" sx={{ color: mainColor }}>
            Aron'<span style={{ color: dunkelColor }}>s </span> To
            <span style={{ color: dunkelColor }}>Do</span>
          </Typography>
          <div className="Profile">
            <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
            <p style={{ margin: "0" }}>Profile</p>
          </div>
        </header>
        <hr className="seperateLine" />
        <main>
          <div className="Inputfield">
            <Inputfield
              textInputError={textInputError}
              textInputValue={textInputValue}
              handleChange={handleChange}
              addTask={addTask}
            />
          </div>
          <Grid container spacing={2}>
            {tasks.map((task) =>
              task.isPriority ? (
                <Grid item xs={12} md={4} key={task.id}>
                  <CardfieldNormal
                    taskName={task.name}
                    isDone={task.isDone}
                    isPriority={task.isPriority}
                  />
                </Grid>
              ) : null,
            )}
          </Grid>
          <Grid container spacing={2}>
            {tasks.map((task) =>
              !task.isPriority && !task.isDone ? (
                <Grid item xs={12} md={4} key={task.id}>
                  <CardfieldNormal
                    taskName={task.name}
                    isDone={task.isDone}
                    isPriority={task.isPriority}
                  />
                </Grid>
              ) : null,
            )}
          </Grid>
          <Grid container spacing={2}>
            {tasks.map((task) =>
              task.isDone ? (
                <Grid item xs={12} md={4} key={task.id}>
                  <CardfieldNormal
                    taskName={task.name}
                    isDone={task.isDone}
                    isPriority={task.isPriority}
                  />
                </Grid>
              ) : null,
            )}
          </Grid>
        </main>
      </div>
    </div>
  );
}

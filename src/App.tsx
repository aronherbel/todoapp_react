import React, { FC, useReducer, useState } from "react";
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
import {
  AddCircleOutline,
  ExpandMore,
  CheckCircleOutlineRounded,
  StarBorderRounded,
  MoreHoriz
} from "@mui/icons-material/";

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
          expandIcon={<ExpandMore />}
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
  checkTask: any;
  priorityTask: any;
  //deleteTask: any;
};

export const CardfieldNormal: FC<CardFieldNormalProps> = ({
  taskName,
  isPriority,
  isDone,
  checkTask,
  priorityTask,
}) => {
  return (
    <Box
      sx={{ height: "50%", margin: "1em" }}
      >
      <Card variant="outlined" className="Card ">
        <CardContent
          className={isPriority ? "priorityCard" : ""}
          sx={{
            fontSize: 14,
            backgroundColor: isDone ? secondaryColor : "",
          }}
          >
          <Typography color="text.secondary" gutterBottom>
            {isDone ? "Done" : ""}
            {isPriority ? "Important" : ""}
            {!isDone && !isPriority ? "Task" : ""}
          </Typography>
          <Typography variant="h5" component="div">
            {taskName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
          <Typography variant="body2">
            <BasicAccordion />
            <br />
          </Typography>
          <CardActions>
            <StarBorderRounded
              className="priorityStar"
              sx={{
                position: "absolute",
                top: ".2em",
                right: ".1em",
                color: isPriority ? "#ffcf40" : "",
              }}
              onClick={priorityTask}
            />
            <CheckCircleOutlineRounded
              className="check"
              sx={{ position: "absolute", bottom: ".2em", left: ".1em" }}
              onClick={checkTask}
            />
          </CardActions>
        </CardContent>
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
    <div style={{ display: "flex", position: "relative", marginBottom: "1em" }}>
      <TextField
        error={textInputError}
        value={textInputValue}
        onChange={handleChange}
        placeholder="new task"
        fullWidth
        label="enter your task.."
        id="inputTask"
      />
      <AddCircleOutline
        onClick={addTask}
        sx={{
          position: "absolute",
          right: ".5em",
          top: ".46em",
          padding: "0",
          width: "1.5em",
          height: "1.5em",
        }}
      ></AddCircleOutline>
    </div>
  );
};

export default function App() {
  let [tasks, setTasks] = useState([
    { id: 0, name: "apfel kaufen", isDone: false, isPriority: false },
    { id: 1, name: "apfel bauen", isDone: false, isPriority: false },
    { id: 2, name: "apfel hauen", isDone: false, isPriority: false },
  ]);
  let currentId = tasks.length;

  const [textInputValue, setTextInputValue] = useState<string>("");
  const [textInputError, setTextInputError] = useState<boolean>(false);
  const handleChange = (e: any) => setTextInputValue(e.target.value);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  function handleClick() {
    forceUpdate();
  }

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

  function priorityTask(_id: number) {
    let taskToPriority = tasks.find((task) => task.id === _id);
    if (taskToPriority) {
      taskToPriority.isPriority = !taskToPriority.isPriority;

      if (
        taskToPriority.isDone === true &&
        taskToPriority.isPriority === true
      ) {
        taskToPriority.isDone = false;
      }
      handleClick();
    }
  }

  function checkTask(_id: number) {
    let taskToCheck = tasks.find((task) => task.id === _id);
    if (taskToCheck) {
      taskToCheck.isDone = !taskToCheck.isDone;

      if (taskToCheck.isDone === true && taskToCheck.isPriority === true) {
        taskToCheck.isPriority = false;
      }
      handleClick();
    }
  }

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
                    checkTask={() => checkTask(task.id)}
                    priorityTask={() => priorityTask(task.id)}
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
                    checkTask={() => checkTask(task.id)}
                    priorityTask={() => priorityTask(task.id)}
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
                    checkTask={() => checkTask(task.id)}
                    priorityTask={() => priorityTask(task.id)}
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

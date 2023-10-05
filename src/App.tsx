import React, { FC, useEffect, useReducer, useState } from "react";
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
  Dialog,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { dunkelColor, mainColor, secondaryColor } from "./colors";
import { blue, deepOrange, green, orange, red } from "@mui/material/colors";
import {
  AddCircleOutline,
  ExpandMore,
  CheckCircleOutlineRounded,
  StarBorderRounded,
  MoreHoriz,
  Add,
  Delete,
  CalendarViewMonthTwoTone,
  DocumentScannerTwoTone,
} from "@mui/icons-material/";

const options = ["deleteTask", "addDiscription", "addDate", "addFile"];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  deleteTask: any;
  addDiscription: () => void;
  addDate: () => void;
  addFile: () => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const {
    onClose,
    selectedValue,
    open,
    deleteTask,
    addFile,
    addDate,
    addDiscription,
  } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Options</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem disableGutters>
          <Box onClick={deleteTask}>
            <ListItemButton onClick={() => handleListItemClick("deleteTask")}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: red[100], color: red[600] }}>
                  <Delete />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete Task" />
            </ListItemButton>
          </Box>
        </ListItem>

        <ListItem disableGutters>
          <Box onClick={addDiscription}>
            <ListItemButton
              onClick={() => handleListItemClick("addDiscription")}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <Add />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Add Discription" />
            </ListItemButton>
          </Box>
        </ListItem>

        <ListItem disableGutters>
          <Box onClick={addDate}>
            <ListItemButton onClick={() => handleListItemClick("addDate")}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: orange[100], color: orange[600] }}>
                  <CalendarViewMonthTwoTone />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Add Date" />
            </ListItemButton>
          </Box>
        </ListItem>

        <ListItem disableGutters>
          <Box onClick={addFile}>
            <ListItemButton
              autoFocus
              onClick={() => handleListItemClick("addFile")}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: green[100], color: green[600] }}>
                  <DocumentScannerTwoTone />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Add File" />
            </ListItemButton>
          </Box>
        </ListItem>
      </List>
    </Dialog>
  );
}

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
  handleClickOpen: any;
};

export const CardfieldNormal: FC<CardFieldNormalProps> = ({
  taskName,
  isPriority,
  isDone,
  checkTask,
  priorityTask,
  handleClickOpen,
}) => {
  return (
    <Box sx={{ height: "50%", margin: "1em" }}>
      <Card variant="outlined" className="Card">
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
                right: ".2em",
                color: isPriority ? "#ffcf40" : "",
              }}
              onClick={priorityTask}
            />
            <CheckCircleOutlineRounded
              className="check"
              sx={{ position: "absolute", bottom: ".2em", left: ".1em" }}
              onClick={checkTask}
            />
            <MoreHoriz
              className="options"
              sx={{ position: "absolute", bottom: ".2em", right: ".2em" }}
              onClick={handleClickOpen}
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

type Task = {
  id: number;
  name: string;
  isDone: boolean;
  isPriority: boolean;
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
  const [openId, setOpen] = useState(-1);
  const [selectedValue, setSelectedValue] = useState(options[1]);

  useEffect(() => {
    console.log("UpdatedTasks", tasks);
  }, [tasks]);

  function handleClick() {
    forceUpdate();
  }

  const handleCklickOpen = (id: number) => {
    setOpen(id);
  };

  const handleClose = (value: string) => {
    setOpen(-1);
    setSelectedValue(value);
  };

  function deleteTask() {
    let newTasks = tasks.filter((task) => task.id !== openId);
    setTasks(newTasks);
    console.log("delete");
  }

  function addFile() {
    console.log("File added");
  }

  function addDate() {
    console.log("Date added");
  }

  function addDiscription() {
    console.log("discription added");
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
      console.log("added", tasks);
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

  function RenderTask(task: Task) {
    return (
      <CardfieldNormal
        taskName={task.name}
        isDone={task.isDone}
        isPriority={task.isPriority}
        checkTask={() => checkTask(task.id)}
        priorityTask={() => priorityTask(task.id)}
        handleClickOpen={() => handleCklickOpen(task.id)}
      />
    );
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
                  {RenderTask(task)}
                </Grid>
              ) : null,
            )}
          </Grid>
          <Grid container spacing={2}>
            {tasks.map((task) =>
              !task.isPriority && !task.isDone ? (
                <Grid item xs={12} md={4} key={task.id}>
                  {RenderTask(task)}
                </Grid>
              ) : null,
            )}
          </Grid>
          <Grid container spacing={2}>
            {tasks.map((task) =>
              task.isDone ? (
                <Grid item xs={12} md={4} key={task.id}>
                  {RenderTask(task)}
                </Grid>
              ) : null,
            )}
          </Grid>
          <SimpleDialog
            selectedValue={selectedValue}
            open={openId !== -1}
            onClose={handleClose}
            deleteTask={() => deleteTask()}
            addDate={addDate}
            addDiscription={addDiscription}
            addFile={addFile}
          />
        </main>
      </div>
    </div>
  );
}

import { useEffect, useReducer, useState } from "react";
import "./App.css";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { mainColor } from "./colors";
import { deepOrange } from "@mui/material/colors";
import { CardfieldNormal } from "./Cardfield";
import { SimpleDialog, options } from "./Dialog";
import { Inputfield, InputfieldForInformation } from "./Inputfield";

//Query talk to backend

type Task = {
  id: number;
  name: string;
  isDone: boolean;
  isPriority: boolean;
  information: string;
};

export default function App() {
  let [tasks, setTasks] = useState([
    {
      id: 0,
      name: "apfel kaufen",
      isDone: false,
      isPriority: false,
      information: "",
    },
  ]);
  let currentId = tasks.length;

  const [textInputValue, setTextInputValue] = useState<string>("");
  const [textInputError, setTextInputError] = useState<boolean>(false);
  const handleChange = (e: any) => setTextInputValue(e.target.value);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [openId, setOpen] = useState(-1);
  const [showInformationInputforTaskId, setShowInformationInputforTaskId] =
    useState(-1);
  const [selectedValue, setSelectedValue] = useState(options[1]);
  const [textInputValueInformation, setTextInputValueInformation] =
    useState<string>("");
  const handleChangeInformation = (e: any) =>
    setTextInputValueInformation(e.target.value);
  useEffect(() => {
    console.log("UpdatedTasks", tasks);
  }, [tasks]);

  function handleClick() {
    forceUpdate();
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  const handleKeyDownInformation = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      addInformation();
      let s = "close";
      discriptionClose(s);
    }
  };

  const handleCklickOpen = (id: number) => {
    setOpen(id);
  };

  const handleClose = (value: string) => {
    setOpen(-1);
    setSelectedValue(value);
  };

  function discriptionOpen(openId: number) {
    setShowInformationInputforTaskId(openId);
    console.log("discription open");
  }

  const discriptionClose = (value: string) => {
    setShowInformationInputforTaskId(-1);
    setSelectedValue(value);
  };

  function addFile() {
    console.log("File added");
  }

  function addDate() {
    console.log("Date added");
  }

  function addInformation() {
    tasks.forEach((task) => {
      if (task.id === showInformationInputforTaskId) {
        task.information = textInputValueInformation;
      }
    });
    setTextInputValueInformation("");
    console.log("information added");
  }

  function deleteTask() {
    let newTasks = tasks.filter((task) => task.id !== openId);
    setTasks(newTasks);
    console.log("delete");
  }

  const addTask = () => {
    const newtask = {
      id: currentId++,
      name: textInputValue,
      isDone: false,
      isPriority: false,
      information: "",
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
        informationInput={task.information}
      />
    );
  }

  return (
    <Box className="App">
      <Box className="Container">
        <header>
          <Typography variant="h3" sx={{ color: mainColor }}>
            Aron's ToDo
          </Typography>
          <Box className="Profile">
            <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
            <p style={{ margin: "0" }}>Profile</p>
          </Box>
        </header>
        <hr className="seperateLine" />
        <main>
          <Box className="Inputfield">
            <Inputfield
              textInputError={textInputError}
              textInputValue={textInputValue}
              handleChange={handleChange}
              addTask={addTask}
              handleKeyDown={handleKeyDown}
            />
          </Box>
          <Grid container spacing={2}>
            {tasks.map((task) =>
              task.isPriority ? (
                <Grid item xs={12} md={4} key={task.id}>
                  <RenderTask {...task} />
                </Grid>
              ) : null,
            )}
          </Grid>
          <Grid container spacing={2}>
            {tasks.map((task) =>
              !task.isPriority && !task.isDone ? (
                <Grid item xs={12} md={4} key={task.id}>
                  <RenderTask {...task} />
                </Grid>
              ) : null,
            )}
          </Grid>
          <Grid container spacing={2}>
            {tasks.map((task) =>
              task.isDone ? (
                <Grid item xs={12} md={4} key={task.id}>
                  <RenderTask {...task} />
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
            discriptionOpen={() => discriptionOpen(openId)}
            addFile={addFile}
          />
          <InputfieldForInformation
            selectedValue={selectedValue}
            open={showInformationInputforTaskId !== -1}
            onClose={discriptionClose}
            addInformation={addInformation}
            textInputValueInformation={textInputValueInformation}
            handleKeyDown={handleKeyDownInformation}
            handleChange={handleChangeInformation}
          />
        </main>
      </Box>
    </Box>
  );
}

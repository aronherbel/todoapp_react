import { useEffect, useState } from "react";
import "./App.css";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { mainColor } from "./colors";
import { deepOrange } from "@mui/material/colors";
import { CardfieldNormal } from "./Cardfield";
import { SimpleDialog, options, selectedDate } from "./Dialog";
import { Inputfield, InputfieldForInformation } from "./Inputfield";
import { Task } from "@mui/icons-material";
import ProfileDialog, { optionsProfileDialog } from "./ProfileDialog";

// Query talk to backend

const uri: string = "https://localhost:7140/todoitems";

type Task = {
  id: number;
  name: string;
  isDone: boolean;
  isPriority: boolean;
  information: string;
  date: string;
};

export default function App() {
  let [tasks, setTasks] = useState([
    {
      id: -1,
      name: "",
      isDone: false,
      isPriority: false,
      information: "noInformation",
      date: "nodate",
    },
  ]);

  const [textInputValue, setTextInputValue] = useState<string>("");
  const [textInputError, setTextInputError] = useState<boolean>(false);
  const handleChange = (e: any) => setTextInputValue(e.target.value);
  const [openId, setOpen] = useState(-1);
  const [showInformationInputforTaskId, setShowInformationInputforTaskId] =
    useState(-1);
  const [selectedValue, setSelectedValue] = useState(options[1]);
  const [textInputValueInformation, setTextInputValueInformation] =
    useState<string>("");
  const [selectedValueProfileDialog, setSelectedValueProfileDialog] = useState(optionsProfileDialog[1]);  
  const [openProfileDialogId, setOpenProfileDialogId] = useState<boolean>(false)
    
  const handleChangeInformation = (e: any) =>
    setTextInputValueInformation(e.target.value);

  useEffect(() => {
    console.log("UpdatedTasks", tasks);
  }, [tasks]);

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    try {
      const response = await fetch(uri);

      if (!response.ok) {
        throw new Error("die Anfrage war nicht erfolgreich");
      }

      const data = await response.json();
      console.log("data is fetched", data);
      const tasksSort = data.sort(compareDates);
      console.log("sorted", tasksSort);
      setTasks(tasksSort)
    } catch (error) {
      console.error("Fehler bei abrufen der Daten", error);
    }
  }

  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  const handleKeyDownInformation = (
    id: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      addInformation(id);
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

  const handleCklickOpenProfileDialog = () => {
    setOpenProfileDialogId(true);
  };

  const handleCloseProfileDialog = (value: string) => {
    setOpenProfileDialogId(false);
    setSelectedValueProfileDialog(value);
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

 

  async function addInformation(id: number) {
    if (id = showInformationInputforTaskId) {
      let taskIndex = tasks.findIndex((task) => task.id === id);

      if (taskIndex !== -1) {
        const newTasks = [...tasks];
        const taskToAddInformation = newTasks.at(taskIndex)!;
        newTasks[taskIndex] = {
          ...taskToAddInformation,
          information: textInputValueInformation,
        };
        try {
          const response = await fetch(`${uri}/${id}`, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newTasks[taskIndex]),
          });

          if (!response.ok) {
            throw new Error("Unable to add Information");
          }

          await fetchData();
        } catch (error) {
          console.error("Check task is not available", error);
        }
      }
      setTextInputValueInformation("");
      console.log("information added");
    }
  }

  async function priorityTask(_id: number) {
    let taskIndex = tasks.findIndex((task) => task.id === _id);
    if (taskIndex !== -1) {
      const newTasks = [...tasks];
      const taskToPriority = newTasks.at(taskIndex)!;
      newTasks[taskIndex] = {
        ...taskToPriority,
        isPriority: !taskToPriority.isPriority,
        isDone: false,
      };
      setTasks(newTasks);
      try {
        const response = await fetch(`${uri}/${_id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTasks[taskIndex]),
        });

        if (!response.ok) {
          throw new Error("Unable to check");
        }

        await fetchData();
      } catch (error) {
        console.error("Check task is not available", error);
      }
    }
  }

  async function addTask() {
    const newtask = {
      name: textInputValue,
      isDone: false,
      isPriority: false,
      information: "",
      date: "",
    };

    if (textInputValue === "") {
      setTextInputError(true);
    } else {
      try {
        const response = await fetch(uri, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newtask),
        });

        if (!response.ok) {
          throw new Error("die Anfrage war nicht erfolgreich");
        }

        await fetchData();
      } catch (error) {
        console.error("add task failed", error);
      }
      setTextInputError(false);
      console.log("added", tasks);
      setTextInputValue("");
    }
    console.log(tasks);
  }

  function deleteTask() {
    fetch(`${uri}/${openId}`, {
      method: "DELETE",
    })
      .then(async () => {
        await fetchData();
      })
      .catch((error) => console.error("Unable to delete item", error));

    console.log("delete");
  }

  async function checkTask(_id: number) {
    let taskIndex = tasks.findIndex((task) => task.id === _id);
    if (taskIndex !== -1) {
      const newTasks = [...tasks];
      const taskToDone = newTasks.at(taskIndex)!;
      newTasks[taskIndex] = {
        ...taskToDone,
        isPriority: false,
        isDone: !taskToDone.isDone,
      };
      try {
        const response = await fetch(`${uri}/${_id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTasks[taskIndex]),
        });

        if (!response.ok) {
          throw new Error("Unable to check");
        }

        await fetchData();
      } catch (error) {
        console.error("Check task is not available", error);
      }
      //setTasks(newTasks);
    }
  }


  async function addDate(id: number, selectedDate: string) {
      let taskIndex = tasks.findIndex((task) => task.id === id);

      if (taskIndex !== -1) {
        const newTasks = [...tasks];
        const taskToAddDate = newTasks.at(taskIndex)!;
        newTasks[taskIndex] = {
          ...taskToAddDate,
          date : selectedDate,
        };
        try {
          const response = await fetch(`${uri}/${id}`, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newTasks[taskIndex]),
          });

          if (!response.ok) {
            throw new Error("Unable to add Information");
          }

          await fetchData();
        } catch (error) {
          console.error("Check task is not available", error);
        }
      }
      console.log("dateAdded ", selectedDate, id )
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
        date={task.date}           
        />
    );
  }


 function compareDates(a: any, b: any) {
  if(a['date'] === b['date']) {
    return 0;
  }
  else {
    return (a['date'] < b['date']) ? -1 : 1;
  }
 }

 


  return (
    <Box className="App">
      <Box className="Container">
        <header style={{display: "flex", justifyContent: "center"}}>
          <Typography variant="h3" sx={{ color: mainColor }}>
            Aron's ToDo
          </Typography>
          <Box className="Profile" sx={{marginTop: ".1em"}} onClick={()=> handleCklickOpenProfileDialog()}>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
            <p style={{ margin: "0" }}>Profile</p>
          </Box>
        </header>
        <hr className="seperateLine" />
        <main style={{marginTop:"2em"}}>
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
            {tasks.length > 0
              ? tasks.map((task) =>
                  task.isPriority ? (
                    <Grid item xs={12} md={4} key={task.id}>
                      <RenderTask {...task} />
                    </Grid>
                  ) : null,
                )
              : null}
          </Grid>
          <Grid container spacing={2}>
            {tasks.length > 0
              ? tasks.map((task) =>
                  !task.isPriority && !task.isDone ? (
                    <Grid item xs={12} md={4} key={task.id}>
                      <RenderTask {...task} />
                    </Grid>
                  ) : null,
                )
              : null}
          </Grid>
          <Grid container spacing={2}>
            {tasks.length > 0
              ? tasks.map((task) =>
                  task.isDone ? (
                    <Grid item xs={12} md={4} key={task.id}>
                      <RenderTask {...task} />
                    </Grid>
                  ) : null,
                )
              : null}
          </Grid>
          <SimpleDialog
            selectedValue={selectedValue}
            open={openId !== -1}
            onClose={handleClose}
            deleteTask={() => deleteTask()}
            addDate={() => addDate(openId, selectedDate)}
            discriptionOpen={() => discriptionOpen(openId)}
            addFile={addFile}          
            />
          <InputfieldForInformation
            selectedValue={selectedValue}
            open={showInformationInputforTaskId !== -1}
            onClose={discriptionClose}
            addInformation={() => addInformation(showInformationInputforTaskId)}
            textInputValueInformation={textInputValueInformation}
            handleKeyDown={(e) => handleKeyDownInformation(openId, e)}
            handleChange={handleChangeInformation}
          />
          <ProfileDialog 
            openProfileDialog={openProfileDialogId !== false} 
            selectedValueProfileDialog={selectedValueProfileDialog} 
            setSelectedValueProfileDialog={setSelectedValueProfileDialog}
            onClose={handleCloseProfileDialog}
            handleOpen={() => handleCklickOpenProfileDialog()}
          />
        </main>
      </Box>
    </Box>
  );
}

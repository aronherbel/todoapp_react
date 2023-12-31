import { KeyboardEvent, useEffect, useState } from "react";
import "./App.css";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { mainColor } from "./colors";
import { deepOrange } from "@mui/material/colors";
import { CardfieldNormal } from "./Cardfield";
import { SimpleDialog, options, selectedDate } from "./Dialog";
import { Inputfield, InputfieldForChangeName, InputfieldForChangePassword, InputfieldForInformation } from "./Inputfield";
import { Task } from "@mui/icons-material";
import ProfileDialog, { optionsProfileDialog } from "./ProfileDialog";
import { debug, profile } from "console";
import { Md5 } from "ts-md5";

// Query talk to backend

const uri: string = "https://localhost:7140/todoitems";
const userUri: string = "https://localhost:7140/users"

type Task = {
  id: number;
  name: string;
  isDone: boolean;
  isPriority: boolean;
  information: string;
  date: string;
};

type User = {
  userId: number;
  userName: string;
  Password: string;
}

type LoginProps = {
  setLogedIn: (bool: boolean) => void;
  setCurrentUser:(userName: string) => void;
  setPasswordForCurrentUser:(userPassword: string) => void;
  currentUser: string;
  passwordForCurrentUser: string;
};

export default function App({setLogedIn, setPasswordForCurrentUser, setCurrentUser, currentUser, passwordForCurrentUser}: LoginProps) {
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
  let [users, setUsers] = useState([
    {
      userId: -1,
      userName: "",
      Password: "" 
    }
  ])

  const [textInputValue, setTextInputValue] = useState<string>("");
  const [textInputError, setTextInputError] = useState<boolean>(false);
  const handleChange = (e: any) => setTextInputValue(e.target.value);
  const [openId, setOpen] = useState(-1);
  const [showInformationInputforTaskId, setShowInformationInputforTaskId] =
    useState(-1);
  const [showChangeNameInputfield, setShowChangeNameInputfield] =
    useState(false);
  const [showChangePasswordInputfield, setShowChangePasswordInputfield] =
    useState(false);
  const [selectedValue, setSelectedValue] = useState(options[1]);
  const [textInputValueInformation, setTextInputValueInformation] =
    useState<string>("");
  const [textInputValueForChangeName, setTextInputValueForChangeName] =
    useState<string>(currentUser);
  const [textInputValueForChangePassword, setTextInputValueForChangePassword] =
    useState<string>("");
  const [selectedValueProfileDialog, setSelectedValueProfileDialog] = useState(optionsProfileDialog[1]);  
  const [openProfileDialogId, setOpenProfileDialogId] = useState<boolean>(false)
  const handleChangeInformation = (e: any) =>
    setTextInputValueInformation(e.target.value);
  const handleChangeName = (e: any) =>
    setTextInputValueForChangeName(e.target.value);
  const handleChangePassword = (e: any) =>
    setTextInputValueForChangePassword(e.target.value);
  
 

  useEffect(() => {
    console.log("UpdatedTasks", tasks);
  }, [tasks]);

  useEffect(() => {
    fetchData();
    fetchDataForUsers();
  }, [])

  useEffect(() => {
    console.log("currentUserName changed: ",currentUser);
  }, [currentUser]);

  


  async function fetchDataForUsers() {
    try {
      const response = await fetch(userUri);

      if (!response.ok) {
        throw new Error("die Anfrage war nicht erfolgreich");
      }

      const data = await response.json();
      console.log("Users are fetched", data);
      setUsers(data)
    } catch (error) {
      console.error("Fehler bei abrufen der Daten", error);
    }
  }


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
  const handleCloseChangeName = (value: string) => {
    setShowChangeNameInputfield(false);
    setSelectedValue(value);
    setTextInputValueForChangeName("");
  };

  const handleCloseChangePassword = (value: string) => {
    setShowChangePasswordInputfield(false);
    setSelectedValue(value);
    setTextInputValueForChangePassword("");
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


  function changeUserName(){
    setShowChangeNameInputfield(true);
    }
  
  function changeUserPassword(){
    setShowChangePasswordInputfield(true);
    }  

  function addNewUserName(){
    console.log("addNewUserName wurde aufgerufen")
    updateUserName();
  }  

  function addNewUserPassword(){
    console.log("addNewUserPassword wurde aufgerufen")
    updateUserPassword();
  }  

  async function updateUserPassword(){
   
    console.log("update userpassword wurde aufgerufen ")
    const hashedPassword: string = Md5.hashStr(textInputValueForChangePassword);
    let userIndex = users.findIndex((user) => user.userName === currentUser)
    userIndex = userIndex;
    if(userIndex !== -1){
      const newUsers = [...users];
        const UserToChangePassword = newUsers.at(userIndex)!;
        newUsers[userIndex] = {
          ...UserToChangePassword,
          userName : currentUser,
          Password: hashedPassword
        };
        setPasswordForCurrentUser(hashedPassword)
        try {
          const response = await fetch(`${userUri}/${userIndex}`, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUsers[userIndex]),
          });

          if (!response.ok) {
            throw new Error("Unable to update user");
          }

          await fetchDataForUsers();
        } catch (error) {
          console.error("update user not available", error);
        }
    }
  }
   
  async function updateUserName(){
    
    console.log("update username wurde aufgerufen ")
    let userIndex = users.findIndex((user) => user.userName === currentUser)
    userIndex = userIndex;
    if(userIndex !== -1){
      const newUsers = [...users];
        const UserToChangeName = newUsers.at(userIndex)!;
        newUsers[userIndex] = {
          ...UserToChangeName,
          userName : textInputValueForChangeName,
          Password: passwordForCurrentUser
        };
        setCurrentUser(textInputValueForChangeName)
        try {
          const response = await fetch(`${userUri}/${userIndex}`, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUsers[userIndex]),
          });

          if (!response.ok) {
            throw new Error("Unable to update user");
          }

          await fetchDataForUsers();
        } catch (error) {
          console.error("update user not available", error);
        }
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

 let profileLetter = currentUser[0];


  return (
    <Box className="App">
      <Box className="Container">
        <header style={{display: "flex", justifyContent: "center"}}>
          <Typography variant="h3" sx={{ color: mainColor }}>
            Aron's ToDo
          </Typography>
          <Box className="Profile" sx={{marginTop: ".1em"}} onClick={()=> handleCklickOpenProfileDialog()}>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>{profileLetter}</Avatar>
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
          <Box sx={{position:"absolute", top:"3.8em", right:"4em"}}>
          <ProfileDialog 
              openProfileDialog={openProfileDialogId !== false}
              selectedValueProfileDialog={selectedValueProfileDialog}
              setSelectedValueProfileDialog={setSelectedValueProfileDialog}
              onClose={handleCloseProfileDialog}
              handleOpen={() => handleCklickOpenProfileDialog()}
              setLogedIn={setLogedIn}
              changeUserName={changeUserName} 
              changeUserPassword={changeUserPassword}        
            />
          <InputfieldForChangeName 
            open={showChangeNameInputfield !== false} 
            selectedValue={selectedValue} 
            textInputValueForChangeName={textInputValueForChangeName} 
            onClose={handleCloseChangeName} 
            addNewUserName={addNewUserName} 
            handleChange={handleChangeName}          
          />
          <InputfieldForChangePassword 
            open={showChangePasswordInputfield !== false} 
            selectedValue={selectedValue} 
            textInputValueForChangePassword={textInputValueForChangePassword} 
            onClose={handleCloseChangePassword} 
            addNewUserPassword={addNewUserPassword} 
            handleChange={handleChangePassword}          
          />
          </Box>
        </main>
      </Box>
    </Box>
  );
}

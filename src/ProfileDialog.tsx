import { Add, Edit, FileCopy, Logout, Password, Person, Print, Save, Share } from "@mui/icons-material";
import { Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, Typography, Button, Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import React from "react";



export const optionsProfileDialog = ["change Username", "change Avatar", "Log out"]

export interface ProfileDialogProps {
  openProfileDialog: boolean;
  selectedValueProfileDialog: string;
  setSelectedValueProfileDialog: (value: string) => void;
  handleOpen: () => void;
  onClose: (value: string) => void;
  changeUserName:() => void;
  changeUserPassword:() => void;
}

type LoginProps = {
  setLogedIn: (bool: boolean) => void;
};

export default function ProfileDialog(props: ProfileDialogProps & LoginProps) {
  const { onClose, selectedValueProfileDialog, openProfileDialog, setLogedIn, changeUserName, changeUserPassword } = props;

  
  const handleClose = () => {
    onClose(selectedValueProfileDialog);
  };

  
  const handleListItemClick = (value: string) => {
    onClose(value);
   
    if(value === "Change Username"){
      changeUserName();
    }
    if(value === "Change Password"){
      changeUserPassword();
    }
    if (value === "Log out"){
      setLogedIn(false);
    }
  };

 
  return (
    <Dialog onClose={handleClose} open={openProfileDialog}>
      <DialogTitle>Profile</DialogTitle>
      <List sx={{ pt: 0 }}>

          <ListItem disableGutters >
            <ListItemButton onClick={() => handleListItemClick("Change Username")}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <Edit/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={"Change Username"} />
            </ListItemButton>
          </ListItem>

          <ListItem disableGutters >
            <ListItemButton onClick={() => handleListItemClick("Change Password")}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: green[100], color: green[600] }}>
                  <Password />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={"Change Password"} />
            </ListItemButton>
          </ListItem>
        
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick('Log out')}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: red[100], color: red[600] }}>
                <Logout />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}


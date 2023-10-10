import { Add, FileCopy, Person, Print, Save, Share } from "@mui/icons-material";
import { Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, Typography, Button, Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { blue } from "@mui/material/colors";
import React from "react";


const actions = [
  { icon: <FileCopy />, name: 'Copy' },
  { icon: <Save />, name: 'Save' },
  { icon: <Print />, name: 'Print' },
  { icon: <Share />, name: 'Share' },
];

export const optionsProfileDialog = ["option1", "option2", "option3"]

export interface ProfileDialogProps {
  openProfileDialog: boolean;
  selectedValueProfileDialog: string;
  setSelectedValueProfileDialog: (value: string) => void;
  handleOpen: () => void;
  onClose: (value: string) => void;
}

export default function ProfileDialog(props: ProfileDialogProps) {
  const { onClose, selectedValueProfileDialog, openProfileDialog, handleOpen } = props;

  
  const handleClose = () => {
    onClose(selectedValueProfileDialog);
  };

  

 
  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial controlled open example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={openProfileDialog}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </Box>
/*
    <Dialog onClose={handleClose} open={openProfileDialog}>
      <DialogTitle>Profile</DialogTitle>
      <List sx={{ pt: 0 }}>

          <ListItem disableGutters >
            <ListItemButton onClick={() => handleListItemClick("Edit Profile")}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={"Salo"} />
            </ListItemButton>
          </ListItem>
        
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick('Log out')}
          >
            <ListItemAvatar>
              <Avatar>
                <Add />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>*/
  );
}


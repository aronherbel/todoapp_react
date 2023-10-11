import { Add, AddCircleOutline } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  TextField,
} from "@mui/material";
import { FC } from "react";


type InputfieldProps = {
  textInputError: boolean;
  textInputValue: string;
  handleChange: any;
  addTask: () => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const Inputfield: FC<InputfieldProps> = ({
  textInputError,
  textInputValue,
  handleChange,
  addTask,
  handleKeyDown,
}) => {
  return (
    <Box sx={{ display: "flex", position: "relative", marginBottom: "1em" }}>
      <TextField
        error={textInputError}
        value={textInputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="new task"
        fullWidth
        label="enter your task.."
        id="inputTask"
        sx={{marginBottom:"2em", backgroundColor:"white"}}
      />
      <AddCircleOutline
        className="AddBtn"
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
    </Box>
  );
};

type InputfieldForInformationProps = {
  open: boolean;
  selectedValue: string;
  textInputValueInformation: string;
  onClose: (value: string) => void;
  addInformation: () => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleChange: any;
};

export const InputfieldForInformation: FC<InputfieldForInformationProps> = ({
  open,
  selectedValue,
  textInputValueInformation,
  handleChange,
  handleKeyDown,
  onClose,
  addInformation,
}) => {
  const discriptionClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  const combined = () => {
    addInformation();
    handleListItemClick("addInformation");
  };
  return (
    <Dialog onClose={discriptionClose} open={open} fullWidth maxWidth="sm">
  <DialogTitle>Information</DialogTitle>
  <List sx={{ pt: 0 }}>
    <ListItem disableGutters>
      <Box sx={{ width: "100%" }}>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar sx={{ backgroundColor: "#007bff", color: "#fff" }}>
              <Add onClick={combined} />
            </Avatar>
          </ListItemAvatar>
          <TextField
            value={textInputValueInformation}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter new information"
            fullWidth
            variant="outlined"
            label="Enter your information.."
            id="inputInformation"
            sx={{ marginBottom: "1em" }}
          />
        </ListItemButton>
      </Box>
    </ListItem>
  </List>
  <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
    <Button onClick={discriptionClose} variant="outlined">
      Close
    </Button>
  </Box>
</Dialog>

  );
};



type InputfieldForChangeNameProps = {
  open: boolean;
  selectedValue: string;
  textInputValueForChangeName: string;
  onClose: (value: string) => void;
  addNewUserName: () => void;
  handleChange: any;
};

export const InputfieldForChangeName: FC<InputfieldForChangeNameProps> = ({
  open,
  selectedValue,
  textInputValueForChangeName,
  handleChange,
  onClose,
  addNewUserName,
}) => {
  const ChangeNameClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  const combined = () => {
    addNewUserName();
    handleListItemClick("new Name");
  };
  return (
    <Dialog onClose={ChangeNameClose} open={open} fullWidth maxWidth="sm">
  <DialogTitle>Change Username</DialogTitle>
  <List sx={{ pt: 0 }}>
    <ListItem disableGutters>
      <Box sx={{ width: "100%" }}>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar sx={{ backgroundColor: "#007bff", color: "#fff" }}>
              <Add onClick={combined} />
            </Avatar>
          </ListItemAvatar>
          <TextField
            value={textInputValueForChangeName}
            onChange={handleChange}
            placeholder="Enter new username"
            fullWidth
            variant="outlined"
            label="Enter new username"
            id="inputChangeName"
            sx={{ marginBottom: "1em" }}
          />
        </ListItemButton>
      </Box>
    </ListItem>
  </List>
  <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
    <Button onClick={ChangeNameClose} variant="outlined">
      Close
    </Button>
  </Box>
</Dialog>

  );
};


type InputfieldForChangePasswordProps = {
  open: boolean;
  selectedValue: string;
  textInputValueForChangePassword: string;
  onClose: (value: string) => void;
  addNewUserPassword: () => void;
  handleChange: any;
};

export const InputfieldForChangePassword: FC<InputfieldForChangePasswordProps> = ({
  open,
  selectedValue,
  textInputValueForChangePassword,
  handleChange,
  onClose,
  addNewUserPassword,
}) => {
  const ChangePasswordClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  const combined = () => {
    addNewUserPassword();
    handleListItemClick("new Name");
  };
  return (
    <Dialog onClose={ChangePasswordClose} open={open} fullWidth maxWidth="sm">
  <DialogTitle>Change Password</DialogTitle>
  <List sx={{ pt: 0 }}>
    <ListItem disableGutters>
      <Box sx={{ width: "100%" }}>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar sx={{ backgroundColor: "#007bff", color: "#fff" }}>
              <Add onClick={combined} />
            </Avatar>
          </ListItemAvatar>
          <TextField
            value={textInputValueForChangePassword}
            onChange={handleChange}
            placeholder="Enter new password"
            fullWidth
            variant="outlined"
            label="Enter new password"
            id="inputChangePassword"
            sx={{ marginBottom: "1em" }}
          />
        </ListItemButton>
      </Box>
    </ListItem>
  </List>
  <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
    <Button onClick={ChangePasswordClose} variant="outlined">
      Close
    </Button>
  </Box>
</Dialog>

  );
};
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
        sx={{marginBottom:"2em"}}
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
    <Dialog onClose={discriptionClose} open={open}>
      <DialogTitle>Information</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem disableGutters>
          <Box sx={{ width: "100%" }}>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar>
                  <Add onClick={combined} />
                </Avatar>
              </ListItemAvatar>
              <TextField
                value={textInputValueInformation}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="new enter"
                fullWidth
                label="enter your task.."
                id="inputTask"
              />
            </ListItemButton>
          </Box>
        </ListItem>
      </List>
    </Dialog>
  );
};

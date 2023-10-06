import {
  Delete,
  Add,
  CalendarViewMonthTwoTone,
  DocumentScannerTwoTone,
} from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  Box,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { red, blue, orange, green } from "@mui/material/colors";
import DatePickerCalender from "./Calender";
import { Dayjs } from "dayjs";

export const options = ["deleteTask", "addDiscription", "addDate", "addFile"];

interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  deleteTask: any;
  selectedDateOutside: Dayjs;
  discriptionOpen: () => void;
  addDate: () => void;
  addFile: () => void;
}

export function SimpleDialog(props: SimpleDialogProps) {
  const {
    onClose,
    selectedValue,
    open,
    deleteTask,
    addFile,
    addDate,
    discriptionOpen,
    selectedDateOutside,
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
          <Box onClick={deleteTask} sx={{ width: "100%" }}>
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
          <Box onClick={discriptionOpen} sx={{ width: "100%" }}>
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
          <Box onClick={addDate} sx={{ width: "100%" }}>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: orange[100], color: orange[600] }}>
                  <CalendarViewMonthTwoTone />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>
                <DatePickerCalender
                />
              </ListItemText>
            </ListItemButton>
          </Box>
        </ListItem>

        <ListItem disableGutters>
          <Box onClick={addFile} sx={{ width: "100%" }}>
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

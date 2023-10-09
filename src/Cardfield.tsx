import {
  StarBorderRounded,
  CheckCircleOutlineRounded,
  MoreHoriz,
} from "@mui/icons-material";
import { Box, Card, CardContent, Typography, CardActions } from "@mui/material";
import { FC } from "react";
import { BasicAccordion } from "./Accordion";
import { secondaryColor } from "./colors";
import dayjs, { Dayjs } from "dayjs";

type CardFieldNormalProps = {
  taskName: string;
  isPriority: boolean;
  isDone: boolean;
  informationInput: string;
  date: string;
  checkTask: () => void;
  priorityTask: () => void;
  handleClickOpen: () => void;
};

export const CardfieldNormal: FC<CardFieldNormalProps> = ({
  taskName,
  isPriority,
  isDone,
  informationInput,
  date,
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
            {isDone ?  "" : date}
          </Typography>
          <Typography variant="h5" component="div">
            {taskName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {isDone ? "Done" : ""}
            {isPriority ? "Important" : ""}
            {!isDone && !isPriority ? "Task" : ""}
          </Typography>
          <Typography variant="body2">
            <BasicAccordion information={ !isDone ? informationInput : ""} />
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

import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import { FC, useState } from "react";

export const BasicAccordion: FC<{
  information: string;
}> = ({ information }) => {
  if (!information) {
    return null;
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>more</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{information}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

import { useRef, useState } from "react";
// UI lib
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
// UI custom
import MenuPopover from "../../components/Popover";
import Page from "../../components/Page";
// logic lib
import { Formik } from "formik";
import * as Yup from "yup";
// logic custom
import { upload, ping } from "../../api/user";
import Filter from "../../components/Filter";

//#region CSS

//#endregion

//----------------------------
const Test = () => {
  return (
    <Page title="TEST | TuanVQ">
      <Typography>TEST</Typography>
    </Page>
  );
};

export default Test;

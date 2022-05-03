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
  const [text, setText] = useState("");
  const [adult, setAdult] = useState(0);
  const [kid, setKid] = useState(0);
  const [baby, setBaby] = useState(0);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [show, setShow] = useState(false);
  let count = 0;
  return (
    <Page title="TEST | TuanVQ">
      <Formik
        initialValues={{
          images: "",
        }}
        validationSchema={Yup.object().shape({})}
        onSubmit={(values, { setSubmitting }) => {
          const formData = new FormData();
          for (let i = 0; i < values.images.length; i++) {
            formData.append("images", values.images[i]);
          }
          upload(formData)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
          setSubmitting(false);
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
          setFieldValue,
        }) => (
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            style={{ paddingTop: 50 }}
          >
            <Button variant="outlined" fullWidth component="label">
              Upload File
              <input
                type="file"
                hidden
                name="images"
                multiple
                accept="image/*"
                onChange={(e) => {
                  setFieldValue("images", e.target.files);
                }}
              />
            </Button>
            <Button
              sx={{ marginTop: 2, height: 50 }}
              fullWidth
              type="submit"
              variant="contained"
              disabled={isSubmitting ? true : false}
            >
              {isSubmitting ? (
                <CircularProgress style={{ color: "#252525" }} />
              ) : (
                "UPLOAD"
              )}
            </Button>
          </form>
        )}
      </Formik>
      <Button onClick={() => ping()}>PING</Button>
      <br />

      <TextField
        style={{ width: 500 }}
        ref={anchorRef}
        value={text}
        fullWidth
        name="people"
        label="Số lượng khách"
        focused={open}
        type="text"
        variant="outlined"
        onClick={() => setOpen(true)}
      />
      <MenuPopover
        open={open}
        onClose={() => {
          setText(`Người lớn: ${adult} - Trẻ em: ${kid} - Em bé: ${baby}`);
          setOpen(false);
        }}
        anchorEl={anchorRef.current}
      >
        <Box style={{ padding: 10, width: 270 }}>
          <Stack
            marginBottom={1}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>Người lớn</Typography>
            <Button
              variant="contained"
              onClick={() => {
                if (adult > 0) setAdult(adult - 1);
              }}
            >
              -
            </Button>
            <Typography>{adult}</Typography>
            <Button variant="contained" onClick={() => setAdult(adult + 1)}>
              +
            </Button>
          </Stack>
          <Stack
            marginBottom={1}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>Trẻ em</Typography>
            <Button
              variant="contained"
              onClick={() => {
                if (kid > 0) setKid(kid - 1);
              }}
            >
              -
            </Button>
            <Typography>{kid}</Typography>
            <Button variant="contained" onClick={() => setKid(kid + 1)}>
              +
            </Button>
          </Stack>
          <Stack
            marginBottom={1}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>Em bé</Typography>
            <Button
              variant="contained"
              onClick={() => {
                if (baby > 0) setBaby(baby - 1);
              }}
            >
              -
            </Button>
            <Typography>{baby}</Typography>
            <Button variant="contained" onClick={() => setBaby(baby + 1)}>
              +
            </Button>
          </Stack>
        </Box>
      </MenuPopover>
      <Filter />
    </Page>
  );
};

export default Test;

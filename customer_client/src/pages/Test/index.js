// UI lib
import { Button, CircularProgress } from "@mui/material";
// UI custom
import Page from "../../components/Page";
// logic lib
import { Formik } from "formik";
import * as Yup from "yup";
// logic custom
import { upload } from "../../api/user";

//#region CSS

//#endregion

//----------------------------
const Test = () => {
  return (
    <Page>
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
    </Page>
  );
};

export default Test;

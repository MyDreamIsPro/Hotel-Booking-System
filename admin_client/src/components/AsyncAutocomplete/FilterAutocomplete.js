import { useState, useEffect } from "react";
// UI
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
// Logic

export default function FilterAutocomplete({
  name,
  text,
  value,
  setValue,
  getData,
  parentId,
  getOptionLabel,
}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }
    getData(parentId)
      .then((res) => {
        if (active) {
          setOptions([...res.data]);
        }
      })
      .catch((err) => {
        if (active) {
          console.log(err);
        }
      });

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      name={name}
      fullWidth
      options={options}
      loading={loading}
      open={open}
      value={value}
      isOptionEqualToValue={(option, value) =>
        value._id === "" || option._id === value._id
      }
      getOptionLabel={(option) => getOptionLabel(option)}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(e, value) => {
        setValue(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          margin="normal"
          label={text}
          placeholder={text}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}

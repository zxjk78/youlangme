import { FormControl, TextField } from "@mui/material";

const FilledInput = (props) => {
  return (
    <TextField
    sx={{

        width: '60%',
        "& .MuiInputBase-root": {
            height: 40,
            bgcolor: props.bgColor,
            border: 0,
        }
    }}
    id={props.id}
    ref={props.ref}
    variant="filled"
/>
  )
}

export default FilledInput;
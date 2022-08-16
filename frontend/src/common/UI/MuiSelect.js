import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';

const MuiSelect = (props) => {
  return (
    <>
      <FormControl variant="standard" sx={{ minWidth: 120, maxWidth: 240 }}>
        <InputLabel id={props.labelId}>{props.selectName}</InputLabel>
        <Select
          color='secondary'
          labelId={props.labelId}
          id={props.id}
          defaultValue={props.value} // 이부분 defaultValue를 넣어봄 되면 땡큐고 아니면
          value={props.value}
          label={props.id}
          inputProps={{
            name: props.id,
            id: 'uncontrolled-native',
          }}
          onChange={props.onChange}
          disabled={props.disabled}
        >
          {props.optionList.map((item) => (
            <MenuItem key={item.id} value={item.id} >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default MuiSelect;

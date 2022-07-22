import { FormControl, Select, MenuItem, InputLabel, } from '@mui/material';


const MuiSelect = (props) => {

  return (
    <>
    <FormControl variant="standard" sx={{minWidth: 120, maxWidth:240}}>   
      <InputLabel id={props.labelId}>{props.selectName}</InputLabel>
        <Select
          labelId={props.labelId}
          id={props.id}
          defaultValue={''}
          value={props.value}
          label={props.id}
          inputProps={{
            name:  props.id,
            id: 'uncontrolled-native',
          }}
          onChange={props.onChange}
        >                  
          {props.optionList.map(item=>  (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>) )}
        </Select>                
    </FormControl>

    </>

  )
}

export default MuiSelect;
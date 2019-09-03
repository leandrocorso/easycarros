import React from "react";
import InputMask from "react-input-mask";
import TextField from "../../../node_modules/@material-ui/core/TextField";

const InputPlate = props => (
  <InputMask mask="99/99/9999" value={props.value} onChange={props.onChange}>
    {inputProps => <TextField {...inputProps} />}
  </InputMask>
);

export default InputPlate;

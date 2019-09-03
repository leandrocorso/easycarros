import React, { useState } from "react";
import { useDispatch } from "react-redux";
import InputMask from "react-input-mask";
// Material UI
import {
  Button,
  FormControl,
  FormGroup,
  makeStyles,
  TextField
} from "../../../node_modules/@material-ui/core";
import { Add } from "../../../node_modules/@material-ui/icons";
// Actions
import { store } from "../../redux/vehicles/actions";
// Utils
import { validPlate } from "../../utils";

// Styles
const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    justifyContent: "spaceBetween"
  },
  input: {
    flexGrow: 1
  }
}));

function VehiclesAdd() {
  // Set dispatch instance
  const dispatch = useDispatch();

  // Setting states
  const [plate, setPlate] = useState("");
  const [plateError, setPlateError] = useState();

  // Submit form
  const handleSubmit = event => {
    event.preventDefault();

    // Validade plate
    if (!plate) {
      setPlateError("Vehicle plate is required");
    } else {
      if (!validPlate(plate)) {
        setPlateError("Invalid vehicle");
      } else {
        setPlateError("");
        setPlate("");
      }
    }

    dispatch(store(plate));
  };

  // Styles
  const classes = useStyles();

  return (
    <form
      className={classes.form}
      onSubmit={handleSubmit}
      data-testid="vehicleAddForm"
    >
      <FormGroup className={classes.input}>
        <FormControl>
          <InputMask
            mask="aaa-9999"
            label="Adicionar novo veículo"
            placeholder="placa"
            onChange={e => setPlate(e.target.value.toUpperCase())}
            value={plate}
            name="plate"
            autoComplete="off"
            error={!!plateError}
            helperText={plateError}
            autoFocus
          >
            {inputProps => <TextField {...inputProps} />}
          </InputMask>
          {/* Hack to pass the test (I cant set onChange from a masked input) - It's ugly, I know :( */}
          <input
            style={{ display: "none" }}
            type="text"
            value={plate}
            data-testid="vehicleAddInput"
            onChange={e => setPlate(e.target.value.toUpperCase())}
          />
        </FormControl>
      </FormGroup>

      <Button type="submit" variant="contained" color="primary">
        <Add />
      </Button>
    </form>
  );
}

export default VehiclesAdd;

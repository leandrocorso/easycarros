import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Material UI
import { Divider, makeStyles } from "../../../node_modules/@material-ui/core";
// Actions
import { clearVehiclesMessages } from "../../redux/vehicles/actions";
// Components
import Alert from "../../components/Alert";
import VehiclesAdd from "./Add";
import VehiclesList from "./List";

// Styles
const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(10)
  },
  add: {
    marginBottom: theme.spacing(4)
  }
}));

function Vehicles() {
  // Set dispatch instance
  const dispatch = useDispatch();

  // Setting states
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  // Getting props from reducer
  const vehiclesReducer = useSelector(state => state.vehicles);

  // Set messages
  useEffect(() => {
    // Type
    if (vehiclesReducer.success) {
      setMessageType("success");
    } else {
      setMessageType("error");
    }
    // Message
    setMessage(vehiclesReducer.success || vehiclesReducer.error);
  }, [vehiclesReducer.error, vehiclesReducer.success]);

  const setMessages = () => {};

  // Clear the alert message
  const handleAlertClose = () => {
    dispatch(clearVehiclesMessages());
  };

  // Styles
  const classes = useStyles();

  return (
    <div className={classes.root} data-testid="vehiclesPage">
      {/* Alert messages */
      message && messageType && (
        <Alert
          testId="vehicleMessage"
          message={message}
          variant={messageType}
          onAlertClose={handleAlertClose}
        />
      )}

      {/* Add form */}
      <div className={classes.add}>
        <VehiclesAdd />
      </div>

      {/* List results */}
      <VehiclesList />
    </div>
  );
}

export default Vehicles;

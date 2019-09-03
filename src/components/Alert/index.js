import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// Material UI
import {
  Snackbar,
  SnackbarContent
} from "../../../node_modules/@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const Alert = props => {
  // Set state
  const [open, setOpen] = useState(false);

  useEffect(() => {
    handleOpen();
  }, [props.open]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.onAlertClose();
    setOpen(false);
  };

  // Styles

  const styles = makeStyles(theme => ({
    success: {
      backgroundColor: green[600]
    },
    error: {
      backgroundColor: theme.palette.error.dark
    },
    message: {
      display: "flex",
      alignItems: "center"
    }
  }));

  const classes = styles();

  return (
    <div data-testid={`${props.testId}-${props.variant}`}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <SnackbarContent
          className={classes[props.variant]}
          onClose={handleClose}
          message={props.message}
        />
      </Snackbar>
    </div>
  );
};

Alert.defaultProps = {
  message: "A single message",
  open: true,
  variant: "body2"
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  onAlertClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  variant: PropTypes.oneOf(["error", "success"]).isRequired
};

export default Alert;

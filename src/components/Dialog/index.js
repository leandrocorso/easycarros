import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
// Material UI
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

function CustomDialog(props) {
  // Extract props
  const { title, text, closeText, onSubmit, submitText } = props;

  // Set state
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const handleClose = () => {
    props.onClose();
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} data-testid={props.testId}>
      {title && <DialogTitle>{title}</DialogTitle>}

      <DialogContent>
        {text && <DialogContentText>{text}</DialogContentText>}
      </DialogContent>

      <DialogActions>
        {closeText && (
          <Button
            onClick={handleClose}
            color="default"
            data-testid="closeButton"
          >
            {closeText}
          </Button>
        )}

        {submitText && onSubmit && (
          <Button onClick={onSubmit} color="primary" data-testid="submitButton">
            {submitText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

CustomDialog.defaultProps = {
  closeText: "Cancelar",
  submitText: "OK",
  testId: "Dialog"
};

CustomDialog.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  closeText: PropTypes.string.isRequired,
  submitText: PropTypes.string,
  testId: PropTypes.string
};

export default CustomDialog;

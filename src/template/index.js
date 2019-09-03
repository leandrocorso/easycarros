import React, { useState } from "react";
import PropTypes from "prop-types";
import { Redirect, withRouter } from "react-router-dom";
// Material UI
import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  makeStyles,
  Toolbar,
  Typography
} from "@material-ui/core";
// Components
import Dialog from "../components/Dialog";
// Constants
import { APP_NAME } from "../utils/constants";

// Styles

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: "space-between"
  },
  container: {
    minWidth: 320,
    maxWidth: 450,
    marginLeft: "auto",
    marginRight: "auto"
  },
  button: {
    color: "rgba(255, 255, 255, .4)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, .04)"
    },

    "&.active": {
      color: "white",

      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, .08)"
      }
    }
  }
}));

// Render template

function Template(props) {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSessionDestroy = () => {
    sessionStorage.removeItem("token");
    handleModalClose(); // Close dialog
    setRedirect(true); // Redirect enabled
  };

  return (
    <>
      {// Redirect to login after logout
      redirect && <Redirect to="/" />}

      {/* Render template */}
      <CssBaseline>
        {props.location.pathname !== "/" && (
          <AppBar position="fixed">
            <Toolbar className={classes.root}>
              <Typography variant="h6">{APP_NAME}</Typography>
              <Button className={classes.button} onClick={handleModalOpen}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        )}

        <Container className={classes.container}>{props.children}</Container>
      </CssBaseline>

      {/* Logout dialog */}
      <Dialog
        title="Logout"
        text="Deseja realmente sair?"
        open={modalOpen}
        onClose={handleModalClose}
        onSubmit={handleSessionDestroy}
      />
    </>
  );
}

Template.prototypes = {
  children: PropTypes.node.isRequired
};

export default withRouter(Template);

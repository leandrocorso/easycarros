import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Material UI
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
// Actions
import { getAll, toDestroy, destroy } from "../../redux/vehicles/actions";
// Components
import Dialog from "../../components/Dialog";

function VehiclesList() {
  // Set dispatch instance
  const dispatch = useDispatch();

  // Setting states
  const [vehicles, setVehicles] = useState([]);

  // Getting props from reducer
  const vehiclesReducer = useSelector(state => state.vehicles);

  // Get all vehicles on page load
  useEffect(() => {
    dispatch(getAll());
  }, []);

  // Get All vehicles on list update
  useEffect(() => {
    setVehicles(vehiclesReducer.data);
  }, [vehiclesReducer.data]);

  // Select a vehicle to delete
  const handleToDestroy = id => {
    dispatch(toDestroy(id));
  };

  // Unselect the vehicle to delete
  const handleUnselectToDestroy = () => {
    dispatch(toDestroy(""));
  };

  // Delete the selected vehicle
  const handleDestroy = () => {
    dispatch(destroy(vehiclesReducer.toDestroy));
  };

  // Render results
  return (
    <>
      {!vehicles.length ? (
        <p data-testid="vehiclesList">Não há veículos cadastrados</p>
      ) : (
        <List data-testid="vehiclesList">
          {vehicles.map(item => (
            <ListItem key={item.id} data-testid="vehiclesListItem">
              <ListItemText primary={item.plate}></ListItemText>
              <ListItemSecondaryAction>
                <IconButton
                  data-testid="vehiclesListItemButton"
                  edge="end"
                  onClick={() => handleToDestroy(item.id)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}

      {/* Dialog modal */}
      <Dialog
        title="Exclusão de veículo"
        text="Deseja realmente excluir o veículo?"
        open={!!vehiclesReducer.toDestroy}
        onClose={handleUnselectToDestroy}
        onSubmit={handleDestroy}
        testId="vehicleDialog"
      />
    </>
  );
}

export default VehiclesList;

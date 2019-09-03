import React from "react";
import { fireEvent, wait, cleanup } from "@testing-library/react";
// Container
import App from "../../App";
// Utils
import renderWithRouter from "../../utils-test/render";
import { defaultProps } from "../../utils-test/defaultProps";

afterEach(cleanup);

describe("Add vehicles", () => {
  //

  it("show the vehicles plate list", async () => {
    const { getByTestId } = renderWithRouter(<App />);
    // Login the aplication
    const loginForm = getByTestId("loginForm");
    const loginEmail = getByTestId("loginEmail");
    const loginPassword = getByTestId("loginPassword");

    // Valid credentials
    fireEvent.change(loginEmail, {
      target: { value: defaultProps.email.valid }
    });
    fireEvent.change(loginPassword, {
      target: { value: defaultProps.password.valid }
    });
    fireEvent.submit(loginForm);

    await wait(() => {
      expect(getByTestId("vehiclesList")).toBeInTheDocument;
    });
  });

  //

  it("show a error message if insert a invalid plate", async () => {
    const { getByTestId } = renderWithRouter(<App />);
    const vehicleAddForm = getByTestId("vehicleAddForm");
    const vehicleAddInput = getByTestId("vehicleAddInput");
    // Set the text field
    fireEvent.change(vehicleAddInput, {
      target: { value: defaultProps.plate.invalid }
    });
    // Submit form
    fireEvent.submit(vehicleAddForm);
    // Vehicle not added
    await wait(() => {
      expect(getByTestId("vehicleMessage-error")).toBeInTheDocument;
    });
  });

  //

  it("insert a valid plate", async () => {
    const { getByTestId, getAllByText } = renderWithRouter(<App />);
    const vehicleAddForm = getByTestId("vehicleAddForm");
    const vehicleAddInput = getByTestId("vehicleAddInput");
    // Set the text field
    fireEvent.change(vehicleAddInput, {
      target: { value: defaultProps.plate.valid }
    });
    // Submit form
    fireEvent.submit(vehicleAddForm);
    // Vehicle added
    await wait(() => {
      const listItem = defaultProps.plate.valid.replace("-", "");
      expect(getAllByText(listItem)).toBeInTheDocument;
      expect(getByTestId("vehicleMessage-success")).toBeInTheDocument;
    });
  });

  //

  it("show the confirm modal to delete a vehicle", async () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
    // Setting the item and item button
    const [vehiclesListItem] = getAllByTestId("vehiclesListItem");
    const [button] = getAllByTestId("vehiclesListItemButton", vehiclesListItem);
    // Click the button
    fireEvent.click(button);
    // Opening dialog
    await wait(() => {
      const dialog = getByTestId("vehicleDialog");
      const closeButton = getByTestId("closeButton", dialog);
      // Cancel dialog button
      fireEvent.click(closeButton);
      // Dialog is closed
      expect(dialog).not.toBeInTheDocument;
    });
  });

  //

  it("delete a vehicle", async () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
    // Setting the item and item button
    const [vehiclesListItem] = getAllByTestId("vehiclesListItem");
    const [button] = getAllByTestId("vehiclesListItemButton", vehiclesListItem);
    // Click the button
    fireEvent.click(button);
    // Opening dialog
    await wait(() => {
      const dialog = getByTestId("vehicleDialog");
      const submitButton = getByTestId("submitButton", dialog);
      // Submit dialog button
      fireEvent.click(submitButton);
      // List item deleted
      expect(vehiclesListItem).not.toBeInTheDocument;
    });
  });

  //
});

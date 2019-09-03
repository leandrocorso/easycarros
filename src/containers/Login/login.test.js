import React from "react";
import { fireEvent, wait, cleanup } from "@testing-library/react";
// Container
import App from "../../App";
// Utils
import renderWithRouter from "../../utils-test/render";
import { defaultProps } from "../../utils-test/defaultProps";

afterEach(cleanup);

describe("Login", () => {
  //

  it("show a error message if e-mail and/or password is empty", async () => {
    const { getByTestId } = renderWithRouter(<App />);
    const loginForm = getByTestId("loginForm");
    const loginEmail = getByTestId("loginEmail");
    const loginPassword = getByTestId("loginPassword");
    // E-mail empty and valid password
    fireEvent.change(loginEmail, {
      target: { value: "" }
    });
    fireEvent.change(loginPassword, {
      target: { value: defaultProps.password.valid }
    });
    // Form submitted
    fireEvent.submit(loginForm);
    await wait(() => {
      // Showing error message
      expect(getByTestId("loginMessage-error")).toBeInTheDocument;
    });

    // E-mail valid and empty password
    fireEvent.change(loginEmail, {
      target: { value: defaultProps.password.valid }
    });
    fireEvent.change(loginPassword, {
      target: { value: "" }
    });
    // Form submitted
    fireEvent.submit(loginForm);
    await wait(() => {
      // Showing error message
      expect(getByTestId("loginMessage-error")).toBeInTheDocument;
    });

    // E-mail and password empty
    fireEvent.change(loginEmail, {
      target: { value: "" }
    });
    fireEvent.change(loginPassword, {
      target: { value: "" }
    });
    // Form submitted
    fireEvent.submit(loginForm);
    await wait(() => {
      // Showing error message
      expect(getByTestId("loginMessage-error")).toBeInTheDocument;
    });
  });

  //

  it("show a error message if invalid credentials", async () => {
    const { getByTestId } = renderWithRouter(<App />);
    const loginForm = getByTestId("loginForm");
    const loginEmail = getByTestId("loginEmail");
    const loginPassword = getByTestId("loginPassword");
    // Invalid credentials
    fireEvent.change(loginEmail, {
      target: { value: defaultProps.email.invalid }
    });
    fireEvent.change(loginPassword, {
      target: { value: defaultProps.password.invalid }
    });
    // Form submitted
    fireEvent.submit(loginForm);

    await wait(() => {
      // Showing error message
      expect(getByTestId("loginMessage-error")).toBeInTheDocument;
    });
  });

  //

  it("should redirect to vehicles page if send valid credentials", async () => {
    const route = "/veiculos";
    const { getByTestId } = renderWithRouter(<App />, { route });
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

    await wait(
      () => expect(getByTestId("loginMessage-error")).not.toBeInTheDocument
    );
    await wait(() => expect(getByTestId("vehiclesPage")).toBeInTheDocument);
  });
  //
});

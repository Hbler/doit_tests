import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";

import Login from "../../pages/Login";
import api from "../../services/api";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: ({ children }) => children,
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const apiMock = new MockAdapter(api);

describe("Login Page", () => {
  it("Should be able to sign in", async () => {
    apiMock.onPost("/login").replyOnce(200, {});
    render(<Login authenticated={false} setAuthenticated={() => {}} />);

    const emailField = screen.getByPlaceholderText("Seu melhor email");
    const passwordField = screen.getByPlaceholderText("Uma senha bem segura");
    const buttonElement = screen.getByText("Enviar");

    fireEvent.change(emailField, { target: { value: "johndoe@mail.com" } });
    fireEvent.change(passwordField, { target: { value: "123456789" } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(emailField).toHaveValue("johndoe@mail.com");
      expect(passwordField).toHaveValue("123456789");
      expect(mockHistoryPush).toHaveBeenCalledWith("/dashboard");
    });
  });
});

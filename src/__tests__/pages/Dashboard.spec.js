import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  findByText,
} from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";

import Dashboard from "../../pages/Dashboard";
import api from "../../services/api";

const apiMock = new MockAdapter(api);
const date = new Date();

describe("Dashboard Page", () => {
  it("Should be able to retrieve tasks", async () => {
    apiMock.onGet("/tasks").replyOnce(200, [
      {
        id: 1,
        completed: false,
        created_at: date,
        description: "Fazer compras",
        userId: 1,
      },
    ]);
    render(<Dashboard authenticated />);

    const cards = screen.getByTestId("tasks-container");

    await waitFor(() => {
      expect(cards).toHaveTextContent("Fazer compras");
    });
  });

  it("Should be able to create a task", async () => {
    apiMock.onGet("/tasks").replyOnce(200, []);
    apiMock.onPost("/tasks").replyOnce(200, {
      id: 1,
      completed: false,
      created_at: date,
      description: "Fazer compras",
      userId: 1,
    });

    render(<Dashboard authenticated />);

    const taskField = screen.getByPlaceholderText("Nova tarefa");
    const buttonElement = screen.getByText("Adicionar");
    const cards = screen.getByTestId("tasks-container");

    fireEvent.change(taskField, { target: { value: "Fazer compras" } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(cards).toHaveTextContent("Fazer compras");
    });
  });

  it("Should be able to conclude a task", async () => {
    apiMock.onGet("/tasks").replyOnce(200, [
      {
        id: 1,
        completed: false,
        created_at: date,
        description: "Fazer compras",
        userId: 1,
      },
    ]);
    apiMock.onPatch("/tasks/1").replyOnce(200, {
      id: 1,
      completed: true,
      created_at: date,
      description: "Fazer compras",
      userId: 1,
    });

    render(<Dashboard authenticated />);

    // getBy - sync -> already on screen
    // queryBy - sync -> not on screen
    // findBy - async -> will be on screen

    const cardBtn = await screen.findByText("Concluir");
    fireEvent.click(cardBtn);

    await waitFor(() => {
      expect(screen.queryByText("Fazer compras")).not.toBeInTheDocument();
    });
  });
});

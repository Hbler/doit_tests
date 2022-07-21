import React from "react";
import { render, screen } from "@testing-library/react";
import Input from "../../components/Input";

describe("Input Component", () => {
  test("Should be able to render an input", () => {
    render(
      <Input error="" name="Email" placeholder="Email" register={() => {}} />
    );

    expect(screen.getByPlaceholderText("Email")).toBeTruthy();
  });

  test("Should be able to render an error", () => {
    render(
      <Input
        error="Campo obrigatório"
        name="Email"
        placeholder="Email"
        register={() => {}}
      />
    );

    const error = screen.getByText(/Campo obrigatório/);

    expect(error).toBeInTheDocument();
  });
});

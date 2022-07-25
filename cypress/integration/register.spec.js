context("Register", () => {
  it("Enters the landing page and tries to go to the register page", () => {
    cy.visit("http://localhost:3000");
    cy.viewport(1280, 660);

    cy.contains("Cadastre-se").click();
  });

  it("Tries to register a new user", () => {
    cy.viewport(1280, 660);

    cy.intercept("POST", "/register", {
      statusCode: 201,
      body: {
        name: "Hugo",
        email: "hugo@mail.com",
        id: 1,
      },
    }).as("new-user");

    cy.get("input[name=name]").type("Hugo");
    cy.get("input[name=email]").type("hugo@mail.com");
    cy.get("input[name=password]").type("aA@12345");
    cy.get("input[name=passwordConfirm]").type("aA@12345");
    cy.get("button[type=submit]").click();

    cy.contains("Login");
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../Components/Header";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

//Here, we need to render <Header/> component, but this component is using the redux store and <Link />
//so we need to provide the exact environment that we provide to our <App /> so that it can render successfullyb in jsDOM
//ie: provide routing and redux store access

describe("Header page test cases", () => {
  it("Should render Header Component with a login button", () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    //more specific way to target one element on screen
    const loginButton = screen.getByRole("button", { name: "Login" });

    //another way:
    // const loginButton = screen.getByText("Login");
    // const loginButton = screen.getByRole("button");

    expect(loginButton).toBeInTheDocument();
  });

  it("Should render Header Component with a Cart items 0", () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    const cartItems = screen.getByText("🛒(0)");

    expect(cartItems).toBeInTheDocument();
  });

  it("Should render Header Component with a Cart item", () => {
    // here we are just checking if there is an item with some of its part as: "Cart"
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    //using the "regex" to match the partial or whole part with "Cart", we are only using  an emogi
    // const cartItems = screen.getByText(/Cart/);  
        const cartItems = screen.getByText(/🛒/);  
    expect(cartItems).toBeInTheDocument();
  });

  it("Should change Login Button to Logout on click", () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    const loginButton = screen.getByRole("button", { name: "Login" });

    //we fired a "click" event on the loginButton
    fireEvent.click(loginButton);

    const logoutButton = screen.getByRole("button", { name: "Logout" });
    expect(logoutButton).toBeInTheDocument();
  });
});

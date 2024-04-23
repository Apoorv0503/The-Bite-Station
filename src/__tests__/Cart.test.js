import { Provider } from "react-redux";
import Cart from "../Components/Cart";
import { act } from "react-dom/test-utils";
import Header from "../Components/Header";
import RestuarantMenu from "../Components/RestaurantMenu";
import RestuarantMenuMock from "../Mocks/RestuarantMenuMock.json";
import appStore from "../utils/appStore";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      //this is the "Dominos" data, that we have got while making a fetch in useRestraurantMenu custom hook.
      return Promise.resolve(RestuarantMenuMock);
    },
  });
});
describe("Cart relared tests", () => {
  //we are checking if upon clickig add to cart, our header and cart component should update
  //we are testing clear cart functionality too.

  //1. To test it, we first need to render Header, RestuarantMenu, Cart components
  //2. since we are making a fetch request to get restaurant menu, hence need to mimik that too.
  it("should Load Restaurant Menu Component", async () => {
    await act(() =>
      render(
        <BrowserRouter>
          <Provider store={appStore}>
            <Header />
            <RestuarantMenu />
            <Cart />
          </Provider>
        </BrowserRouter>
      )
    );

    const accordionHeader = screen.getByText("Party Combo (11)");
    fireEvent.click(accordionHeader);

    //right after expending the particular menu accordion of Dominos, get the total itmes in it
    expect(screen.getAllByTestId("foodItems").length).toBe(11);
    expect(screen.getByText("🛒(0)")).toBeInTheDocument();

    const addBtns = screen.getAllByRole("button", { name: "Add +" });

    //clicked the "add +" button of very first item in "Party Combo" accordion
    //now we can test if quantity is increasing in the header or not
    fireEvent.click(addBtns[0]);
    expect(screen.getByText("🛒(1)")).toBeInTheDocument();

    fireEvent.click(addBtns[1]);
    expect(screen.getByText("🛒(2)")).toBeInTheDocument();

    /*
Notes:
1. since for shwoing items under a particular accordion on menu page we are using itmeList component, and the same is used to show items on the cart page,
Also, we have added the "testid: foodItems" to the ItemList component's main div, hence on clicking the "add +" button 2 times, the total number of elements here:
screen.getAllByTestId("foodItems").length should increase from 11 to 13.
*/

    expect(screen.getAllByTestId("foodItems").length).toBe(13);

    const clearCartBtn = screen.getByRole("button", { name: "Clear Cart" });
    fireEvent.click(clearCartBtn);

    //after clearing the cart, back to initial value of 11
    expect(screen.getAllByTestId("foodItems").length).toBe(11);

    expect(
      screen.getByText("Cart is empty. Add Items to the cart!")
    ).toBeInTheDocument();
  });
});

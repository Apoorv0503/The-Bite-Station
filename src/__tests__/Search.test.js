import { fireEvent, render, screen } from "@testing-library/react";
import Body from "../Components/Body";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import RestaurantDataMock from "../Mocks/RestaurantDataMock.json"


//here we are mimiking out fetch webAPI because browser provides that


global.fetch=jest.fn(()=>{
  //returned a resolved promise
    return Promise.resolve({
        json:()=>{
          //return another resolved promise just like fetch which first return response promise and then return the promise containing the
          //JSON data.
            return Promise.resolve(RestaurantDataMock);
        }
    });
});

describe("Search functionality tests", () => {
  it("Should Search Res List for burger text input.", async() => {

//since this body component is making a side-effect by making an API call, hence we need to wrapn this inside act()
  await act(async()=> render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    ))

    const cardsBeforeSearch = screen.getAllByTestId("resCard");
    expect(cardsBeforeSearch.length).toBe(20);

    //target the input box, enter the "burger" text in it, and fire an onChange event over it
    const searchInput = screen.getByTestId("SearchInput");

    //we need to mimik the onChange event end "event.target.value" as this event object is provided by the borwser only.
    fireEvent.change(searchInput, { target: { value: "burger" } });

    //now, target our search button, and fire a click even over it
    const searchBtn = screen.getByRole("button", { name: "Search" });
    fireEvent.click(searchBtn);

    const cardsAfterSearch = screen.getAllByTestId("resCard");
    expect(cardsAfterSearch.length).toBe(3);
  });


  it("Should filter Top Rated Restaurant",async()=>{

    await act(async()=> render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>

    ))

    const cardsBeforeSearch = screen.getAllByTestId("resCard");
    expect(cardsBeforeSearch.length).toBe(20);

    //now, target our filter button, and fire a click even over it
    const filterBtn = screen.getByRole("button", { name: "Filter by Rating" });
    fireEvent.click(filterBtn);

    const cardsAfterSearch = screen.getAllByTestId("resCard");
    expect(cardsAfterSearch.length).toBe(17);


  })


});

/*
Notes:

For fetch -->
1. In JavaScript, the global object is the global namespace object. In browsers, this object is usually called window, 
   but in Node.js environments (like when running Jest tests), it's referred to as global.

2. The global object provides a global scope for variables, functions, and other objects. When you define or assign a property to global, 
   it becomes available globally throughout your application or test suite, allowing you to access it from any module or file without explicitly importing or requiring it.

3. In the context of your Jest test, global.fetch is assigning a mock function to the fetch property of the global object. 
   This means that whenever your code calls fetch anywhere in your test suite, it will use this mocked function instead of the real fetch API.

For act() -->
1. async/await: Your test function is marked as async, allowing you to use await for asynchronous operations(we are making an API req). 
   This ensures that Jest waits for promises to resolve (response recieved and dijested) before moving on to the next step in the test.

2. act: The act function from @testing-library/react is used to wrap any code that causes side-effects 
    (like rendering a component or making a API request) inside your test. It ensures that all updates related to these side-effects 
    are flushed before you make any assertions. This is particularly important for components that perform asynchronous operations,
     like fetching data.

Your Body component fetches data asynchronously in its useEffect, which means the component's state is updated asynchronously.
Without using act and async/await, there's a risk that your assertions would run before the component's asynchronous 
updates are completed, leading to flaky tests.

*/

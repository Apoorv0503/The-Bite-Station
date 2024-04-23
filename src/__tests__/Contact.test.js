import { render, screen } from "@testing-library/react";
import Contact from "../Components/Contact";
import "@testing-library/jest-dom";

describe("Contact us page tests", () => {
  it("should load the contact us component", () => {
    //render step, this render will happen in the jsDOM not in browser, for this we have iinstalled a package too
    render(<Contact />);

    //querying, after render we get access to the screen object.
    //there are a lot of "roles" by which we can find thing on the screen
    const heading = screen.getByRole("heading");

    //assertion, or expectations
    expect(heading).toBeInTheDocument();
  });

  it("Should load the button insie the contact Us component", () => {
    render(<Contact />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("Should load input: name , inside Contact component", () => {
    render(<Contact />);

    const inputName = screen.getByPlaceholderText("name");
    expect(inputName).toBeInTheDocument();
  });

  it("Should load 2 input boxes on the Contact component", () => {
    render(<Contact />);

    //to get all of the elements under a particular role, use: "getAllByRole"
    const inputBoxes = screen.getAllByRole("textbox");
    //console.log(inputBoxes);
    //this will give us an array of 2 react elements in the form of 2 objects in an array

    expect(inputBoxes.length).toBe(2);
  });
});

import { render, screen } from "@testing-library/react";
import RestaurantCard, {withPromtedLabel} from "../Components/RestaurantCard";
import RestaurantCardMock from "../Mocks/RestaurantCardMock.json";
import "@testing-library/jest-dom"

describe("RestaurantCard component tests",()=>{
    it("should render RestaurantCard component with props Data",()=>{
        render(
            <RestaurantCard resData={RestaurantCardMock}/>
        )

        const name=screen.getByText("Domino's Pizza");
        expect(name).toBeInTheDocument();
    })

    it("should render RestaurantCard component with Promoted Label", () => {
        const RestaurantCardPromoted= withPromtedLabel(RestaurantCard);
        render(
            <RestaurantCardPromoted resData={RestaurantCardMock}/>
        )

        const promoted=screen.getByText("Promoted");
        expect(promoted).toBeInTheDocument();

      });
      
})
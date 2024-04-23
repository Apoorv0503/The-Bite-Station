import React,{useState} from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestuarantMenu = () => {
  const { resId } = useParams();
  const { resDetails, menuList } = useRestaurantMenu(resId);

  /*
  we will capture the index of the clicked restaurantCategory component, and then open/collapse that one category box
  with the help of this state, we are not keeping the states for different restaurantCategory comps(previously un-controlled(haveing their own state)
  but now controlled comp, as they are controlled by the state of parent comp),
  We just lifted the state here, and will send a callback function to restaurantCategory
  and with the help of it will set the showIndex state.
 */

  const [showIndex, setShowIndex] = useState(null);
  const [show, setShow]=useState(false);


  //restaurant data
  const { name, cuisines, costForTwoMessage } = resDetails;
  console.log(cuisines);

  // category --> menuList[arry_of_some_size].card.card.@type
  const categories = menuList.filter(
    (c) =>
      c?.card?.card?.["@type"] ==
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  //to get titel: categories[i].card.card.title

  //name, cuisines, price, costfortwo

  return (
    <div>
      {menuList?.length ? (
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col text-center">
            <h1 className="m-8 text-5xl">{name}</h1>
            <h2>{cuisines.join(", ")}</h2>
            <h2>{costForTwoMessage}</h2>
          </div>
          <div className="flex flex-col items-center my-8">
            {categories.map((category, index) => (
              <RestaurantCategory
                key={category?.card?.card?.title}
                data={category?.card?.card}
                // when we click on one restaurantCategory card, this below arrow function will be executed, and the state "showIndex" will be reset 
                //now, this state will store the index of that card which got clicked just now.
                setShowIndex={() => {
                  setShowIndex(index); //null --> 0 -->1
                  setShow(!show); //false --> true --> false
                }}

                //by below logic, only that restaurantCategory card will be open which is clicked just now, rest all will be closed
                showItems={index === showIndex ? show : false}
              />
            ))}
          </div>
        </div>
      ) : (
        <Shimmer /> // Or any loading indicator you want to display while fetching data
      )}
    </div>
  );
};

export default RestuarantMenu;

//older menu UI by me, just the grid of cards:
{
  /* <div className="flex flex-wrap justify-around m-12">
            {resInfo.resList.map((item, index) => {
              const { name, price, defaultPrice, ratings, imageId } =
                item.card.info;
              return (
                //reused the restaurant card jsx here
                <div
                  id={imageId}
                  className="flex 
                  flex-col m-8 p-2 w-[16rem]
                  border-[1px] border-solid border-gray
                  shadow-lg
                  hover:shadow-xl
                  hover:border-gray-700 transition-all duration-300
                  "
                >
                  <img
                    className="w-[240px] h-[200px]"
                    src={imageId ? ITEM_IMG_CDN_URL + imageId : food}
                    alt="res-image"
                  />
                  <div className="flex flex-col justify-center">
                    <h3 className="text-xl">{name}</h3>
                    <h4 className="font-normal">
                      {ratings.aggregatedRating.rating || 4.2} 🌟
                    </h4>
                    <h4 className="font-normal">
                      Rs {price / 100 || defaultPrice / 100}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div> */
}

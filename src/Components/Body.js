import React, { useContext, useEffect } from "react";
import RestaurantCard, { withPromtedLabel } from "./RestaurantCard";
import { resList } from "../utils/mockData";
import { useState } from "react";
// import { configNew } from "../App";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";

const Body = () => {
  // console.log(resList[0].info.name);
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestauransts, setFilteredRestauransts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { loggedInUser, setUserName } = useContext(UserContext);

  //promoted component from the higher order component
  const RestaurantCardPromoted = withPromtedLabel(RestaurantCard);

  const fetchResponse = async () => {
    const response = await fetch("http://localhost:8082/res/all");
    const json = await response.json();

    setListOfRestaurants(json);

    // console.log(json);
    setFilteredRestauransts(json);
  };

  useEffect(() => {
    fetchResponse();
  }, []);

  return (
    // direct return js or wrap everything in a React fragment (<>everything</>)

    //connditional rendering using shimmer, better UX
    listOfRestaurants.length === 0 ? (
      <Shimmer />
    ) : (
      <div>
        {/* search button */}
        <div className="flex justify-center">
          <div className="m-8">
            <input
               data-testid="SearchInput" 
              className="w-60 mx-4 px-2 py-1 border border-solid border-black rounded-lg"
              type="text"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <button
              className="bg-green-200 px-6 py-2 rounded-lg"
              onClick={(e) => {
                const filtered = listOfRestaurants.filter((res) => {
                  return res.info.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase());
                });
                setFilteredRestauransts(filtered);
              }}
            >
              Search
            </button>
          </div>

          {/*filtere button */}
          <button
            className="bg-gray-200 mx-4 my-8 px-6 rounded-lg"
            onClick={() => {
              let newFilteredList = listOfRestaurants.filter((res) => {
                // this is the optional chaining, if the LHS is null/undefind then it will return undefined without throwing the error
                return res?.info?.avgRating > 4;
              });
              setFilteredRestauransts(newFilteredList);
            }}
          >
            Filter by Rating
          </button>

          {/* change the global context */}

          <div className="m-8">
            <label> UserName : </label>
            <input
              className="w-60 mx-4 px-2 py-1 border border-solid border-black rounded-lg"
              type="text"
              value={loggedInUser}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-around m-12">
          {filteredRestauransts.map((restaurant) => (
            <Link
              key={restaurant.info.id}
              to={"/restaurant/" + restaurant.info.id}
            >
              {restaurant.info.recommended ? (
                <>
                  {console.log(restaurant.info.recommended)}
                  <RestaurantCardPromoted resData={restaurant.info} />
                </>
              ) : (
                <RestaurantCard resData={restaurant.info} />
              )}
            </Link>
          ))}
        </div>
      </div>
    )
  );
};
// onClick={()=>navigate("/restaurant/"+restaurant.info.id)}

export default Body;

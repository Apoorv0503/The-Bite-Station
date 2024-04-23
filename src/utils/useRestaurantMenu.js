import React, { useState, useEffect } from "react";

import { RES_MENU_API } from "./constants";

const useRestaurantMenu = (resId) => {
  const [resDetails, setResDetails] = useState({});
  const [menuList, setMenuList]=useState([]);

  const fetchMenu = async () => {
    let url = RES_MENU_API + resId;

    const response = await fetch(url);
    const json = await response.json();

    //utilize this json data as mock while testing the cart component integration test.
    console.log(json);

    const updatedResDetails = json.data.cards[2].card.card.info;
    const updatedMenuList =
      json.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards;


    setMenuList(updatedMenuList);
    setResDetails(updatedResDetails);

    console.log(menuList);

    //all menu categories array--> json.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[an_array_of_some_itmes]
    // general recommended menu --> json.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[1].card.card.itemCards[0].card.info.name
    // const {name, cuisines, costForTwoMessage } = json.data.cards[0].card.card.info
    // json.data.cards[2].card.card.info

    //when no price: data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[1].card.card.itemCards[0].card.info.defaultPrice
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  //if this custom hook was a component then it will be returning some jsx below, but since its a normal hook (js function with special abilities), hence
  //simple value is returned
  return {resDetails, menuList};
};

export default useRestaurantMenu;

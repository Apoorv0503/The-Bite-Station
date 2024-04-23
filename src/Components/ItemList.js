import React from "react";
// import my from "../../Assets/dummy_food.jpeg";
import { ItemImgCdnUrl, NewItemImgCdnUrl } from "../utils/constants";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { addItem } from "../utils/cartSlice";

const ItemList = ({ items,readOnly }) => {

  const dispatch = useDispatch();

  // rigth after click we need to dispatch an action, and reducer(in redux store) will perform the update according to  action 
  const handleClick=(item)=>{
    // now the value passed in the dispatched action will be the "palyload", and reducer will use it to  update the state in store.
      dispatch(addItem(item));
  }

  return (
    // this is the main div representing the menu item
    //name of dish: itemCards[i].card.info.name

    items.map((item) => {
      const { name, price, imageId, description, defaultPrice } =
        item?.card?.info;

      // const img1=ItemImgCdnUrl + imageId;      //old img url, now not working

      return (
        <div 
        // use this test id to get the number of items rendered under an specific accordion of menu.
        data-testid="foodItems"
        key={imageId}
        className="flex p-8  border-gray-200 border-b-2 justify-between mx-5">
          <div className="w-9/12 mx-3">
            <h1 className="font-semibold text-lg">
              {name}- ₹{price / 100 || defaultPrice / 100}
            </h1>
            <p className="my-4 text-xs">
              {description ||
                "A fantastic dish with some colourful texture and falvours"}
            </p>
          </div>
          <div className="w-3/12 relative">
            {readOnly &&
            <div className="absolute bottom-[-15px] w-[200px]">
              <button
                className="px-2 py-1 mx-16 rounded-lg bg-black text-white shadow-lg"
                onClick={()=>handleClick(item)}
              >
                Add +
              </button>
            </div>
            }
            <img src={NewItemImgCdnUrl + imageId} className="w-full" alt="no image available"/>
          </div>
        </div>
      );
    })
  );
};

export default ItemList;

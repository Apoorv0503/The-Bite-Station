import React, { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory=({data, setShowIndex, showItems})=>{

    // const[show, setShow]=useState(true);

    const handleClick=()=>{
        setShowIndex();
    }

    const{title, itemCards}=data;

    // to get the complete list of all the item, use "itemCards" array
    //name of dish: itemCards[i].card.info.name
    return(
        <div className="flex flex-col w-[50rem] my-4 shadow-lg bg-gray-50">
            <div onClick={handleClick} className="flex justify-between m-4 cursor-pointer">
                <h1 className="text-xl font-bold">{title} ({itemCards.length})</h1>
                <span>⬇️</span>
            </div>
               {showItems && <ItemList items={itemCards} readOnly={true}/>}
            </div>

    )
}

export default RestaurantCategory;
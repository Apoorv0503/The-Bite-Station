import React from 'react'
import {ItemImgCdnUrl, NewItemImgCdnUrl} from "../utils/constants";

const RestaurantCard = (props) => {

    const {resData}=props


    // console.log(resData);
    const {
        cloudinaryImageId,
        name,
        avgRating,
        cuisines,
        costForTwo,
        sla} = resData;

  return (
    <div 
    data-testid="resCard"
    className='flex 
    flex-col m-8 p-2 w-[16rem]
    border-[1px] border-solid border-gray
     shadow-lg

    hover:shadow-xl
    hover:border-gray-700 transition-all duration-300
    '
    style={{}}
    >
        <img 
        className='w-[240px] h-[200px] '
        src={NewItemImgCdnUrl+cloudinaryImageId}
        alt="res-image"
        />
        <div className='flex flex-col justify-center'>
        <h3 className='text-xl'>{name}</h3>
        <h4 className='font-normal'>{cuisines.join(", ")}</h4>
        <h4 className='font-normal'>{avgRating} 🌟</h4>
        <h4 className='font-normal'>{costForTwo}</h4>
        <h4 className='font-normal'>{sla.deliveryTime} mins</h4>
        </div>
    </div>
  )
}

// Higher Order Component
// input - RestaurantCard =>> RestaurantCardPromoted

export const withPromtedLabel=(RestaurantCard)=>{
  //since this return of higher order component is returning another component (see an arrow function is returned)
  //hence we will be recieving the props in the paranthesis of this returned arrow function (ie our returned component)
  return((props)=>{
    return(
      <div className='relative'>
        <label className='absolute w-25 bg-black text-white m-2 px-2 py-1 top-2 border border-solid border-black shadow-2xl'>
           Promoted
        </label>
        <RestaurantCard {...props}/>
      </div>
    )
  })
}



export default RestaurantCard
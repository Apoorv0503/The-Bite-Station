const {resList}=require("../data");

const getAllRestaurants=async(req,res)=>{
    try{
        console.log(resList[0]);
        return res.status(200).send(resList);      
    }
    catch(error){
        return res.status(500).json({message:"Internal server error while fetching the Restaurants data"});
    }

}

module.exports={getAllRestaurants};
const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
//const reviews=require("../routes/review.js");
const Review=require("../models/review.js"); 
const Listing=require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor}=require("../middlewares.js");
const controllerReview = require("../controllers/review.js");


// const validateReview=(req,res,next)=>{
//     let {error}=reviewSchema.validate(req.body);
//         if(error){
//             let errMsg=error.details.map((el)=>el.message).join(",");
//             throw new ExpressError(400,errMsg);
//         } else{
//             next();
//         }
// };

router.post("/",
    isLoggedIn,
    validateReview,
    wrapAsync(controllerReview.createReview),
);

router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(controllerReview.deleteReview)
);

module.exports=router;
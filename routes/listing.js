const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middlewares.js");
const listingController=require("../controllers/listings.js");
const multer=require("multer");
const { storage }=require("../cloudConfig");
const upload=multer({storage});


router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
      isLoggedIn,
      upload.single("listing[image]"),
      validateListing,
      wrapAsync(listingController.createRoute)
    );

//     router.post("/", upload.single("listing[image]"), async (req, res) => {

//     debugger;          // Optional
//     console.log("1");

//     console.log(req.file);   // <-- Breakpoint here

//     const listing = new Listing(req.body.listing);

//     console.log("2");        // <-- Breakpoint

//     await listing.save();

//     console.log("3");        // <-- Breakpoint

//     res.redirect("/listings");
// });


//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.editRoute)
);

router.route("/:id")
.get( wrapAsync(listingController.showRoute))
.put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateRoute)
)
.delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.deleteRoute)
);

//Index Route
//router.get("/", wrapAsync(listingController.index));

//Show Route
router.get("/:id", wrapAsync(listingController.showRoute));

//update Route
router.put("/:id",
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateRoute)
);

//delete Route
router.delete("/:id",isLoggedIn, isOwner,wrapAsync(listingController.deleteRoute));

//edit Route
router.get("/:id/edit",isLoggedIn, isOwner,wrapAsync(listingController.editRoute));

//create route
// router.post("/",
//     isLoggedIn,
//     validateListing,
//     wrapAsync(listingController.createRoute)
// );

module.exports=router;
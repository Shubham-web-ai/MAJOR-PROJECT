const Listing=require("../models/listing");

const { config, geocoding } = require("@maptiler/client");

config.apiKey = process.env.MAP_TOKEN;

module.exports.index=async (req,res)=>{
    const allListings= await Listing.find({});
    res.render("listings/index.ejs",{allListings}); 
};

module.exports.renderNewForm=(req,res)=>{
   res.render("listings/new.ejs");
};

module.exports.showRoute=async(req,res)=>{
    let {id} = req.params;
    const allId=await Listing.findById(req.params.id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");//this line give data in the format of obj than
    console.log(allId);
console.log(allId.owner);
    res.render("listings/show.ejs",{allId});
};

module.exports.updateRoute=async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file !== "undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }
    req.flash("success","Listing Updated");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteRoute=async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted");
    res.redirect("/listings");
};

module.exports.editRoute=async (req,res)=>{
    let {id} = req.params;
    const editData=await Listing.findById(id);
    if(!editData){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    let originalImageUrl=editData.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/h_300,w_250");
    res.render("listings/edit.ejs",{editData,originalImageUrl});
};

module.exports.createRoute=async (req,res)=>{    
     const result = await geocoding.forward(req.body.listing.location, {
    limit: 1,
  });
  
    let url=req.file.path;
    let filename=req.file.filename;
    console.log(url,"..",filename);
    const newListing=new Listing(req.body.listing); //this line new data save old schema pattern
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    newListing.geometry = result.features[0].geometry;
    await newListing.save();
    req.flash("success","New Listing Created");
    res.redirect("/listings");
};


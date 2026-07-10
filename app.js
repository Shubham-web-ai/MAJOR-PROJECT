if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}


const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const session=require("express-session");
const MongoStore = require("connect-mongo").default;
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");

app.engine("ejs",ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));

const dbUrl=process.env.ATLASDB_URL;

main()
 .then(()=>{
    console.log("Connected to DB");
 }).catch((err)=>{
    console.log(err);
 });

async function main() {
    await mongoose.connect(dbUrl);
};


//middleware of joi schema
const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body.listing);
        if(error){
            let errMsg=error.details.map((el)=>el.message).join(",");
            throw new ExpressError(400,errMsg);
        } else{
            next();
        }
};


const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
        if(error){
            let errMsg=error.details.map((el)=>el.message).join(",");
            throw new ExpressError(400,errMsg);
        } else{
            next();
        }
};

const store=MongoStore.create({
    mongoUrl: dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter: 24 * 3600,// time period in seconds
  });

store.on("error",(err)=>{
    console.log("ERROR in MONGO SESSION STORE",err);
});

//Index Route
const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() + 7*24*60*60*1000, //day,hrs,min,sec,millisec
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    },
};

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());  //one time login do work
passport.deserializeUser(User.deserializeUser()); //after work logout

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})


app.use("/listings",listingRouter);  //this line main of routes trasfer
app.use("/listings/:id/reviews",reviewRouter)
app.use("/",userRouter);



// all respond send request
app.all("/{*any}", (req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"));
});

// Error handler ALWAYS LAST
app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong"} = err;
    res.status(statusCode).render("error.ejs",{message});
});

app.listen(8080,()=>{
    console.log("listening on port :8080");
});



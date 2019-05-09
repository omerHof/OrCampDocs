//INIT STUFF

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.connect("mongodb://localhost/or_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine" , "ejs");


//SCHEMA SETUP

var reportSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    instructorName: String,
    campType: String,
    Q1_general: String,
    Q2_positive: String,
    Q3_negative: String,
    Q4_enjoy: String,
    Q5_behavior: String,
    Q6_social: String,
    Q7_night: String,
    Q8_equipment: String,
    Q9_medicines: String,
    Q10_health: String,
    Q11_hygiene: String,
    Q12_food: String,
    Q13_summary: String,
    done: Boolean

});

var Report = mongoose.model("Report",reportSchema);


//GET ROUTERS - LANDING, HOME, NEWREPORT,PORTAL

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/home", function(req,res){
    res.render("home");
});

app.get("/home/newReport", function(req,res){
   res.render("newReport.ejs"); 
});

app.get("/home/ReportsPortal", function(req,res){
    //get the name of a child from a user and 
    //retreive all its reports 
    
   res.render("ReportsPortal.ejs"); 
});

//POST ROUTES - HOME

app.post("/home",function(req,res){
    //get data from user-form and add it to database
    //redirect back to home page
    firstName = req.body.firstName;
    lastName = req.body.lastName;
    instructorName = req.body.instructorName;
    campType = req.body.campType;
    //need to create here a new report object and add it to DB.
    var newReport = {
    firstName: firstName,
    lastName: lastName,
    instructorName: instructorName,
    campType: campType
    };
    Report.create(newReport, function(err,newlyCreated){
            if (err){
                console.log(err);
            } else{
                console.log(newReport);
                res.render("/home/newReport/Q1_general");
            }
        });
});




app.post("/home/ReportsPortal",function(req,res){
    var searchChildfirstName = req.body.firstName;
    var searchChildLastName = req.body.lastName;
    //search for all child report 
    //with the exact first and last name
    //and put the result in array
    Report.find({
        firstName:searchChildfirstName, 
        lastName:searchChildLastName
    },function(err,allReports){
        if (err){
            console.log(err);
        }else{
            res.render("reports",{reports:allReports});
        }
    }
    ).toArray();
});

var firstName;
var lastName;
var instructorName;
var campType;
var Q1_general;
var Q2_positive;
var Q3_negative;
var Q4_enjoy;
var Q5_behavior;
var Q6_social;
var Q7_night;
var Q8_equipment;
var Q9_medicines;
var Q10_health;
var Q11_hygiene;
var Q12_food;
var Q13_summary;
var done = false;





app.get("/home/newReport/Q1_general", function(req,res){
   res.render("Q1_general.ejs"); 
});

app.post("/home/newReport/Q1_general",function(req,res){
    Q1_general = req.body.Q1_general;
    
    res.redirect("/home/newReport/submitForm");
});


app.get("/home/newReport/submitForm", function(req,res){
   res.render("submitForm.ejs"); 
});

app.post("/home/newReport/submitForm",function(req,res){
    done = true;
    var newReport = {
    firstName: firstName,
    lastName: lastName,
    instructorName: instructorName,
    campType: campType,
    Q1_general: Q1_general,
    Q2_positive: Q2_positive,
    Q3_negative:Q3_negative,
    Q4_enjoy: Q4_enjoy,
    Q5_behavior: Q5_behavior,
    Q6_social: Q6_social,
    Q7_night:Q7_night,
    Q8_equipment: Q8_equipment,
    Q9_medicines:Q9_medicines,
    Q10_health:Q10_health,
    Q11_hygiene: Q11_hygiene,
    Q12_food:Q12_food,
    Q13_summary:Q13_summary
    };
    if (done==true){
        Report.create(newReport, function(err,newlyCreated){
            if (err){
                console.log(err);
            } else{
                res.redirect("/home");
            }
        });
    }
});



app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The orRepo Server has Started!") 
});


var Contact = require("../models/Contact");
const passport = require("passport");

module.exports.controller = app => {
  // fetch all contacts
  app.get("/contact", (req, res) => {
    Contact.find(
      {},
      "message description ",
      { sort: { _id: -1 } },
      function(error, contact) {
        if (error) {
          console.log(error);
        }
        res.send({
          contact: contact
        });
      }
    );
  });
   // add a new movie
    app.post("/contact", (req, res) => {
        const contact = new Contact({
          name: req.body.name,
          surname:req.body.surname,
          message: req.body.message,
          email:req.body.email
          
        });
    
        contact.save(function(error, contact) {
          if (error) {
            console.log(error);
          }
          res.send(contact);
        });
    });
  };
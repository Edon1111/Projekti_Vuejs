var Contact = require("../models/Contact");
const passport = require("passport");

module.exports.controller = app => {
  // fetch all contacts
  app.get("/contacts", (req, res) => {
    Contact.find(
      {},
      "name surname message email ",
      { sort: { _id: -1 } },
      function(error, contacts) {
        if (error) {
          console.log(error);
        }
        res.send({
          contacts: contacts
        });
      }
    );
  });
  // add a new contact
  app.post("/contacts", (req, res) => {
    const contact = new Contact({
      name: req.body.name,
      surname: req.body.surname,
      message: req.body.message,
      email: req.body.email
    });

    contact.save(function(error, contact) {
      if (error) {
        console.log(error);
      }
      res.send(contact);
    });
  });
};

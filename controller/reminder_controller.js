let database = require("../models/userModel");

let remindersController = {
  list: (req, res) => {
    //res.render("reminder/index", { reminders: database.database.reminders });
    
    res.render("reminder/index", { reminders: req.user.reminders}); //this is not working
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.database.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.database.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: Date.now() + Math.random(),
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.database.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.database.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {

    let reminderToFind = req.params.id;
    let searchResultIndex = database.database.reminders.findIndex(function (reminder) {
      return reminder.id == reminderToFind;
    });
 
    if (searchResultIndex !== -1) {
      database.database.reminders[searchResultIndex].title = req.body.title; 
      database.database.reminders[searchResultIndex].description = req.body.description;
      if (req.body.completed == "true") {database.database.reminders[searchResultIndex].completed = true}
      else {database.database.reminders[searchResultIndex].completed = false}
      res.redirect(`/reminder/${searchResultIndex+1}`);
    }
    
  },

  delete: (req, res) => {
    let reminderToDeleteID = req.params.id;
    let reminderToDelete = database.database.reminders.findIndex(function (reminder) {
      return reminder.id == reminderToDeleteID;
    });
    database.database.reminders.splice((reminderToDelete), 1)
    
    res.redirect("/reminders");
  },
};

module.exports = remindersController;

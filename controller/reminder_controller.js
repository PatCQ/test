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
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: req.user.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: Date.now() + Math.random(),
      title: req.body.title,
      description: req.body.description,
      completed: false,
      
    };
    req.user.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {

    let reminderToFind = req.params.id;
    let searchResultIndex = req.user.reminders.findIndex(function (reminder) {
      return reminder.id == reminderToFind;
    });
 
    if (searchResultIndex !== -1) {
      req.user.reminders[searchResultIndex].title = req.body.title; 
      req.user.reminders[searchResultIndex].description = req.body.description;
      if (req.body.completed == "true") {req.user.reminders[searchResultIndex].completed = true}
      else {req.user.reminders[searchResultIndex].completed = false}
      res.redirect(`/reminder/${searchResultIndex+1}`);
    }
    
  },

  delete: (req, res) => {
    let reminderToDeleteID = req.params.id;
    let reminderToDelete = req.user.reminders.findIndex(function (reminder) {
      return reminder.id == reminderToDeleteID;
    });
    req.user.reminders.splice((reminderToDelete), 1)
    
    res.redirect("/reminders");
  },
};

module.exports = remindersController;

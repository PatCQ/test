let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: Date.now() + Math.random(),
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {

    let reminderToFind = req.params.id;
    let searchResultIndex = database.cindy.reminders.findIndex(function (reminder) {
      return reminder.id == reminderToFind;
    });
 
    if (searchResultIndex !== -1) {
      database.cindy.reminders[searchResultIndex].title = req.body.title; 
      database.cindy.reminders[searchResultIndex].description = req.body.description;
      if (req.body.completed == "true") {database.cindy.reminders[searchResultIndex].completed = true}
      else {database.cindy.reminders[searchResultIndex].completed = false}
      res.redirect(`/reminder/${searchResultIndex+1}`);
    }
    
  },

  delete: (req, res) => {
    let reminderToDeleteID = req.params.id;
    let reminderToDelete = database.cindy.reminders.findIndex(function (reminder) {
      return reminder.id == reminderToDeleteID;
    });
    database.cindy.reminders.splice((reminderToDelete), 1)
    
    res.redirect("/reminders");
  },
};

module.exports = remindersController;

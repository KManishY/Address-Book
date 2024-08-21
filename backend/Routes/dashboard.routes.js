const express = require("express");
var jwt = require("jsonwebtoken");
const { AddressBook } = require("../Models/AddressBook.model.js");
const dashboardController = express.Router();

dashboardController.get("/", async (req, res) => {
  try {
    const userdetails = await AddressBook.find();
    if (!userdetails) {
      res.status(200).json("No Data Found");
    } else {
      res.status(200).json(userdetails);
    }
  } catch (error) {
    console.log(error, "Error in dashboardController");
  }
});

dashboardController.post("/create", async (req, res) => {
  try {
    const { fullname, email, dob, number, website, group } = req.body;
    const newUser = new AddressBook({
      fullname,
      email,
      dob,
      number,
      website,
      group
    });
    await newUser.save();
    res.status(200).json("New User Added");
  } catch (error) {
    res.status(500).json({ error: "Adding new user" });
  }
});


dashboardController.patch('edit/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const user = await AddressBook.findOneAndUpdate({_id: id},req.body)
		if(user){
			res.status(200).json('user details updated');

		}
		else{
			res.status(404).json("user not found");
		}
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
		console.log('error in updateing', error);
	}
})


dashboardController.delete('delete/:id', async (req, res)=>{

	try {
		const {id}= req.params;
		await AddressBook.findOneAndDelete({_id : id})
		res.status(200).json('user details deleted successfully');
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
		console.log('error in deleteing', error);
	}


});


module.exports = { dashboardController };

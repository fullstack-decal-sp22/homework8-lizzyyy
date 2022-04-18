const express = require("express");
const router = express.Router();
const auth = require("./../middleware/auth");

const User = require("../model/User");

router.get('/list', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.shoppinglist);
    } catch(e) {
        res.send({message: "Error in Fetching User"});
    }
});

router.post('/add', auth, async(req, res) => {
    try {        
        const item = req.body.item;
        const user = await User.findById(req.user.id);
        User.findOneAndUpdate({user},{$push: {shoppinglist: item}}, {new: true}, function(err, User) {
            if (err) {
                console.log(err);
                res.json({msg: "Failed to add to shopping list"})
            } else {
                console.log(User)
                res.json({
                    status: "Item added successfully",
                    shoppinglist: User.shoppinglist
                })
            }
        })
    } catch(e) {
        res.send({message: "Failed to add to shopping list"});
    }
});

router.delete('/delete', auth, async(req,res) => {
    try {
        const item = req.body.item;
        const user = await User.findById(req.user.id);
        User.findOneAndUpdate({user},{$pull: {shoppinglist: item}}, {new: true}, function(err, User) {
            if (err) {
                console.log(err);
                res.json({msg: "Failed to delete from shopping list"})
            } else {
                console.log(User)
                res.json({
                    status: "Item deleted successfully",
                    shoppinglist: User.shoppinglist
                })
            }
        })
    } catch(e) {
        res.send({message: "Failed to delete from shopping list"});
    }
})

module.exports = router;
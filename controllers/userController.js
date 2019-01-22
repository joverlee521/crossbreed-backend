// Main User Controller
// ============================
const db = require('../db/models');
module.exports = {
  //Find (one) user
  //This can be done by anyone, as we are ONLY showing the pets that person has
  //We might use this when a person views their pal's stable (for example)
  findOne: function(req, res) {
    db.User.findById(req.params.userId, '_id pets eggs displayName' ) //never return any other user info!
    .then(results => res.json(results))
    .catch(err=> res.json(err));
  },

  //==========
  //PROTECTED ROUTES
  //USER MUST BE AUTHENTICATED FOR THESE ACTIONS
  //==========
  //(TO-DO)
  // Delete one
  // NOTE: deleting a user should also delete the pets they have on the site
  delete: function(req, res) {
    //(TO-DO) first, check that the token we got from the user is legit
    //(TO-DO) feels like we need to check the token here
    if(!req.body._id) {
      return res.sendStatus(403);
    }

    //Also make sure that the routes are sane - the id from the param should also equal the id in the body, or someone might be somewhere they aren't supposed to be
    if( req.body._id !== req.params.userId) {
      return res.sendStatus(403);
    }

    //(TO-DO) check if we need to do anything to also delete the pets!!
    db.User.findByIdAndDelete(req.body._id)
    .then(result=>{
      if(!result) {
        return res.sendStatus(404);
      }
       return res.json({deleted: true}); 
    })
    .catch(err=>res.json(err));
  },
  
  // Update the specified user's pet list
  update: function(req, res) {
    //(TO-DO) first, check that the token we got from the user is legit
    //(TO-DO) feels like we need to check the token here
    if(!req.body._id) {
      return res.sendStatus(403);
    }

    //Also make sure that the routes are sane - the id from the param should also equal the id in the body, or someone might be somewhere they aren't supposed to be
    if( req.body._id !== req.params.userId) {
      return res.sendStatus(403);
    }

    //Next, check that the thing the user is trying to do is allowed
    //Things the user is allowed to update themselves: 
    //1) their display name (so long as the new one is unique)
    //2) which pets they have
    if(!req.body.pets && !req.body.displayName) {
      return res.sendStatus(400);
    }
    //Set the options
    const options = {$set: {}};
    
    //(TO-DO) consider if we should be using a push here instead?  will need to look at 
    if(req.body.pets) {
      options.$set['pets'] = req.body.pets;
    }

    if(req.body.displayName) {
      options.$set['displayName'] = req.body.displayName;
    }

    //finally, try to perform the update   
    db.User.findByIdAndUpdate(req.body._id, options, {select: '_id pets displayName', new: true })
      .then(result => { 
        if(!result) {
          return res.sendStatus(404);
        } 
        return res.json(result);
      })
      .catch(err => res.json(err));
  }

};

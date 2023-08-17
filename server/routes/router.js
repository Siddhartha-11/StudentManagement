const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');
const Userdb = require('../model/model');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/admin', services.homeRoutes);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-user', services.add_user)

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', services.update_user)







// API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);
// route.get('/api/users', controller.find);

// Assuming you have a route for viewing a user
// Assuming you have a route for viewing a user
route.get('/users/:email', (req, res) => {
    const userEmail = req.params.email;
    
    // Fetch the user data from the database using the userEmail
    // Example: Assuming you have a 'users' collection in MongoDB
    Userdb.findOne({ email: userEmail }, (err, user) => {
      if (err) {
        // Handle the error
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      if (!user) {
        // Handle the case when user is not found
        res.status(404).send('User not found');
        return;
      }
    //   console.log(user)
      // Render the 'view_user' template and pass the user data
      res.render('view_user', { user: user });
    });
  });



  route.get('/', services.login );
  




module.exports = route
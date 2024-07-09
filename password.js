const express = require('express')
const userModel = require('../models/filename')
const passRoutes = express.Router();

passRoutes.post('/updatepassword', async (req, res) => {
    let newpass = req.body.newpassword;
    let authHeader = req.headers.authorization;

    let token  = authHeader && authHeader.split(" ")[1];
  
    try {
      const result = jwt.verify(token, process.env.SECURITY_KEY);
      const userId = result.userId;
  
      const hashedPassword = await bcrypt.hash(newpass, 10);
  
      await userModel.findByIdAndUpdate(userId, { password: hashedPassword });
      res.send('Password updated successfully');
    } catch (error) {
      res.status(500).send('Error updating password');
    }
  });
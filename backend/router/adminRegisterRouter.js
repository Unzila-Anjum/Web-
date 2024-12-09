import express from "express";
import { adminSignIn } from "../controllers/usersController.js";

import AdminRegisterController from "../controllers/adminRegisterController.js";

const router = express.Router();


// Register admin
router.post('/register', async (req, res) => {
    try {
      await AdminRegisterController.createAdmin(req, res);
    } catch (err) {
      console.error('Error in admin registration route:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Admin login
  router.post('/signin', async (req, res) => {
    try {
      await AdminRegisterController.adminSignIn(req, res);
    } catch (err) {
      console.error("Error in admin sign-in route:", err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
export default router;


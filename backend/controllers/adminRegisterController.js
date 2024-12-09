import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Admin from '../models/adminRegisterSchema.js';

class AdminRegisterController {
  // Create a new admin
  static async createAdmin(req, res) {
    try {
      const { name, email, password } = req.body;

      // Validate input fields
      if (!name || !email || !password) {
        return res.status(400).json({ 
          message: 'All fields (name, email, password) are required' 
        });
      }

      // Check if admin already exists
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(409).json({ 
          message: 'Admin with this email already exists' 
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          message: 'Invalid email format' 
        });
      }

      // Validate password strength
      if (password.length < 8) {
        return res.status(400).json({ 
          message: 'Password must be at least 8 characters long' 
        });
      }

      

      // Create a new admin
      const newAdmin = new Admin({
        name,
        email,
        password,
      });

      await newAdmin.save();

      // Generate a JWT token
      const token = jwt.sign(
        { id: newAdmin._id, email: newAdmin.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(201).json({ 
        message: 'Registration successful', 
        token 
      });
    } catch (error) {
      console.error("Error during admin registration:", error);
      res.status(500).json({ message: 'Server error, please try again later.' });
    }
  }

  static async adminSignIn(req, res) {
    const { email, password } = req.body;
  
    try {
      // Validate input fields
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Please provide both email and password",
        });
      }
  
      // Check if the admin exists
      const existingAdmin = await Admin.findOne({ email });
      if (!existingAdmin) {
        console.error("No admin found with this email:", email);
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
  
      console.log("Found Admin:", existingAdmin); // Debugging
  
      // Compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, existingAdmin.password);
  
      if (!isPasswordValid) {
        console.error("Password mismatch:", {
          inputPassword: password,
          storedPassword: existingAdmin.password,
        });
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
  
      console.log("Password is valid"); // Debugging
  
      // Generate a JWT token
      const token = jwt.sign(
        { id: existingAdmin._id, email: existingAdmin.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      // Return success response with the token
      res.status(200).json({
        success: true,
        message: "Admin signed in successfully",
        token,
      });
    } catch (err) {
      console.error("Error during admin sign-in:", err);
      res.status(500).json({
        success: false,
        message: 'Server error during sign-in, please try again later.',
      });
    }
  }
}  

export default AdminRegisterController;

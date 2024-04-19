import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js'



  const authUser = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email });
  
    return user
  });




  export default authUser;
import User from "../models/User.js";

export const checkUserAddress = async (req, res) => {
  try {
    const { operation } = req.query;
    const userId = req.user.id;

    const validOperations = ['add', 'remove', 'isAdded'];
    if (!validOperations.includes(operation)) { 
      return res.status(400).json({ message: 'Invalid operation' });
    }

    // 1. Check if Address Exists
    if (operation === 'isAdded') {
      const user = await User.findById(userId); // Use findById if using MongoDB _id
      
      const hasAddress = !!(user && user.address && user.address.country);
      
      return res.status(200).json({
        message: hasAddress ? 'Address exists' : 'Address not added',
        isAddressAdded: hasAddress,
        address: hasAddress ? user.address : null
      });
    }

    // 2. Add/Update Address
    if (operation === 'add') {
      const { country, state, city, pincode, landmark } = req.body.address;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { 
          $set: { 
            address: { country, state, city, pincode, landmark } 
          } 
        },
        { new: true, runValidators: true }
      );

      return res.status(200).json({
        message: 'Address updated successfully',
        address: updatedUser.address
      });
    }

    // 3. Remove Address
    if (operation === 'remove') {
      await User.findByIdAndUpdate(userId, { $unset: { address: "" } });
      return res.status(200).json({ message: 'Address removed' });
    }

  } catch (error) {
    console.error("Address Error:", error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
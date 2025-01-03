const { imageUploadUtil } = require("../../helpers/cloudinary");
const User = require("../../models/User");

//add a new Review
// const addUser = async (req, res) => {
//   try {
//     const { image, icon, userName, review } = req.body;

//     const newlyCreatedUser = new Users({
//       image,
//       icon,
//       userName,
//       review,
//     });

//     await newlyCreatedReview.save();
//     res.status(201).json({
//       success: true,
//       data: newlyCreatedReview,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Error occured",
//     });
//   }
// };

//fetch all Review
const fetchAllUsers = async (req, res) => {
  try {
    const listOfUsers = await User.find({});
    res.status(200).json({
      success: true,
      data: listOfUsers,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//edit a Review
// const editUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { image, email, role, userName } = req.body;

//     let findUser = await User.findById(id);
//     if (!findUser)
//       return res.status(404).json({
//         success: false,
//         message: "Review not found",
//       });

//     findUser.userName = userName || findUser.userName;
//     findUser.email = email || findUser.email;
//     findUser.image = image || findUser.image;
//     findUser.role = role || findUser.role;
//     await findUser.save();

//     res.status(200).json({
//       success: true,
//       data: findUser,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Error occured",
//     });
//   }
// };

//delete a Review
// const deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleteUser = await User.findByIdAndDelete(id);

//     if (!deleteUser)
//       return res.status(404).json({
//         success: false,
//         message: "Review not found",
//       });

//     res.status(200).json({
//       success: true,
//       message: "Review delete successfully",
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Error occured",
//     });
//   }
// };

module.exports = {
  fetchAllUsers,
  //   editUser,
  //   deleteUser,
};

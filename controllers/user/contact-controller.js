const Contact = require("../../models/contact");

// Add a new contact query
const addContactQuery = async (req, res) => {
  const { name, email, phone, comment } = req.body;
  try {
    const checkEmail = await Contact.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({
        success: false,
        message: "You Already submitted Your Query with this Email",
      });
    } else {
      const newContact = new Contact({ name, email, phone, comment });
      await newContact.save();
      res.status(200).json({
        message: "You Query submitted successfully",
        success: true,
        data: newContact,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

// Delete a contact query by ID
const deleteContactQuery = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting contact", error: error.message });
  }
};

const fetchAllContactQuery = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    if (Contact.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Contacts not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Contacts fetched successfully",
      data: contacts,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error fetching contacts",
      error: error.message,
      success: false,
    });
  }
};

module.exports = {
  addContactQuery,
  deleteContactQuery,
  fetchAllContactQuery,
};

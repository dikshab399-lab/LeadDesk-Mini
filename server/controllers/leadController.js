const Lead = require("../models/Lead");

// Create a new lead
const createLead = async (req, res) => {
  try {
    const { name, email, budget, message } = req.body;

    // Validation
    if (!name || !email || !budget || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if email already exists
    const existingLead = await Lead.findOne({ email });

    if (existingLead) {
      return res.status(400).json({
        success: false,
        message: "Lead already exists",
      });
    }

    // Create Lead
    const lead = await Lead.create({
      name,
      email,
      budget,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: lead,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all leads
const getAllLeads = async (req, res) => {
  try {

    const leads = await Lead.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const updateLeadStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      {
        status: status
      },
      {
        new: true
      }
    );


    if (!lead) {
      return res.status(404).json({
        success:false,
        message:"Lead not found"
      });
    }


    res.json({
      success:true,
      message:"Lead status updated",
      data:lead
    });


  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};
const searchLeads = async (req, res) => {

    try {

        const { keyword } = req.query;


        if(!keyword){
            return res.status(400).json({
                success:false,
                message:"Please provide search keyword"
            });
        }


        const leads = await Lead.find({
            $or:[
                {
                    name:{
                        $regex: keyword,
                        $options:"i"
                    }
                },
                {
                    email:{
                        $regex: keyword,
                        $options:"i"
                    }
                },
                {
                    phone:{
                        $regex: keyword,
                        $options:"i"
                    }
                }
            ]
        });


        res.status(200).json({
            success:true,
            count: leads.length,
             data: leads
        });


    } catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};

module.exports = {
 createLead,
 getAllLeads,
 updateLeadStatus,
 searchLeads
};


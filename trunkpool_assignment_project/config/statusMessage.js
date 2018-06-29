/**
 * Created by Jaydeep on 6/28/2018.
 */
module.exports = {
  projectTitle:{
    title:"Login via google Account"
  },
  internalServerError:{
    statusCode:500,
    statusMessage:"Internal Server Error"
  },
  getResponse:{
    statusCode:200,
    statusMessage:"Found some records"
  },
  updateResponse:{
    statusCode:200,
    statusMessage:"Updated successfully"
  },
  addResponse:{
    statusCode:201,
    statusMessage:"Created Successfully"
  },
  badRequestResponse:{
    statusCode:400,
    statusMessage:"Required Information is missing"
  },
  pageNotFound:{
    statusCode:404,
    statusMessage:"Page Not Found"
  },
  deleteResponse:{
    statusCode:204,
    statusMessage:"Deleted successfully"
  },
  unavailableResponse:{
    statusCode:503,
    statusMessage:"API server unavailable right now"
  }
};
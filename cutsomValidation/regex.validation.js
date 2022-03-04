// validate email 
const validateEmail = (email) => {

  var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,20})+$/;
  
  return regex.test(email)
};

// Password Validate
const validatepassword = (pass) => {
  
  var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/;

  return regex.test(pass);
}


// valid phone number
const validatephoneno = (phonenumber) => {
  
  var regex = /^\d{10}$/;
  
  return regex.test(phonenumber);
}

module.exports = {
  validateEmail,
  validatepassword,
  validatephoneno
}
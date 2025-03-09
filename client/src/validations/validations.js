export const validateName = (name) => {
  return /^[A-Za-z\s]{3,}$/.test(name);   /// validations for name this will return true
};

export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);   /// validations for email this will return true
};


export const validatePassword = (password) => {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test( 
    password
  );
  /// validations for password this will return true
};

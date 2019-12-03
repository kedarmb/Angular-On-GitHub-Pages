export const API_URL = ' https://rt7ynesqck.execute-api.us-east-1.amazonaws.com/dev/api';
export const regex = {
nameReg: /^[a-zA-Z0-9](.*[a-zA-Z0-9])?$/,
alphaNumeric: '',
alphaFive: '',
alphaThirty: '',
emailReg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
organizationName: '',
alphabetOnly: '^[^-\s][a-zA-Z0-9_\s-]+$', // should not contain numbers & special Charecters,
phoneNumber: /^[6-9]\d{9}$/,

  passwordPattern: '(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{8,}'
};
export const errorMsg = {
      email: 'Email address is not valid',
      nameErr: 'Name must be at least 5 chars, must not exceed 30 chars & must not start or end with special chars',
      orgName: 'Organization Name',
      nameMessage:  'This field should not start with space and should not contain numbers & special Charecters',
      passwordMessage: 'Password should be at least 8 digits & should contain one number and one special charecter',
      requiredField: 'This field is required',
      phoneMsg: 'Phone number should have max 10 digits & should not contain any special charecters'
      };

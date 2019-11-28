export const API_URL = ' https://rt7ynesqck.execute-api.us-east-1.amazonaws.com/dev/api';
export const regex = {
         emailReg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
         // emailReg : '/A-Z/'
         nameReg: /^[a-zA-Z0-9](.*[a-zA-Z0-9])?$/, //Arup: 25-11-19 pattern all chars including special chars BUT not start & end with spcl chars.
         alphaNumeric: '',
         alphaFive: '',
         alphaThirty: '',
         organizationName: ''
       };
export const errorMsg = {
         email: 'Email address is not valid',
         nameErr: 'Name must be at least 5 chars, must not exceed 30 chars & must not start or end with special chars',
         orgName: 'Organization Name',
         nameMessage:  'this field Should not contain numbers'
       };

import { environment } from 'environments/environment';

export const API_URL = ' https://smartbid-api.herokuapp.com/v1';
export const regex = {

nameReg: /^[a-zA-Z0-9](.*[a-zA-Z0-9])?$/,
alphaNumeric: '',
alphaFive: '',
alphaThirty: '',
emailReg:
// tslint:disable-next-line: max-line-length
/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
organizationName: '',
  alphabetOnly: /^[A-Za-z]+$/, // should not contain numbers & special Charecters,
  phoneNumber: /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/,

  passwordPattern:
  '(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{8,}'
};
export const errorMsg = {
  email: 'Email address is not valid',
  nameErr: 'Name must be at least 5 chars, must not exceed 30 chars & must not start or end with special chars',
  orgName: 'Organization Name',
  nameMessage: 'This field should not start with any special charecters and should not contain special charecters',
  passwordMessage: 'Password should be at least 8 digits & should contain one number and one special charecter',
  requiredField: 'This field is required',
  phoneMsg: 'Please enter valid phone number'
};

export const ApiUrl = {
  baseUrl: environment.baseURL,
  LabourUrl: urlCreator('/labour'),
  orgUrl: urlCreator('/organization'),
  UserUrl: urlCreator('/user'),
  sectionUrl: urlCreator('/section'),
  tenderUrl: urlCreator('/tender'),
  lineItems: urlCreator('/item'),  // this is only for testing purposes. Real data to fetch with ID
  equipmentUrl: urlCreator('/equipment'),
  crewTemplateUrl: urlCreator('/crewTemplate'),
  lineItemUrl: urlCreator('/item'),
  subItemUrl: urlCreator('/subitem'),
  loginUrl: urlCreator('/auth/login'),
  createAcc: authUrlCreator('/auth/register'),
  trenchUrl: authUrlCreator('/trench')
}

function urlCreator(actionName: string): string {
  return `${environment.baseURL}${actionName}`;
};
function authUrlCreator(actionName: string): string {
  return `${environment.baseURL}${actionName}`;
};


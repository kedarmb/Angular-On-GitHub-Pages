import { environment } from 'environments/environment';

export const API_URL = ' https://smartbid-api.herokuapp.com/v1';
export const regex = {
  nameReg: /^[a-zA-Z0-9](.*[a-zA-Z0-9])?$/,
  alphaNumeric: /^[a-z0-9]+$/i,
  numeric: /^[0-9]*$/,
  numericDecimal: /^(\d*\.)?\d+$/,
  alphaFive: '',
  alphaThirty: '',
  emailReg:
    // tslint:disable-next-line: max-line-length
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  organizationName: '',
  alphabetOnly: /^[A-Za-z]+$/, // should not contain numbers & special Charecters,
  phoneNumber: /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/,

  passwordPattern:
    '(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{8,}'
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
const tender = '/tender';
export const ApiUrl = {
  baseUrl: environment.baseURL,
  LabourUrl: urlCreator('/labour'),
  equipmentUrl: urlCreator('/equipment'),
  orgUrl: urlCreator('/organization'),
  labourEquipment: urlCreator('/labourequipment'),
  UserUrl: urlCreator('/user'),
  sectionUrl: urlCreator('/section'),
  tenderUrl: urlCreator('/tender'),
  tendersUrl: urlCreator('/tender'),
  lineItemUrl: urlCreator('/line-item'), // this is only for testing purposes. Real data to fetch with ID
  crewTemplateUrl: urlCreator('/crewTemplate'),
  subItemUrl: urlCreator('/subitem'),
  sublineItemUrl: urlCreator('/subline-item'),
  loginUrl: urlCreator('/auth/login'),
  createAcc: authUrlCreator('/auth/register'),
  createTrench: authUrlCreator('/trench'),
  trenchUrl: authUrlCreator('/trench'),
  trenchForOrg: authUrlCreator('/trench/getAll/0/0'),
  notifiedSubsUrl: authUrlCreator('/tender/'),
  inviteSubUrl: authUrlCreator(`/tender/headerlevelNotifySub`),
  createSubline: sublineUrlCreator('/tender/'),
  createUniqueSubline: sublineUrlCreator('/getUniqueSubLine/tender'),
  selectedsublineUrl: sublineUrlCreator('/selectedSub/tender/'),
  seletedSubForLineUrl: sublineUrlCreator('/seletedSubForLine/tender/'),
  seleteDeselectSubUrl: sublineUrlCreator('/selectDeselect/tender/'),
  pdfParserUrl: authUrlCreator('/pdf-parser')
};

function urlCreator(actionName: string): string {
  return `${environment.baseURL}${actionName}`;
}
function authUrlCreator(actionName: string): string {
  return `${environment.baseURL}${actionName}`;
}
function sublineUrlCreator(actionName: string): string {
  return `${environment.sublineURL}${actionName}`;
}

export const orgType = [{ name: 'Client' }, { name: 'Sub' }, { name: 'Prime' }];
export const userStats = [{ name: 'Inactive' }, { name: 'Active' }];
export const userRole = [{ name: 'Admin' }, { name: 'User' }];
export const modeOfSubmission = [
  { name: 'online' },
  { name: 'handwritten' },
  { name: 'print' },
  { name: 'electronic' }
];

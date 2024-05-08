/**
 * @format
 */

import 'react-native';
// import React from 'react';
// import App from '../App';

// Note: import explicitly to use the types shipped with jest.
import {it, describe, expect} from '@jest/globals';
import isValidEmail from '../src/screens/validation/Email';
import isValidName from '../src/screens/validation/Username';
import {isValidPassword} from '../src/screens/validation/Password';
import isValidPhoneNumber from '../src/screens/validation/PhoneNumber';

describe('First Name & Last Name Testing', () => {
  it('Valid for first/last name with length equal to 2 (طه).', () => {
    expect(isValidName('طه')).toBeTruthy();
  });

  it('Valid for first/last name with length equal to 25 (احمد حسن اسماعيل باسل حسن).', () => {
    expect(isValidName('احمد حسن اسماعيل باسل حسن')).toBeTruthy();
  });

  it('Not-valid for first/last name with length equal to 1 (م).', () => {
    expect(isValidName('م')).toBeFalsy();
  });

  it('Not-valid for first/last name with length equal to 26 (احمد حسن اسماعيل باسل حسني).', () => {
    expect(isValidName('احمد حسن اسماعيل باسل حسني')).toBeFalsy();
  });

  it('Not-valid for first/last name empty string', () => {
    expect(isValidName('')).toBeFalsy();
  });
});

describe('Password Testing', () => {
  it('Valid for password with length equal to 8 and have all conditions.\n\tpassword = Abur@yy1', () => {
    expect(isValidPassword('Abur@yy1')).toBeTruthy();
  });

  it('Valid for password with length equal to 15 and have all conditions.\n\tpassword = Abur@yy1azain_A', () => {
    expect(isValidPassword('Abur@yy1azain_A')).toBeTruthy();
  });

  it('Not-valid for password with length equal to 7 and have all conditions.\n\tpassword = Abur@yy', () => {
    expect(isValidPassword('Abur@yy')).toBeFalsy();
  });
  // TODO:: Edit the Password with length 16 and 15 in the document
  it('Not-valid for password with length equal to 16 and have all conditions.\n\tpassword = Abur@yy1azain_AA', () => {
    expect(isValidPassword('Abur@yy1azain_AA')).toBeFalsy();
  });

  it("Not-valid for password with correct length and haven't all conditions.\n\tpassword = Abur@abued", () => {
    expect(isValidPassword('Abur@abued')).toBeFalsy();
  });

  it('Not-valid for password with empty field.', () => {
    expect(isValidPassword('')).toBeFalsy();
  });
});

describe('Email Testing', () => {
  it('Valid for email with length 6\n\temail = a@a.aa', () => {
    expect(isValidEmail('a@a.aa')).toBeTruthy();
  });

  // TODO:: Edit this in document the email length is wrong
  it('Valid for email with length 100\n\temail = random.userrrrrr1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@example.com', () => {
    expect(
      isValidEmail(
        'random.userrrrrr1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@example.com',
      ),
    ).toBeTruthy();
  });
  it('Not-valid for email with length 5\n\temail = a@a.aa', () => {
    expect(isValidEmail('a@a.a')).toBeFalsy();
  });
  // TODO:: Edit this in document the email length is wrong

  it('Not-valid for email with length 101\n\temail = random.userrrrrrr1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@example.com', () => {
    expect(
      isValidEmail(
        'random.userrrrrrr1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@example.com',
      ),
    ).toBeFalsy();
  });

  it('Valid for email = zaaburayya20@cit.just.edu.jo', () => {
    expect(isValidEmail('zaaburayya20@cit.just.edu.jo')).toBeTruthy();
  });

  it('Not-valid for email a.d@_dao@.ae', () => {
    expect(isValidEmail('a.d@_dao@.ae')).toBeFalsy();
  });
});

describe('Phone-number Testing', () => {
  it('Valid for phone-number with length 13\n\tphone-number = +96795927353', () => {
    expect(isValidPhoneNumber('+962795927353')).toBeTruthy();
  });

  it('Not-valid for phone-number with length 14\n\tphone-number = +967959273533', () => {
    expect(isValidPhoneNumber('+9627959273533')).toBeFalsy();
  });

  it('Not-valid for phone-number with length 12\n\tphone-number = +9679592735', () => {
    expect(isValidPhoneNumber('+96279592735')).toBeFalsy();
  });

  it('Not-valid for phone-number with correct length and incorrect phone-start-number\n\tphone-number = +96705927353 , must be +96279 , +96278 or +96277.', () => {
    expect(isValidPhoneNumber('+962705927353')).toBeFalsy();
  });
});

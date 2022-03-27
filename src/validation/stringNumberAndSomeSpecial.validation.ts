import {AjvFormat} from '@loopback/rest';

export const stringNumberAndSomeSpecialValidation: AjvFormat = {
  name: 'stringNumberAndSpecial',
  type: 'string',
  validate: (data: string) => {
    return new RegExp(/^[^~`@#$%^&*()+={}[\]:;<>?\/]+$/gm).test(data);
  },
};

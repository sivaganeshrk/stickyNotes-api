import {AjvFormat} from '@loopback/rest';
export const uuidValidation: AjvFormat = {
  name: 'uuid',
  type: 'string',
  validate: (data: string) => {
    return new RegExp(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
    ).test(data);
  },
};

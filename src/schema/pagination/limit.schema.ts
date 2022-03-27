import {ParameterObject} from '@loopback/rest';

export const limitSchema: Partial<ParameterObject> = {
  schema: {
    type: 'number',
    additionalProperties: false,
  },
};

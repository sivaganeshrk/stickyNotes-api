import {ParameterObject} from '@loopback/rest';

export const pageSchema: Partial<ParameterObject> = {
  schema: {
    type: 'number',
    additionalProperties: false,
  },
};

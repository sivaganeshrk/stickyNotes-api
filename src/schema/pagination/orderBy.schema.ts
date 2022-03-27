import {ParameterObject} from '@loopback/rest';

export const orderBySchema: Partial<ParameterObject> = {
  schema: {
    type: 'number',
    additionalProperties: false,
  },
};

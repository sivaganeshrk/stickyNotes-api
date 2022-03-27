import {ParameterObject} from '@loopback/rest';
import {stringNumberAndSomeSpecialValidation} from '../../validation';

export const sortBySchema: Partial<ParameterObject> = {
  schema: {
    type: 'string',
    format: stringNumberAndSomeSpecialValidation.name,
    additionalProperties: false,
  },
};

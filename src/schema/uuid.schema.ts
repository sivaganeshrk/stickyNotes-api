import {ParameterObject} from '@loopback/rest';
import {uuidValidation} from '../validation';

export const uuidSchema = (fieldName = 'uuid'): Partial<ParameterObject> => {
  return {
    schema: {
      type: 'string',
      format: uuidValidation.name,
      additionalProperties: false,
    },
    errorMessage: {
      additionalProperties: 'Additional Properties are not allowed',
      type: `${fieldName} is not uuid format`,
    },
  };
};

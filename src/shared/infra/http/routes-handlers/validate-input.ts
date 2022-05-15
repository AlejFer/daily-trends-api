import { Request, Response, NextFunction } from 'express';
import ajv from 'ajv';
import { BadRequest } from '../../../domain';

/**
 * InputMap type definition
 */
export type InputMap = {
  type: string;
  properties: Record<string, unknown>;
  required: Array<string>;
};

/**
 * RequestProperty type definition
 */
export type RequestProperty = 'headers' | 'query' | 'params' | 'body';

/**
 * ValidatorOptions type definition
 */
export type ValidatorOptions = {
  caseInsensitive: boolean;
  requestProperty: RequestProperty;
};

/**
 * Validates input on endpoint request
 * @param validatorMap InputMap to validate against
 * @param options Validator Options
 * @returns Handler
 */
export function validateInput(
  validatorMap: InputMap,
  options: ValidatorOptions = { caseInsensitive: true, requestProperty: 'body' }
) {
  const validator = new ajv({
    coerceTypes: true,
  });

  const isValid = validator.compile(validatorMap);

  return async (req: Request, _res: Response, next: NextFunction) => {
    if (options.caseInsensitive) {
      const component: Record<string, unknown> = {};
      Object.keys(req[options.requestProperty]).forEach((key: string) => {
        component[key.toLowerCase()] = req[options.requestProperty][key];
      });
      req[options.requestProperty] = component;
    }
    if (!isValid(req[options.requestProperty])) {
      const err = new BadRequest('Invalid input.');
      return next(err);
    }

    return next();
  };
}

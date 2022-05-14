import { Request, Response, NextFunction } from 'express';
import ajv from 'ajv';
import { BadRequest } from '../../../domain';

export type InputMap = {
  type: string;
  properties: Object
  required: Array<string>;
}

export type PropertyType = {
  type: string;
};

export type RequestProperty = 'headers' | 'query' | 'params' | 'body';

export type ValidatorOptions = {
  caseInsensitive: boolean;
  requestProperty: RequestProperty;
}

export function validateInput(validatorMap: InputMap, options: ValidatorOptions = { caseInsensitive: true, requestProperty: 'body' }) {
  const validator = new ajv({
		coerceTypes: true,
	});

  const isValid = validator.compile(validatorMap);

  return async (req: Request, _res: Response, next: NextFunction) => {
    if (options.caseInsensitive) {
      const component: Record<string, any> = {};
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
  }
}

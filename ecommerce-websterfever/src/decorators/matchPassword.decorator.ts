/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// definimos nombre de validación y no es async
@ValidatorConstraint({
  name: 'MatchPassword',
  async: false,
})
export class MatchPassword implements ValidatorConstraintInterface {
  // Compara password con password de confirmación
  validate(password: string, args: ValidationArguments) {
    const object = args.object as Record<string, string>;

    if (password !== object[args.constraints[0]]) return false;

    return true;
  }

  // si validación falla...
  defaultMessage(args?: ValidationArguments): string {
    return 'Password and password confirmation do not match';
  }
}

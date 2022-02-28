import { InvalidParamError } from '../../errors'
import { EmailValidator } from '../../protocols'
import { Validation } from './validation'

export class EmailValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly validator: EmailValidator
  ) {}

  validate(input: any): Error | null {
    const isValid = this.validator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }

    return null
  }
}

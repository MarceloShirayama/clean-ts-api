import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field')
}

describe('RequiredFieldValidation', () => {
  it('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()

    const error = sut.validate({ name: 'any_name' })

    expect(error).toBeInstanceOf(MissingParamError)
  })

  it('Should not return if validation succeeds', () => {
    const sut = makeSut()

    const error = sut.validate({ field: 'any_name' })

    expect(error).toBeFalsy()
  })
})

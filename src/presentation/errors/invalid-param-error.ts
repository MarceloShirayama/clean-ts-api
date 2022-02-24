export class InvalidParamError extends Error {
  constructor(public readonly paramName: string) {
    super(`Invalid param: ${paramName}`)
    this.name = 'InvalidParamError'
  }
}

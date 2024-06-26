export enum ValidatorType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  OBJECT = 'object',
}

export type ValidationFunction = (
  value: unknown,
  path?: string[],
  key?: string,
) => void

export type GetPropValidatorFunction<T> = (
  key: keyof T,
) => Schema<T>[typeof key]

export type TestFunction<TData = unknown> = (
  value: Partial<TData>,
  path?: string[],
  key?: string,
) => void

interface ValidatorBase {
  validate: ValidationFunction
  type: ValidatorType
}

export interface StringValidator extends ValidatorBase {
  type: ValidatorType.STRING
}

export interface NumberValidator extends ValidatorBase {
  type: ValidatorType.NUMBER
}

export interface BooleanValidator extends ValidatorBase {
  type: ValidatorType.BOOLEAN
}

export interface ObjectValidator<TData> extends ValidatorBase {
  type: ValidatorType.OBJECT
  getProp: GetPropValidatorFunction<TData>
}

export type SchemaProp<TData> = TData extends object
  ? ObjectValidator<TData>
  : TData extends string
    ? StringValidator
    : TData extends number
      ? NumberValidator
      : TData extends boolean
        ? BooleanValidator
        : ValidatorBase

export type Schema<TData> = {
  [P in keyof TData]-?: SchemaProp<TData[P]>
}

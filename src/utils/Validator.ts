import { validate, ValidationError } from 'class-validator';

export async function validateEntity<T extends object>(entity: T): Promise<string[]> {
  const errors: ValidationError[] = await validate(entity);
  const errorMessages: string[] = [];

  errors.forEach(error => {
    if (error.constraints) {
      errorMessages.push(...Object.values(error.constraints));
    }
  });

  return errorMessages;
}

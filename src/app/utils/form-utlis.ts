import { FormArray, FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtils {
  //Expresiones regulares

  //getTexError
  static getTexError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Minimo de ${errors['minlength'].requiredLength} caracteres.`

        case 'min':
          return `Minimo de ${errors['min'].min} `
      }
    }
    return null
  }
  //isValidField
  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return !!form.controls[fieldName].errors && form.controls[fieldName].touched;
  }
  //getFieldError
  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;
    const errors = form.controls[fieldName].errors ?? {};
    return FormUtils.getTexError(errors);
  }
  //isValidFieldInArray
  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    )
  }
  //getFieldErrorInArray
  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
    if (formArray.controls.length == 0) return null;
    const errors = formArray.controls[index].errors ?? {};
    return FormUtils.getTexError(errors);
  }
}

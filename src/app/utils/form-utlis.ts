import { FormArray, FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtils {

  //Expresiones regulares
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]@[a-z0-9.-]+\\.[a-z]{2,4}';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
  /*
 {
  "pattern":{
    "requiredPattern:"^[a-z0-9._%+-]@[a-z0-9.-]+\\.[a-z]{2,4}$",
    "actualValue": "asdf"
  }
  }
 **/

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

        case 'email':
          return `El valor ingresado no es un correo electronico  `


        case 'pattern':
          if (errors['pattern'].requiredPattern == FormUtils.emailPattern) {
            return 'El correo electronico no es permitido'
          }
          return 'Error de patron contra expresion regular'


        default:
          return `Error de validacion no controlado ${key}`
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

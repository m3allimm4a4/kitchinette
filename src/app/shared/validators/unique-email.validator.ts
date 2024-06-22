import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { iif, map, Observable, of, switchMap, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class UniqueEmailValidator {
  public static create(http: HttpClient): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> =>
      timer(500).pipe(
        switchMap(() =>
          iif(
            (): boolean => control.dirty && !!control.value && control.value !== '',
            http.get<{ valid: boolean }>('/validation/unique-email', { params: { email: control.value } }),
            of(null),
          ),
        ),
        map(result => (result?.valid ? null : { uniqueEmail: { error: 'Not available' } })),
      );
  }
}

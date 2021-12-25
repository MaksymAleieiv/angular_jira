import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmEqual } from 'src/app/directives/confirm-equal.directive';
import { CurrentUserApiService } from 'src/app/services/api/current-user-api.service';
import { SnackBarService } from 'src/app/services/other/snack-bar.service';
import { CurrentUserStoreService } from 'src/app/services/store/current-user-store.service';
import { ApiErrorResponse } from '../Interfaces/ApiErrorResponse';
import { RegistrationFormValues } from '../Interfaces/RegistrationFormValues';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  registrationForm!: FormGroup;
  loading: boolean = false;

  constructor(
      private authApi: CurrentUserApiService,
      private snackBar: SnackBarService,
      private route: ActivatedRoute,
      private router: Router,
      private currentUserStore: CurrentUserStoreService
    ) {}

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(): void {
    this.registrationForm = new FormGroup({
      name: new FormControl('', {
        validators : [Validators.required, Validators.maxLength(32)],
        updateOn: 'blur'
      }),
      email: new FormControl('', {
        validators : [Validators.required, Validators.email],
        updateOn: 'blur'
      }),
      password: new FormControl('', {
        validators : [Validators.required, Validators.minLength(4), Validators.maxLength(16)],
        updateOn: 'blur'
      }),
      confirmPassword: new FormControl('', {
        validators : [Validators.required, Validators.minLength(4), Validators.maxLength(16)],
        updateOn: 'blur'
      })
    }, {
      validators: ConfirmEqual
    });
  }
  
  get name() { return this.registrationForm.get('name'); }

  get email() { return this.registrationForm.get('email'); }
  
  get password() { return this.registrationForm.get('password'); }

  get confirmPassword() { return this.registrationForm.get('confirmPassword'); }

  get form() { return this.registrationForm }

  onSubmit(): void {
    if(this.registrationForm.valid && !this.loading) {
      this.loading = true;
      let formValues: RegistrationFormValues = {
        name: this.name?.value,
        email: this.email?.value,
        password: this.password?.value
      }
      this.authApi.registration(formValues)
        .subscribe({

          next: (res) => {
            console.log('Successfully registred')
            this.currentUserStore.setToken(res.token)
            this.loading = false;
            let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
            this.router.navigateByUrl(returnUrl);
          },

          error: (err) => {
            console.log('Error while trying to register the user');
            console.log(err);
            this.loading = false;
            if(err instanceof HttpErrorResponse) {
              let response: ApiErrorResponse = err.error;
              try{
                response.errors?.forEach(error => {
                  this.registrationForm.get(error.param)?.setErrors({
                    serverError: error.msg
                  })
                })
              }catch {}finally {
                this.loading = false;
                this.snackBar.open(response.message)
              }
            }
          }
        })
    }
  }

  onFocus(field: AbstractControl | null, sp: string = '') {
    if(sp === 'password') {
      this.registrationForm?.setErrors(null)
    }
    field?.setErrors(null)
  }

  onBlur(field: AbstractControl | null) {
    field?.updateValueAndValidity()
  }
}

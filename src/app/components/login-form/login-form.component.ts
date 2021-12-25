import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentUserApiService } from 'src/app/services/api/current-user-api.service';
import { SnackBarService } from 'src/app/services/other/snack-bar.service';
import { CurrentUserStoreService } from 'src/app/services/store/current-user-store.service';
import { ApiErrorResponse } from '../Interfaces/ApiErrorResponse';
import { LoginFormValues } from '../Interfaces/LoginFormValues';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;
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
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators : [Validators.required, Validators.email],
        updateOn: 'blur'
      }),
      password: new FormControl('', {
        validators : [Validators.required, Validators.minLength(4), Validators.maxLength(16)],
        updateOn: 'blur'
      })
    });
  }
  
  get email() { return this.loginForm.get('email'); }
  
  get password() { return this.loginForm.get('password'); }

  onSubmit(): void {
    if(this.loginForm.valid && !this.loading) {
      this.loading = true;
      let formValues: LoginFormValues = {
        email: this.email?.value,
        password: this.password?.value
      }
      this.authApi.login(formValues)
        .subscribe({

          next: (res) => {
            console.log('Successfully logged in');
            this.currentUserStore.setToken(res.token)
            this.loading = false;
            let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
            this.router.navigateByUrl(returnUrl);
          },

          error: (err) => {
            console.log('Error while trying to log in the user');
            console.log(err)
            if(err instanceof HttpErrorResponse) {
              let response: ApiErrorResponse = err.error;
              try{
                if(response.errors && response.errors?.length > 0)
                response.errors.forEach(error => {
                  this.loginForm.get(error.param)?.setErrors({
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
    }else this.loginForm.updateValueAndValidity()
  }

  onFocus(field: AbstractControl | null) {
    field?.setErrors({})
  }

  onBlur(field: AbstractControl | null) {
    field?.updateValueAndValidity()
  }
}


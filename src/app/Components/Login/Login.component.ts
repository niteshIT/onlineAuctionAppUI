import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/Auth/Auth.service';
import { UserStoreService } from 'src/app/Services/UserStore/UserStore.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {



  loginForm!: FormGroup

  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder, private userstore: UserStoreService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required]
    })
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.auth.logIn(this.loginForm.value)
        .subscribe({
          next: (res) => {
            this.toastr.success('Login Succesfully')
            console.log(res)
            this.auth.storeToken(res.token);
            this.loginForm.reset();
            const tokenPayload = this.auth.decodedToken();
            this.userstore.setUserIdForStore(tokenPayload.userid)
            this.userstore.setFullNameForStore(tokenPayload.unique_name);
            this.userstore.setRoleForStore(tokenPayload.role);
            console.log(tokenPayload.role)
            this.userstore.setLoginForStore(true)
            console.log(res.token);

            this.router.navigate(['/'])

          },
          error: (err) => {
            this.toastr.error('Invalid Credential');

            this.loginForm.reset();
          }
        })
    }
    else {
      //throw error
      console.log("invalid", this.loginForm.value)
      this.validateAllFormFields(this.loginForm);
      // alert("your form is invalid")
      this.toastr.error('your form is invalid')
    }
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        control.markAsDirty({ onlySelf: true })
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control)
      }


    })
  }

}

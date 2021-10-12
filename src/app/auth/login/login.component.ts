import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth/auth.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  loading = false

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.authService.logout();
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit()
  {
    this.loading = true;
    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).pipe(first())
    .subscribe(
      data => {
        this.router.navigate(['/admin/dashboard'])
      },
      error => {
        this.loading = false;
        this.toast.error('Invalid email and/or password!')
      });

  

  }

}

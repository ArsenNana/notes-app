import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from '../shared/model/loginDto';
import { SignedInUserDto } from '../shared/model/SignedInUserDto';
import { AlertService } from '../shared/service/alert.service';
import { AuthService } from '../shared/service/auth-service';
import { TokenStorageServiceService } from '../shared/service/token-storage-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  loading = false;
  isLoggedIn = false;
  isLogginFailed = false;
  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authService: AuthService,
    private tokenStorageServiceService: TokenStorageServiceService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    this.alertService.clear();

    if (this.form.invalid) {
      return;
    }

    //this.loading = true;

    this.authService.login(this.form.value).subscribe({
      next: (signedInUserDto: SignedInUserDto) => {
        this.tokenStorageServiceService.saveToken(signedInUserDto.jwtToken);
        this.tokenStorageServiceService.saveUser(signedInUserDto);
        this.isLoggedIn = true;
        this.isLogginFailed = false;
        //this.router.navigate(['/home']);
        window.alert('User logged in successfully!');
      },
      error: (msg: any) => {
        throw new Error(msg);
      }
    })



  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

}

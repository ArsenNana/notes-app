import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignedInUserDto } from '../shared/model/SignedInUserDto';
import { AlertService } from '../shared/service/alert.service';
import { AuthService } from '../shared/service/auth-service';
import { NotesService } from '../shared/service/notes.service';
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
  fieldTextType!: boolean;
  errorMessage!: String;
  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authService: AuthService,
    private tokenStorageServiceService: TokenStorageServiceService,
    private router: Router,
    private notesService: NotesService,

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
        if (signedInUserDto.notes) {
          this.notesService.initNotes(signedInUserDto.notes);
        }
        this.router.navigate(['/noteList']);
        //window.alert('User logged in successfully!');
      },
      error: (msg: any) => {
        this.isLogginFailed = true;
        this.loading = false;
        this.errorMessage = 'Username or password incorrect!';
        throw new Error(msg);
      }
    })



  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public toggleFieldTextType(): void {
    this.fieldTextType = !this.fieldTextType;
  }

}

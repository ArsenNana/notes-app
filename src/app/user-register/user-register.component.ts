import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/model';
import { AcountService } from '../shared/service/acount-service';
import { AlertService } from '../shared/service/alert.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  loading = false;
  submitted = false;
  user!: User;
  constructor(
    private aleartService: AlertService,
    private acountService: AcountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = new User(0,'','','','');
  }

  public onSubmit(form: NgForm): void {
  this.submitted = true;
    let user = form.value;

    //resets alerts 
    this.aleartService.clear();

    //stop if form is invalid
    if (form.invalid) {
      return;
    }

    this.loading = true;

    this.acountService.register(user).subscribe({
      
      next: (value: any) =>{
         this.aleartService.success('Registration successful', { keepAfterRouteChange: true});
         this.router.navigate(['../login']);
      },
      error: (msg: any) =>{
        this.aleartService.error(msg);
        this.loading = false;
      }
      
    });

  }

}

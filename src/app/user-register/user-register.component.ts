import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../shared/model';
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
    private aleartService: AlertService
  ) { }

  ngOnInit(): void {
  }

  public onSubmit(form: NgForm): void {
    this.submitted = true;
    let user = form.value;
    this.aleartService.clear();

    if (form.invalid) {
      return;
    }

  }

}

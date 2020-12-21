import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private fb: FormBuilder, private accountService: AccountService,
              private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      accountType: ['User'],
      username: ['', Validators.required],
      password: ['', [Validators.required,
        Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      birthDate: [null, Validators.required],
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup){
    return g.get('password').value ===
           // tslint:disable-next-line: object-literal-key-quotes
           g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/main');
      this.toastr.success('Account created');
    }, error => {
      console.log(error);
      if (typeof error.error === 'object' && error.error[0] != null && error.error[1] != null) {
        this.toastr.error(error.error[0].description + '<br />' + error.error[1].description, '', { enableHtml: true});
      }
      else if (typeof error.error === 'object' && error.error[0] != null) { //
        this.toastr.error(error.error[0].description, '', { enableHtml: true});
      }
      else {
        this.toastr.error(error.error);
      }
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}

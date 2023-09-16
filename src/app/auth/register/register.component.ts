import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css'
  ]
})
export class RegisterComponent {

  private formSubmited = false;
  private fb = inject(FormBuilder);
  public registerForm = this.fb.group({
    nombre:    ['', [ Validators.required, Validators.minLength(3) ]],
    email:     ['', [ Validators.required ]],
    password:  ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required, Validators.minLength(6) ]],
    terminos:  [true, [ Validators.required, Validators.minLength(3) ]],
  });

  crearUsuario() {
    this.formSubmited = true;
    console.log(this.registerForm);
  }
}

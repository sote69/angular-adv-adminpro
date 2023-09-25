import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css'
  ]
})
export class RegisterComponent {

  private usuarioService = inject(UsuarioService);
  private router = inject(Router);
  private formSubmited = false;
  private fb = inject(FormBuilder);
  public registerForm = this.fb.group({
    nombre:    ['David Fernández', [ Validators.required, Validators.minLength(3) ]],
    email:     ['test1@gmil.com', [ Validators.required, Validators.email ]],
    password:  ['123456', [ Validators.required, Validators.minLength(6) ]],
    password2: ['123456', [ Validators.required, Validators.minLength(6) ]],
    terminos:  [true, [ Validators.required, Validators.minLength(3) ]],
  },
  {
    validators:  this.passwordsIguales('password', 'password2')
  });

  crearUsuario() {
    this.formSubmited = true;
    console.log(this.registerForm);

    if (this.registerForm.valid) {

      this.usuarioService.crearUsuario(this.registerForm.value)
        .subscribe({
          next: (resp) => {
            console.log(resp);
          },
          error: (err) => {
            console.warn(err.error);
            Swal.fire('Error', err.error.msg, 'error');
          },
          complete: () => {}
        });
    }
    else {

    }
  }

  campoNoValido(campo :string) :boolean {

    if(this.registerForm.get(campo)?.invalid && this.formSubmited) {
      return true;
    }
    return false;
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmited;
  }

  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if (this.formSubmited && pass1 !== pass2) {
      return true;
    }
    else {
      return false;
    }
  }

  passwordsIguales(pass1Name :string, pass2Name :string) :(formGroup: AbstractControl) => ValidationErrors | null {

    return (formGroup :AbstractControl) :ValidationErrors | null => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
        return null;
      }
      else {
        pass2Control?.setErrors({ noIguales: true });
        return { noIguales: true };
      }
    }
  }
}

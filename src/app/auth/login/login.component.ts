import { Component, inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn! :ElementRef;

  private router = inject(Router);
  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private formSubmited = false;
  public loginForm = this.fb.group({
    email:     [localStorage.getItem('email') || '', [ Validators.required, Validators.email ]],
    password:  ['', [ Validators.required ]],
    remember:  [true],
  });

  ngAfterViewInit(): void {
    this.googleInit();
  }

  async googleInit() {
    await this.usuarioService.googleInit();
    this.usuarioService.googleApi.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // * customization attributes
    );
  }

  login() {
    this.usuarioService.loginUsuario(this.loginForm.value)
    .subscribe({
      next: (resp) => {

        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value!);
        } else {
          localStorage.setItem('email', '');
        }

        // * Navegar al dashboard
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      },
      complete: () => {}
    });
  }
}

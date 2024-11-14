import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import Swal from 'sweetalert2';
import { Router, RouterLink} from '@angular/router';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-usuario',
  imports: [RouterLink, ReactiveFormsModule],
  standalone: true,
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent {

  protected readonly localStorage = localStorage;

  loginForm: FormGroup;
  private auth = inject(AuthService);

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.nullValidator]],
      password: ['', [Validators.required, Validators.nullValidator]]
    });
  }

  getUserName(): string {
    const username = localStorage.getItem('name_user');
    if (username) {
      return username.split('@')[0];
    }
    return 'Usuario';
  }

  logOut(): void {
    localStorage.clear();
    Swal.fire({
      position: "center",
      icon: "warning",
      iconColor:'#FF0000',
      title: "Tu sesion ha terminado",
      showConfirmButton: false,
      timer: 1200
    });

}

  onSumbit(): void {
    if (this.loginForm.valid) {
      const {username, password} = this.loginForm.value;
      this.auth.getToken(username, password).subscribe((res: any) => {
          localStorage.setItem('token', res["access_token"]);
          localStorage.setItem('name_user', username);
          this.router.navigate(['/home']);
          console.log("logeo exitoso")

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Sesion Iniciada!",
            showConfirmButton: false,
            timer: 1200
          });

        },

        error => {
          console.error('Login failed', error);
          Swal.fire({
            title: "Credenciales invalidas",
            text: "Los campos pueden estar incorrectos",
            icon: "warning",
            iconColor:'#FF0000',
          })
        }
      );
    } else {
      Swal.fire({
        title: "Por favor verifica tu correo y contraseña",
        text: "Los campos no pueden estar vacíos o pueden estar incorrectos",
        icon: "warning",
        iconColor: '#FF0000',
      });
    }
  }

}

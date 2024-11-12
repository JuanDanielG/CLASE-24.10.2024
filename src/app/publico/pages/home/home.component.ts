import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export default class HomeComponent {

  protected readonly localStorage = localStorage;

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
      iconColor:'#b88db0',
      title: "Tu sesion ha terminado",
      showConfirmButton: false,
      timer: 12000
    });

}
}

import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  public usuario!:Usuario;

  constructor(private usuarioService: UsuarioService, private router: Router) {
    
    this.usuario = usuarioService.usuario;
  }
  logOut() {
    this.usuarioService.logOut();
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
  }
  buscar(termino: string) {
    if (termino.length === 0) {
      return;
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`)
  }

}

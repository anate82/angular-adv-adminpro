import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public imgSubs!: Subscription;

  constructor(private usuarioService: UsuarioService,
    private busquedasService: BusquedasService,
    private modalImagenService:ModalImagenService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs=this.modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(() => this.cargarUsuarios())
    
  }
  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe(({total,usuarios}) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      })
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  buscar(termino: string) {
    let usuarios:any = [];
    if (termino.length === 0) {
      this.usuarios = this.usuariosTemp;
      return;
    }
    this.busquedasService.buscar('usuarios', termino)
      .subscribe((resp) => {
        usuarios = resp;
        this.usuarios = usuarios;
      });
  }

  eliminarUsuarios(usuario: Usuario) {
    if (usuario.uid === this.usuarioService.uid) {
      Swal.fire('Error', 'No puede borrarse a si mismo', 'error')
    } else {
      Swal.fire({
        title: '¿Borrar usuario?',
        text: `Esta a punto de borrar a ${usuario.nombre}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, quiero eliminarlo'
      }).then((result) => {
        if (result.isConfirmed) {
          this.usuarioService.eliminarUsuarios(usuario)
            .subscribe(resp => {
            
              this.cargarUsuarios();
              Swal.fire(
                'Usuario borrado',
                `${usuario.nombre} fue eliminado correctamente`,
                'success'
              )
            })
        }
      })
    }
  }
  cambiarRole(usuario: Usuario) {
    this.usuarioService.guardarUsuario(usuario)
      .subscribe(resp => {
        Swal.fire('Modificado Role', `Se ha actualizado el role de ${usuario.role} al role ${usuario.role}`, 'success')
      })
  }
  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios',usuario.uid!,usuario.img!);
  }
}

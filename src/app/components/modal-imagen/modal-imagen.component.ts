import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir!: File;
  public imgTemp: any = null;
  constructor(public modalService:ModalImagenService, public fileUploadService:FileUploadService) { }

  ngOnInit(): void {
  }
  cerrarModal() {
    this.imgTemp = null;
    this.modalService.cerrarModal();
  }
  cambiarImagen(event: any){
    const file=event.target.files[0]
    this.imagenSubir = file;
    if (!file) return this.imgTemp= null;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
    return;
  }

  subirImagen() {
    const id = this.modalService.id;
    const tipo = this.modalService.tipo;

    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, id)
      .then(img => {
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
        this.modalService.nuevaImagen.emit(img);
        this.cerrarModal();
      }).catch(err => {
        Swal.fire('Error','No se pudo subir la imagen', 'error')
      })
  }

}

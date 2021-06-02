import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs!: Subscription;
  constructor(private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedasService:BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }
  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs=this.modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(() => this.cargarHospitales())
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales()
      .subscribe(hospitales => {
        this.cargando = false;
        this.hospitales = hospitales;

      })
  }
  guardarCambios(hospital:Hospital) {
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
      .subscribe(resp => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      })
  }
  eliminarHospital(hospital:Hospital) {
    this.hospitalService.borrarHospital(hospital._id)
      .subscribe(() => {
        this.cargarHospitales();
        Swal.fire('Eliminado', hospital.nombre, 'success');
      })
  }

  async abrirSweetAlert() {
    const {value=''} = await Swal.fire<string>({
      title:'Crear hospital',
      input: 'text',
      text:'Ingrese el nombre del nuevo hospital',
      showCancelButton:true,
      inputPlaceholder: 'Nombre del hospital'
    })
    if (value!.trim().length > 0) {
      this.hospitalService.crearHospital(value!)
        .subscribe(resp => {
          this.hospitales.push(resp.hospital);
        })
    }
  }
  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id,hospital.img!)
  }
  busquedaHospital(termino: string) {
    var hospital:any = [];
    if (termino.length === 0) {
      return;
    }
    this.busquedasService.buscar('hospitales', termino)
      .subscribe((resp) => {
        hospital = resp
        this.hospitales = hospital;
      })
    
  }

}

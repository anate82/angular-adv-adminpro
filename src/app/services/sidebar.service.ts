import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
      ]
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
      ]
    },
  ];
  cargarMenu() {
    this.menu = [];
    this.menu = JSON.parse(localStorage.getItem('menu')!);
  }

  constructor() { }
}

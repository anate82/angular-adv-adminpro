import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunction():any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  public date: String = "";
  constructor(private settingsService: SettingsService, private sidebarService:SidebarService) {
    this.date = new Date().getFullYear().toString();
  }

  ngOnInit(): void {
    customInitFunction();
    this.sidebarService.cargarMenu();
  }

}

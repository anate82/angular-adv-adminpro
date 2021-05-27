import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap, map, catchError } from 'rxjs/operators';
import { LoginForm, RegisterForm } from '../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  public auth2: any;
  public usuario!: Usuario;
  constructor(private http: HttpClient,private router:Router,private ngZone:NgZone) {
    this.googleInit();
  }
  get token(): string{
    return localStorage.getItem('token') || '';
  }
  get uid(): string{
    return this.usuario.uid || '';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  validarToken():Observable<boolean> {
    return this.http.get(`${base_url}/login/renew`,
      {
        headers:
          { 'x-token': this.token }
      }).pipe(
        map((resp: any) => {
          const { role,google,nombre,email,img,uid } = resp.usuario;
          this.usuario = new Usuario(nombre, email, '', role, google, img, uid);
          localStorage.setItem('token', resp.token)
          return true
        }),
        catchError(err => of(false))
      )
  }
  
  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp:any) => {
          localStorage.setItem('token',resp.token)         
        })
      );
  }

  actualizarPerfil(data: { email: string, nombre: string, role?:string }) {
    data = {
      ...data,
      role:this.usuario.role
    }
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data,this.headers);
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp:any) => {
          localStorage.setItem('token',resp.token)         
        })
      );
  }

  loginGoogle(token:string) {
    return this.http.post(`${base_url}/login/google`, {token})
      .pipe(
        tap((resp:any) => {
          localStorage.setItem('token',resp.token)         
        })
      );
  }
  googleInit() {
    return new Promise<void>(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '1033847973357-80hfpcbp6e1i0hombglvloiavo2v7taq.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });
        resolve();
      });
    })
  }

  logOut() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      });
    });
  }

  cargarUsuarios(desde:number=0) {
    return this.http.get<CargarUsuario>(`${base_url}/usuarios?desde=${desde}`, this.headers)
      .pipe(
        map(resp => {
          const usuarios = resp.usuarios.map(user => {
            return new Usuario(user.nombre, user.email,'', user.role,user.google, user.img, user.uid)
          })
          return {
            total: resp.total,
            usuarios
          }
        })
      )
  }
  eliminarUsuarios(usuario:Usuario) {
    return this.http.delete(`${base_url}/usuarios/${usuario.uid}`, this.headers);
  }

  guardarUsuario(usuario: Usuario ) {
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario,this.headers);
  }
}



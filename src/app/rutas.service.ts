import { Injectable } from '@angular/core';
import { ApiResponse,rutas} from './Models/rutas.models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RutasService {

  private apiUrl = 'http://localhost:5020'; 

  constructor(private http: HttpClient) { }

  getRutas(): Observable<ApiResponse> {
    const requestBody = { "estatus": 1 }; // Si estatus es un número, no debería estar en comillas
    return this.http.get<ApiResponse>(`${this.apiUrl}/api/Rutas/GetRutas`);
  }

// Método para insertar un nuevo departamento
insertarRutas(rutasData: { Nombre: string; UsuarioActualiza: number }): Observable<ApiResponse> {
  // El 'nombre' es la única parte variable que viene del formulario
  // 'activo' y 'usuario' son valores fijos en este ejemplo
  const body = {
    nombre: rutasData.Nombre, // Valor por defecto si no se proporciona
    usuarioactualiza: rutasData.UsuarioActualiza || 0,// Valor por defecto si no se proporciona
  };
  return this.http.post<ApiResponse>(`${this.apiUrl}/api/Rutas/Insert`, body);
  }

  eliminarRutas(Id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/Rutas/DeleteRutas`, { Id });
  }
  
  
  actualizarRutas(rutasData: rutas): Observable<ApiResponse> {
    const body ={
      id: rutasData.Id,
      nombre: rutasData.Nombre,
      estatus: rutasData.Estatus || 0,
      usuarioactualiza: 1
    }
    console.log('Enviando solicitud con el siguiete cuerpo:', body);
    return this.http.post<ApiResponse>(`${this.apiUrl}/api/Rutas/UpdateRutas`, body);
  }

}

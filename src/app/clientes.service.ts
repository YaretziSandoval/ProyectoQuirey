import { Injectable } from '@angular/core';
import { ApiResponse,clientes} from './Models/clientes.models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private apiUrl = 'http://localhost:5020'; // Ajusta la URL base del API

  constructor(private http: HttpClient) {}

  getClientes(): Observable<ApiResponse> {
    const requestBody = { "estatus": 1 }; // Si estatus es un número, no debería estar en comillas
    return this.http.get<ApiResponse>(`${this.apiUrl}/api/Clientes/Get_Clientes`,);
  }

// Método para insertar un nuevo departamento
insertarClientes(clientesData: { Nombre: string; Direccion: string; UsuarioActualiza: number }): Observable<ApiResponse> {
  // El 'nombre' es la única parte variable que viene del formulario
  // 'activo' y 'usuario' son valores fijos en este ejemplo
  const body = {
    nombre: clientesData.Nombre,
    direccion: clientesData.Direccion, // Valor por defecto si no se proporciona
    usuarioactualiza: clientesData.UsuarioActualiza || 0,// Valor por defecto si no se proporciona
  };
  return this.http.post<ApiResponse>(`${this.apiUrl}/api/Clientes/Insert_Clientes`, body);
  }

  eliminarClientes(Id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/Clientes/Delete_Clientes`, { Id });
  }
  
  
  actualizarClientes(clientesData: clientes): Observable<ApiResponse> {
    const body ={
      id: clientesData.Id,
      nombre: clientesData.Nombre,
      direccion : clientesData.Direccion,
      usuarioactualiza: 1,
      estatus: clientesData.Estatus || 0
      
    }
    console.log('Enviando solicitud con el siguiete cuerpo:', body);
    return this.http.post<ApiResponse>(`${this.apiUrl}/api/Clientes/Update_Clientes`, body);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Detalletickets } from './Models/detalletickets.models';

@Injectable({
  providedIn: 'root'
})
export class DetalleticketsService{
  private apiUrl = 'http://localhost:5020'; // Ajusta la URL base del API

  constructor(private http: HttpClient) {}

  getDepartamentos(): Observable<ApiResponse> {
    const requestBody = { "estatus": 1 }; // Si estatus es un número, no debería estar en comillas
    return this.http.get<ApiResponse>(`${this.apiUrl}/api/DetalleTicket/GetDetalleTickets`);
  }

// Método para insertar un nuevo departamento
insertarDepartamento(departamentoData: { Codigo: string; IdTicket: number; Cantidad: number; PrecioVenta: number; UsuarioActualiza: number }): Observable<ApiResponse> {
  // El 'nombre' es la única parte variable que viene del formulario
  // 'activo' y 'usuario' son valores fijos en este ejemplo
  const body = {
    codigo: departamentoData.Codigo,
    idticket: departamentoData.IdTicket,
    cantidad: departamentoData.Cantidad,
    precioventa: departamentoData.PrecioVenta,// Valor por defecto si no se proporciona
    usuarioactualiza: departamentoData.UsuarioActualiza || 0,// Valor por defecto si no se proporciona
  };
  return this.http.post<ApiResponse>(`${this.apiUrl}/api/DetalleTicket/InsertDetalleTicket`, body);
  }

  eliminarDepartamento(Id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/DetalleTicket/DeleteDetalleTicket`, { Id });
  }
  
  
  actualizarDepartamento(departamentoData: Detalletickets): Observable<ApiResponse> {
    const body ={
      id: departamentoData.Id,
      idticket: departamentoData.IdTicket,
      codigo: departamentoData.Codigo,
      cantidad: departamentoData.Cantidad,
      precioventa: departamentoData.PrecioVenta,
      estatus: departamentoData.Estatus || 0,
      usuarioactualiza: 1
    }
    console.log('Enviando solicitud con el siguiete cuerpo:', body);
    return this.http.post<ApiResponse>(`${this.apiUrl}/api/DetalleTicket/UpdateDetalleTicket`, body);
  }
}






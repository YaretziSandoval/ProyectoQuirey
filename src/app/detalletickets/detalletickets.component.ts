import { Component } from '@angular/core';
import { DetalleticketsService } from '../detalletickets.service';
import { Detalletickets } from '../Models/detalletickets.models';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { InsertarDetalleticketsComponent } from './insertar-detalletickets/insertar-detalletickets.component';
import { EditarDetalleticketsComponent } from './editar-detalletickets/editar-detalletickets.component';

@Component({
  selector: 'app-detalletickets',
  templateUrl: './detalletickets.component.html',
  styleUrls: ['./detalletickets.component.css']
})
export class DetalleticketsComponent {
  displayedColumns: string[] = ['Id', 'Codigo', 'IdTicket', 'Cantidad', 'PrecioVenta','Estatus', 'FechaActualiza', 'UsuarioActualiza', 'DescripcionArticulo', 'Acciones'];
  dataSource: MatTableDataSource<Detalletickets>;

  constructor(private detalleticketsService: DetalleticketsService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Detalletickets>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: Detalletickets, filter: string) => {
      return data.Codigo.toLowerCase().includes(filter) || 
             data.Id.toString().includes(filter); // Puedes añadir más campos si es necesario
    };
    this.detalleticketsService.getDepartamentos().subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response.response.data); 
        if (response.success) {
          this.dataSource.data = response.response.data; // Asigna los datos al atributo 'data' de dataSource
        } else {
          // Manejar la respuesta en caso de fallo
        }
      },
      error: (error) => {
        // Manejar el error de la solicitud
      }
    });
  }
  // Método para realizar el filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
 abrirInsertarModal() {
    const dialogRef = this.dialog.open(InsertarDetalleticketsComponent, {
      width: '550px',
      // Puedes pasar datos al componente de la modal si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      // Manejar los resultados cuando la modal se cierre
    });
  }
  


  eliminarDepartamento(Id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este departamento?')) {
      this.detalleticketsService.eliminarDepartamento(Id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter((departamento: Detalletickets) => departamento.Id !== Id);
        },
        error: (error) => {
          console.error('Hubo un error al eliminar el departamento', error);
        }
      });
    }
  }
  
  
  abrirEditarModal(departamento: Detalletickets) {
    const dialogRef = this.dialog.open(EditarDetalleticketsComponent, {
      width: '250px',
      data: departamento // Pasa el objeto de departamento a la modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }
}





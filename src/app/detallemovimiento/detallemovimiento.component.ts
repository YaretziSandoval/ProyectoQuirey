import { Component } from '@angular/core';
import { DetallemovimientoService } from '../detallemovimiento.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Detallemovimiento } from '../Models/detallemovimiento.models';
import { EditarDetallemovimientoComponent } from './editar-detallemovimiento/editar-detallemovimiento.component';
import { InsertarDetallemovimientoComponent } from './insertar-detallemovimiento/insertar-detallemovimiento.component';
@Component({
  selector: 'app-detallemovimiento',
  templateUrl: './detallemovimiento.component.html',
  styleUrls: ['./detallemovimiento.component.css']
})
export class DetallemovimientoComponent {
  displayedColumns: string[] = ['Id', 'Codigo', 'IdMovimiento', 'Cantidad', 'Costo','Estatus', 'FechaActualiza', 'UsuarioActualiza', 'Descripcion', 'Acciones'];
  dataSource: MatTableDataSource<Detallemovimiento>;

  constructor(private detallemovimientoService: DetallemovimientoService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Detallemovimiento>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: Detallemovimiento, filter: string) => {
      return data.Codigo.toLowerCase().includes(filter) || 
             data.Id.toString().includes(filter); // Puedes añadir más campos si es necesario
    };
    this.detallemovimientoService.getDepartamentos().subscribe({
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
    const dialogRef = this.dialog.open(InsertarDetallemovimientoComponent, {
      width: '550px',
      // Puedes pasar datos al componente de la modal si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      // Manejar los resultados cuando la modal se cierre
    });
  }
  


  eliminarDepartamento(Id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este departamento?')) {
      this.detallemovimientoService.eliminarDepartamento(Id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter((departamento: Detallemovimiento) => departamento.Id !== Id);
        },
        error: (error) => {
          console.error('Hubo un error al eliminar el departamento', error);
        }
      });
    }
  }
  
  
  abrirEditarModal(departamento: Detallemovimiento) {
    const dialogRef = this.dialog.open(EditarDetallemovimientoComponent, {
      width: '250px',
      data: departamento // Pasa el objeto de departamento a la modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }
}

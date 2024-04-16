import { Component } from '@angular/core';
import { clientes } from '../Models/clientes.models';
import { MatTableDataSource } from '@angular/material/table';
import { ClientesService } from '../clientes.service';
import { MatDialog } from '@angular/material/dialog';
import { InsertarClientesComponent } from 'src/app/clientes/insertar-clientes/insertar-clientes.component';
import { EditarClientesComponent } from 'src/app/clientes/editar-clientes/editar-clientes.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {

  displayedColumns: string[] = ['Id', 'Nombre', 'Direccion', 'Estatus', 'UsuarioActualiza','FechaActualiza', 'Acciones'];
  dataSource: MatTableDataSource<clientes>;

  constructor(private clientesService: ClientesService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<clientes>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: clientes, filter: string) => {
      return data.Nombre.toLowerCase().includes(filter) || 
             data.Id.toString().includes(filter); // Puedes añadir más campos si es necesario
    };
    this.clientesService.getClientes().subscribe({
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
    const dialogRef = this.dialog.open(InsertarClientesComponent, {
      width: '550px',
      // Puedes pasar datos al componente de la modal si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      // Manejar los resultados cuando la modal se cierre
    });
  }
  


  eliminarClientes(Id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      this.clientesService.eliminarClientes(Id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter((clientes: clientes) => clientes.Id !== Id);
        },
        error: (error) => {
          console.error('Hubo un error al eliminar el cliente', error);
        }
      });
    }
  }
  
  
  abrirEditarModal(clientes: clientes) {
    const dialogRef = this.dialog.open(EditarClientesComponent, {
      width: '250px',
      data: clientes // Pasa el objeto de departamento a la modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }
}




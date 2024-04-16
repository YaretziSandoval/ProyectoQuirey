import { Component } from '@angular/core';
import { tickets } from '../Models/tickets.models';
import { MatTableDataSource } from '@angular/material/table';
import { TicketsService } from '../tickets.service';
import { MatDialog } from '@angular/material/dialog';
import { InsertarTicketsComponent } from 'src/app/tickets/insertar-tickets/insertar-tickets.component';
import { EditarTicketsComponent } from 'src/app/tickets/editar-tickets/editar-tickets.component';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent {

  displayedColumns: string[] = ['Id', 'IdSucursal', 'IdCliente', 'IdVendedor', 'FechaVenta','UsuarioActualiza','Estatus' ,'Acciones'];
  dataSource: MatTableDataSource<tickets>;

  constructor(private ticketsService: TicketsService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<tickets>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: tickets, filter: string) => {
      return data.IdCliente.toString().includes(filter) || 
             data.Id.toString().includes(filter); // Puedes añadir más campos si es necesario
    };
    this.ticketsService.getTickets().subscribe({
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
    const dialogRef = this.dialog.open(InsertarTicketsComponent, {
      width: '550px',
      // Puedes pasar datos al componente de la modal si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      // Manejar los resultados cuando la modal se cierre
    });
  }
  


  eliminarTickets(Id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      this.ticketsService.eliminarTickets(Id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter((clientes: tickets) => clientes.Id !== Id);
        },
        error: (error) => {
          console.error('Hubo un error al eliminar el cliente', error);
        }
      });
    }
  }
  
  
  abrirEditarModal(clientes: tickets) {
    const dialogRef = this.dialog.open(EditarTicketsComponent, {
      width: '250px',
      data: clientes // Pasa el objeto de departamento a la modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }

}

import { Component, inject, signal } from '@angular/core';
import { NumeroGanador } from './numero-ganador';
import { AstroMillonarioService } from './components/tabla-historial/astro-millonario.service';
import { TablaHistorialComponent } from "./components/tabla-historial/tabla-historial.component";

@Component({
  selector: 'app-root',
  imports: [TablaHistorialComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  astroService = inject(AstroMillonarioService);

  historial = signal<NumeroGanador[]>(this.astroService.recuperarHistorial());

  numeroGanador = signal<NumeroGanador | null>(null);

  generarNumero () {
    const numero = this.astroService.generarNumeroGanador();
    this.numeroGanador.set(numero);
    this.historial.update(current => {
      current.push(numero);
      return current;
    });
  }

  borrarHistorial () {
    this.astroService.borrarHistorial();
    this.historial.set([]);
  }

  nuevoNumero() {
    this.numeroGanador.set(null);
  }
}

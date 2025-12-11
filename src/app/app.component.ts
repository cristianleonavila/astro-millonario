import { Component, inject, signal } from '@angular/core';
import { NumeroGanador } from './numero-ganador';
import { SignosZodiacales } from './signos';
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
    this.historial.set(this.astroService.recuperarHistorial());
  }

}

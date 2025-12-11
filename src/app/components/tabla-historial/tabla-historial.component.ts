import { Component, input } from '@angular/core';
import { NumeroGanador } from '../../numero-ganador';

@Component({
  selector: 'app-tabla-historial',
  imports: [],
  templateUrl: './tabla-historial.component.html',
  styles: ``
})
export class TablaHistorialComponent {

  data = input<NumeroGanador[]>([]);
}

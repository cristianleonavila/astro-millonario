import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NumeroGanador } from './numero-ganador';
import { SignosZodiacales } from './signos';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  historial = signal<NumeroGanador[]>(this.recuperarHistorial());

  numero = signal<number | null>(0);

  signo = signal<SignosZodiacales | null>(null);

  generarNumeroGanador() {
    this.numero.set(this.generarNumero());
    this.signo.set(this.generarSigno());
    this.historial.update((current) => {
      current.push({
        fecha: this.generarFecha(),
        signo: this.signo(),
        numero: this.numero()
      });
      return current;
    });
    localStorage.setItem('historial_numeros', JSON.stringify(this.historial()))
  }

  private recuperarHistorial() {
    return JSON.parse(localStorage.getItem('historial_numeros') || '[]');
  }

  private generarNumero() {
    return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  }

  private generarSigno() {
    const values = Object.values(SignosZodiacales);
    const random = values[Math.floor(Math.random() * values.length)];
    return random;
  }

  private generarFecha() {
    const hoy = new Date();
    const dd = String(hoy.getDate()).padStart(2, '0');
    const mm = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
    const yyyy = hoy.getFullYear();

    const fecha = `${dd}/${mm}/${yyyy}`;
    return fecha;
  }

}

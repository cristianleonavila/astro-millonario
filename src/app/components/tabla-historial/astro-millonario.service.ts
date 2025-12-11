import { Injectable, signal } from '@angular/core';
import { SignosZodiacales } from '../../signos';
import { NumeroGanador } from '../../numero-ganador';

@Injectable({
  providedIn: 'root'
})
export class AstroMillonarioService {

  constructor() { }

  generarNumeroGanador():NumeroGanador {
    const numero = {
      fecha: this.generarFecha(),
      signo: this.generarSigno(),
      numero: this.generarNumero()
    };
    this.guardarHistorial(numero);
    return numero;
  }

  private guardarHistorial(numero: NumeroGanador) {
    const historial = this.recuperarHistorial();
    historial.push(numero);
    localStorage.setItem('historial_numeros', JSON.stringify(historial));
  }

  public recuperarHistorial():NumeroGanador[] {
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
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const yyyy = hoy.getFullYear();
    const fecha = `${dd}/${mm}/${yyyy}`;
    return fecha;
  }
}

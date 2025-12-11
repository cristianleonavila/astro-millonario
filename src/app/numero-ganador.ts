import { SignosZodiacales } from "./signos";

export interface NumeroGanador {
  fecha: string | null;
  numero: number | null;
  signo: SignosZodiacales | null
};

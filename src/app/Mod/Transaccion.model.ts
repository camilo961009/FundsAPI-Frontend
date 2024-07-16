export interface Transaccion {
    id?: string;
    clienteId: string;
    fondoId: string;
    monto: number;
    fecha: Date;
    tipo: string;
  }
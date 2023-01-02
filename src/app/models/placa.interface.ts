
export interface Placa {
  id?: number;
  placa: string;
  propietario?: string;
  cedula: string;
  fecha_ingreso?: Date;
  fecha_modificacion?: Date;
  tipo_placa: string;
  tipo_vehiculo: string;
  estado: boolean;
  usuario: string;
}

export interface Actas {
  id?: number;
  numero_acta: string;
  id_placa:number;
  cantidad: string;
  detalle: string;
  numero_placa: string;
  nombre: string;
  cedula: string;
  dia: string;
  mes: string;
  anio: string;
  user:string;
  observacion:string;
}
export interface ReporteActas {
  id: number;
  numero_acta: string;
  cantidad: number;
  detalle: string;
  numero_placa: string;
  nombre: string;
  cedula: string;
  dia: string;
  mes: string;
  anio: string;
  usuario: number;
  tipo_placa: string;
  tipo_vehiculo: string;
  fecha_modificacion:Date;
  observacion:string;
}
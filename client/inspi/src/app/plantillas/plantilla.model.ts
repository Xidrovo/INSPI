import { Seccion } from './seccion.model'

export interface Plantilla {
    id: number;
    titulo: string;
    descripcion: any;
    secciones: Seccion[];

}




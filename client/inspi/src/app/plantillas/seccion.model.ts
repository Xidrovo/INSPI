import { Pregunta } from './pregunta.model'

export interface Seccion {
    id : number;
    titulo: string;
    preguntas_seccion: Pregunta[];
}
import { EventColor } from "calendar-utils";


export class Employee{
    codEmpleado: number;
    nombre: string;
    apellido1 : string;
    apellido2 : string;
    telefono : number;
    email : string;
    dni : string;

    color: Color;

    // public getFullName(): string {
    //     var fullName = this.nombre;
    //     if (this.apellido1) {
    //         fullName += ' ' + this.apellido1;
    //     }
    //     if (this.apellido2) {
    //         fullName += ' ' + this.apellido2;
    //     }

    //     return fullName;
    // }

}

interface Color {
    codColor: number,
    primaryC: string,
    secondaryC: string
  };

  export function getColor(employee: Employee): EventColor{
    return {
        primary: employee.color.primaryC,
        secondary: employee.color.secondaryC
    }
}
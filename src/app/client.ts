export interface Client{
    id: number;
    nombre: string;
    apellido1 : string;
    apellido2 : string;
    telefono : number;
    email : string;
    dni : string;

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
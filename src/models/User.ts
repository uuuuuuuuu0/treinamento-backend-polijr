export default class User {
    id: string;
    name: string;
    cpf: number;
    email: string;
    created_at: Date;
    updated_at: Date;

    constructor(id:string, name:string, cpf:number, email:string, created_at?:Date, updated_at?:Date){
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        this.created_at = created_at ?? new Date();
        this.updated_at = updated_at ?? new Date();
    }
};
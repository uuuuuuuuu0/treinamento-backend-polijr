import User from '../models/User';

interface ICreateUserDTO{
    id: string;
    name: string;
    cpf: number;
    email: string;
}

interface IUpdateUserDTO{
    id: string;
    name: string;
    cpf: number;
    email: string;
    created_at: Date;
}

interface IDontUpdateUserDTO{
    id: string;
    name: string;
    cpf: number;
    email: string;
    created_at: Date;
    updated_at: Date;
}

class UserRepository{
    private users: User[];

    constructor(){
        this.users = [];
    }

    public createUser({id, name, cpf, email}: ICreateUserDTO): User{
        const newUser = new User(id, name, cpf, email);
        this.users.push(newUser);
        return newUser;
    }

    public updateUser({id, name, cpf, email, created_at}: IUpdateUserDTO): User{
        const newUser = new User(id, name, cpf, email, created_at);
        this.users.push(newUser);
        return newUser;
    }

    public dontUpdateUser({id, name, cpf, email, created_at, updated_at}: IDontUpdateUserDTO): User{
        const newUser = new User(id, name, cpf, email, created_at, updated_at);
        this.users.push(newUser);
        return newUser;
    }

    public getUsers(): User[]{
        return this.users;
    }
    
    public findById(id:string): User | null{
        return this.users.find(user => user.id === id) || null;
    }

    public findByCpf(cpf:number): User | null{
        return this.users.find(user => user.cpf === cpf) || null;
    }

    public findByEmail(email:string): User | null{
        return this.users.find(user => user.email === email) || null;
    }

    public removeUser(id:string): User[]{
        let usersTemp = this.users.filter(user => user.id !== id);

        this.users.pop();

        this.users.forEach((user, i) => {
            this.users[i] = usersTemp[i];
        });

        return this.users;
    }
}

export default UserRepository;
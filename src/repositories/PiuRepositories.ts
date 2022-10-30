import Piu from '../models/Piu';

interface ICreatePiuDTO{
    id: string;
    userId: string;
    text: string;
}

interface IUpdatePiuDTO{
    id: string;
    userId: string;
    text: string;
    created_at: Date;
}

interface IDontUpdatePiuDTO{
    id: string;
    userId: string;
    text: string;
    created_at: Date;
    updated_at: Date;
}

class PiuRepository {
    private pius: Piu[];

    constructor(){
        this.pius = [];
    }

    public createPiu({id, userId, text}: ICreatePiuDTO): Piu{
        const newPiu = new Piu(id, userId, text);
        this.pius.push(newPiu);
        return newPiu;
    }
    
    public updatePiu({id, userId, text, created_at}: IUpdatePiuDTO): Piu{
        const newPiu = new Piu(id, userId, text, created_at);
        this.pius.push(newPiu);
        return newPiu;
    }

    public dontUpdatePiu({id, userId, text, created_at, updated_at}: IDontUpdatePiuDTO): Piu{
        const newPiu = new Piu(id, userId, text, created_at, updated_at);
        this.pius.push(newPiu);
        return newPiu;
    }

    public getPius(): Piu[]{
        return this.pius;
    }

    public findById(id:string): Piu | null{
        return this.pius.find(piu => piu.id === id) || null;
    }    

    public removePiu(id:string): Piu[]{
        let piusTemp = this.pius.filter(piu => piu.id !== id);

        this.pius.pop();

        this.pius.forEach((piu, i) => {
            this.pius[i] = piusTemp[i];
        });

        return this.pius;
    }
}

export default PiuRepository;
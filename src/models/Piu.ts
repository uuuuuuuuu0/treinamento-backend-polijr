export default class Piu {
    id: string;
    userId: string;
    text: string;
    created_at: Date;
    updated_at: Date;

    constructor(id: string, userId: string, text: string, created_at?:Date, updated_at?:Date){
        this.id = id;
        this.userId = userId;
        this.text = text;
        this.created_at = created_at ?? new Date();
        this.updated_at = updated_at ?? new Date();
    }
} // Attributes may be added as needed
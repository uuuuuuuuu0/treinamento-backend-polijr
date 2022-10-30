import { Router } from "express";
import { uuid } from "uuidv4";
import Piu from "../models/Piu";
import { userRepository } from "./user.routes";
import PiuRepository from "../repositories/PiuRepositories";

const piuRouter = Router();

const piuRepository = new PiuRepository();

piuRouter.post('', (request, response) => { //Creating a new Piu
    const { userId, text } = request.body;

    if (!text)
        return response.status(404).json({ message: "Text not found"});

    if (!userId)
        return response.status(404).json({ message: "User id not found"});

    if (text === '' || text.length > 140)
        return response.status(400).json({ message: "Invalid text"});

    if (!userRepository.findById(userId))
        return response.status(400).json({ message: "No user with this id"})

    const returnPiu = piuRepository.createPiu({id: uuid(), userId: userId, text: text});

    return response.json(returnPiu);
});

piuRouter.get('', (request, response) => { // Reading all Pius
    return response.json(piuRepository.getPius())
});

piuRouter.get('/:id', (request, response) => { // Reading a single Piu
    const { id } = request.params;

    if (!piuRepository.findById(id)){
        return response.status(404).json({ message: "Piu not found"});
    }

    return response.json(piuRepository.findById(id))
});

piuRouter.delete('/:id', (request, response) => { // Deleting a Piu
    const { id } = request.params;

    if (!id)
        return response.status(404).json({ message: "Id not found"});

    if (!piuRepository.findById(id))
        return response.status(404).json({ message: "Piu not found"});

    piuRepository.removePiu(id);

    return response.json(piuRepository.getPius());
});

piuRouter.put('', (request, response) => { // Updating a Piu
    const { id, text } = request.body;

    if (!id)
        return response.status(404).json({ message: "Id not found"});

    if (!text)
        return response.status(404).json({ message: "Text not found"});

    if (!piuRepository.findById(id))
        return response.status(404).json({ message: "Piu not found"});

    
    let deletedPiu = piuRepository.findById(id) as Piu;

    piuRepository.removePiu(id);

    if (text === '' || text.length > 140){
        piuRepository.dontUpdatePiu({...deletedPiu});
        return response.status(400).json({ message: "Invalid text"});
    }

    const returnPiu = piuRepository.updatePiu({id: id, userId: deletedPiu.userId, text: text, created_at: deletedPiu?.created_at})

    return response.json(returnPiu);
});

export default piuRouter;
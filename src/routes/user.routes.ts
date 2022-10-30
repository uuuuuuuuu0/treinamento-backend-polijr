import { Router } from "express";
import User from "../models/User";
import UserRepository from "../repositories/UserRepositories";
import { uuid } from "uuidv4";

const userRouter = Router();

export const userRepository = new UserRepository();

userRouter.post('', (request, response) => { // Creating a new User
    const { name, cpf, email } = request.body;

    if (!name || name === '')
        return response.status(404).json({ message: "Name not found"});

    if (!cpf || cpf === '')
        return response.status(404).json({ message: "Cpf not found"});

    if (!email || email === '')
        return response.status(404).json({ message: "Email not found"});

    if (userRepository.findByCpf(cpf))
        return response.status(400).json({ message: "User with this cpf already exists" });

    if (userRepository.findByEmail(email))
        return response.status(400).json({ message: "User with this email already exists" });

    const returnUser = userRepository.createUser({id:uuid() as string, name, cpf, email});

    return response.json(returnUser);
});

userRouter.get('', (request, response) => { // Reading all Users
    return response.json(userRepository.getUsers());
});

userRouter.get('/:id', (request, response) => { // Reading a single User
    const { id } = request.params;

    if (!userRepository.findById(id)){
        return response.status(404).json({ message: "User not found"});
    }

    return response.json(userRepository.findById(id));
});

userRouter.delete('/:id', (request, response) => { // Deleting an Users
    const { id } = request.params;

    if (!id)
        return response.status(404).json({ message: "Id not found"});

    if (!userRepository.findById(id))
        return response.status(404).json({ message: "User not found"});


    userRepository.removeUser(id);

    return response.json(userRepository.getUsers());
});

userRouter.put('', (request, response) => { // Updating an User
    const { id, name, cpf, email } = request.body;

    if (!id)
        return response.status(404).json({ message: "Id not found"});

    if (!userRepository.findById(id))
        return response.status(404).json({ message: "User not found"});
    
    let deletedUser = userRepository.findById(id) as User;

    userRepository.removeUser(id);

    if (cpf && userRepository.findByCpf(cpf)){
        userRepository.dontUpdateUser({...deletedUser});
        return response.status(400).json({ message: "User with this cpf already exists"});
    }

    if (email && userRepository.findByEmail(email)){
        userRepository.dontUpdateUser({...deletedUser});
        return response.status(400).json({ message: "User with this email already exists"});
    }

    const returnUser = userRepository.updateUser({...deletedUser});

    return response.json(returnUser);
});

export default userRouter;
import {Request, Response} from "express";

const users = [
    {name: 'Jhonata', email: 'einasota@gmail.com',}
];

export default {
    async indexedDB(req: Request, res: Response){
        return res.json(users);
    }
};

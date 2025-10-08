//Criar um middleware que bloqueia tudo
import jwt from 'jsonwebtoken'
import express, { Request, Response, NextFunction } from 'express'
interface AuthenticacaoRequest extends Request {
    usuarioId?: string;
}
function Auth(req:Request, res:Response, next:NextFunction){
     console.log("Cheguei no middleware e bloqueei")
     const authHeaders = req.headers.authorization
     console.log(authHeaders)
     if(!authHeaders)
        return res.status(401).json({mensagem:"Você não passou o token no Bearer"})
    const token = authHeaders.split("")[1]!

    jwt.verify(token, process.env.JWT_SECRET!,(err, decoded)=>{
        if(err){
            console.log(err)
            return res.status(401).json({mensagem:"Token inválido"})
        }
        if(typeof decoded === 'string' || !decoded ||!("usuarioId")){
            return res.status(401).json({mensagem:"Token inválido"})
        }
    })
}


export default Auth;
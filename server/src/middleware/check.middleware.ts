
import { Request, Response, NextFunction } from "express";

export const check = (req: Request, res: Response, next: NextFunction) => {

  const { name } = req.body

  if (name.length < 4) {
    res.status(400).send({ error: 'Name be at least 4 characters long' })
    return
  }
  next()
}

export const uniqueEmail = (req: Request, res: Response, next: NextFunction) => {

  const { email } = req.body

  if (email === email) {
    res.status(400).send({ error: 'This user is not avaible' })
    return
  }
  next()
}




import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const port: number | string = process.env.PORT || 8080;
const app: Express = express()

app.use('/', (req: Request, res: Response) => {
    res.send("Hello word")
})

app.listen(port, () => {
    console.log(`-------------Web is listening on port ${port}------------`)
})
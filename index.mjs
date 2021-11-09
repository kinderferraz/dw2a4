import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from "./forevercake/server/routes.mjs";

dotenv.config()
const app = express()
const port = process.env.PORT || 5500
const secretToken = process.env.TOKEN_SUPER_SECRETO

app.use(express.json())

app.use((req, res, next) => {
    if (req.headers.token !== secretToken)
        return res.sendStatus(401)

    return next()
})

app.use("/", router)

app.listen(port, () => console.log(`Listening on port ${port}`))
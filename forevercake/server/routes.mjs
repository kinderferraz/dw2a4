import fatorial from './fatorial.mjs';
import express, { json } from "express"
import { retrieveLikes, main } from "./twitter.mjs";

const router = express.Router()

router.get("/", (req, res) => res.send(
    JSON.stringify({
        result: "OK"
    })
))

router.get("/fatorial/:n", (req, res) => {
    res.send(fatorial(req.params.n, 1).toString())
})

router.get("/remove-likes", async(req, res) => {
    res.send(await main().catch(err => `{"error": "${err.message}"}`))
})

export default router
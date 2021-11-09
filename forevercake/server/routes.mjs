import fatorial from './fatorial.mjs';
import express from "express"
import { main, post } from "./twitter.mjs";

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

router.post("/tweet", async(req, res) => {
    const tweetText = req.body.tweetText
    const result = await post(tweetText)
    res.send(result)
})

export default router
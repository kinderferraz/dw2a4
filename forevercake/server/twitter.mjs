import iteration from "p-iteration";
import moment from "moment";
import twitter from "../wokers/twitter.mjs";

const notDeleted = []
const deleted = []

const getUserId = async() => {
    twitter
        .get('account/verify_credentials', { skip_status: true })
        .catch(err => console.log(err.stack))
        .then(result => result)
}

const ignoredErrors = [
    'User has been suspended.',
    'No status found with that ID.',
    'Sorry, that page does not exist.',
    'Sorry, you are not authorized to see this status.'
]

const deleteTweets = async(tweet) => {
    const tweetData = {
        id: tweet.id,
        text: tweet.text,
        user: tweet.user.name
    }
    console.log("attempting to delete: ", tweetData)
    await twitter.post("favorites/destroy", {
            id: tweet.id_str
        }).then(function(data) {
            deleted.push(tweetData)
        })
        .catch(function(err) {
            notDeleted.push(tweetData)
        })
}

const retrieveLikes = async(maxId) => {
    let count = 0
    let tweets = []
    const user_id = await getUserId()

    async function next(maxId) {
        console.log("retrieving for the", ++count, "time")
        try {
            const response = await twitter.get('favorites/list', {
                max_id: maxId,
                user_id: user_id,
                count: 75,
                include_entities: false
            })

            // console.log(response);

            if (response.data.lenght <= 1) return tweets
            tweets = [...tweets, ...response.data]

            /*await iteration.forEach(tweets, tweet => console.log({
                id: tweet.id,
                text: tweet.text,
                user: tweet.user.name
            }))*/

            return await next(tweets[tweets.length - 1].id_str)

            //return tweets

        } catch (err) {
            return tweets
        }
    }

    return await next()
}

const main = async() => {
    const ttl = [7, 'days']
    const until = moment().subtract(...ttl).toDate()

    const tweets = await retrieveLikes().catch(err => console.log(err.message))
        // todo: update filter later
    let tweetsToDelete = tweets.filter(tweet => new Date(tweet.created_at) < until)

    console.log(`tweets to delete: ${tweetsToDelete.length}`);
    // await iteration.forEach(tweets, deleteTweets)

    //console.log("deleted: ", deleted)
    //console.log("not deleted", notDeleted);
}

const post = async tweetText => {
    console.log("tweeting : ", tweetText);
    const result = await twitter.post("statuses/update", {
            status: tweetText
        }).then(res => res.data)
        .catch(err => console.log(err))

    return {
        id: result.id_str,
        text: result.text,
        user: result.user.name,
        arroba: result.user.screen_name
    }
}

const post = async tweetText => {
    console.log("tweeting : ", tweetText);
    const result = await twitter.post("statuses/update", {
            status: tweetText
        }).then(res => res.data)
        .catch(err => console.log(err))

    return {
        id: result.id_str,
        text: result.text,
        user: result.user.name,
        arroba: result.user.screen_name
    }
}

export default getUserId
export { retrieveLikes, main, post }
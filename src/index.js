import * as masto from 'masto'
import {readFileSync} from 'fs'
import generateHotTake from './hotTakes.js'


const config = JSON.parse(readFileSync(process.cwd() + '/config.json'))

function post(mastodon) {
  const take = generateHotTake()
  console.log("Posting: ", take)
  mastodon.statuses.create({
    status: take,
    visibility: config.visibility,
    language: 'en'
  }).catch(err => {
    console.log("Encountered error " + err)
  })
}

async function main() {
  const mastodon = await masto.login({url: config.instance, accessToken: config.accessToken})
  post(mastodon)
  setInterval(() => post(mastodon), config.interval)
}

main().catch(err => {
  throw err;
})

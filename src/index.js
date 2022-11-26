import * as masto from 'masto'
import {readFileSync} from 'fs'
import generateHotTake from './hotTakes.js'


const config = JSON.parse(readFileSync(process.cwd() + '/config.json'))

async function main() {
  const mastodon = await masto.login({url: config.instance, accessToken: config.accessToken})

  setInterval(() => {
    mastodon.statuses.create({
      status: generateHotTake(),
      visibility: config.visibility,
      language: 'en'
    })
  }, config.interval)
}

main().catch(err => {
  throw err;
})

# Programming Takes

This is a small adaptation of the [hotTakes module](https://github.com/TheDeveloperDen/DevDenBot/blob/master/src/modules/hotTakes/hotTakes.util.ts) used in the [Developer Den](https://developerden.net/) Discord bot. This repo simply adds a periodic task to post generated hot takes to [Mastodon](https://joinmastodon.org).

Future endeavours include a feature that enables user interaction (i.e., users mention the bot -> it responds with a hot take). For now though, this is very simple.

## Run it
To run it yourself, first edit [config.template.json](./config.template.json) to suit your needs. The configuration options should mostly be self-explanatory. `interval` is in milliseconds.

After you've done your configuration, simply rename the file to `config.json`, run `npm install` and then `npm start`.

You can also use this to generate some hot takes without posting them anywhere. To do this, run `npm start -- --dry-run <number-of-takes>`.

The repository also contains a [Dockerfile](./Dockerfile) if you prefer running via Docker.

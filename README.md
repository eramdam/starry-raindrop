# Sync GitHub starred repos to a Raindrop.io collection

Based off [azedo/raindrop-io-github-starred-repos](https://github.com/azedo/raindrop-io-github-starred-repos/)

# Requirements

- Node 18

# Environment variables

- `GH_TOKEN` = a GitHub token with the `read:user` scope
  - See <https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token>
- `RAINDROP_TOKEN` = a Raindrop.io API token
  1.  Go to -> <https://app.raindrop.io/settings/integrations>
  2.  Then click `+ Create a new app` under the `For Developers` section
  3.  Now, click on the name of your newly generated app and then click in `Create test token`
  4.  Grab that token
- `RAINDROP_COLLECTION_ID` = the ID of the collection you want to use to store the starred repos
  1.  Open the Raindrop.io app in a browser, browse to the collection you want to use and grab its id from the URL
  2.  `https://app.raindrop.io/my/26677018` -> `26677018` is the collection ID

# Running (self-hosted)

1. Copy and rename the `.env.example` to `.env`
2. Paste in the token values you generated before
3. Run `npm build` and then:
   - `npm run cron` for hourly runs
   - `npm start` for a single run

# Running (self-hosted with DockeR)

1. Copy and rename the `.env.example` to `.env`
2. Paste in the token values you generated before
3. Run `docker compose up -d`

# Running (GitHub actions)

1. Fork this repository
2. Set up the tokens you generated above and define them as Action secrets
3. That (should) be it, the workflow will run every hour

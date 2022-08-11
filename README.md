# Sync GitHub starred repos to a Raindrop.io collection

Based off [azedo/raindrop-io-github-starred-repos](https://github.com/azedo/raindrop-io-github-starred-repos/)

# Requirements

- Node 18

# Instructions

1. Copy and rename the `.env.example` to `.env`;
2. Generate a personal token for github and add it to the `.env` file <https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token>;
3. Generate an authentication token in the raindrop.io app:
   1. Go to -> <https://app.raindrop.io/settings/integrations>;
   2. Then click `+ Create a new app` under the `For Developers` section;
   3. Now, click on the name of your fresh generated app and then click in `Create test token`;
   4. Finally copy this `test token` in the `.env` file;
4. Open the Raindrop.io app in a browser, browse to the collection you want to use and grab its id from the URL
   1. `https://app.raindrop.io/my/26677018` -> `26677018` is the collection ID
   2. Add it to the `.env` file
5. `npm install`
6. `npm start`
7. Tada! The script will
   1. Fetch your starred repos
   2. Look if for already existing bookmarks in Raindrop
   3. Add the missing bookmarks

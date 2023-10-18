# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Docker install

1. download `.env`, `docker-compose.yml` and `create.sql`
```bash
wget https://raw.githubusercontent.com/viotalJiplk/gttbe-2/main/.env-template -O .env &&
wget https://raw.githubusercontent.com/viotalJiplk/gttfe-2/main/docker-compose.yml &&
wget https://raw.githubusercontent.com/viotalJiplk/gttbe-2/main/create.sql
```
2. get `client_id`, `client_secret` and add `redirect_url`
 - create Discord "App" [discord.com/developers/applications](https://discord.com/developers/applications?new_application=true)
 - go to *OAuth2* tab
 - copy `Client ID` and `Client Secret` and add them to `.env` file
 - add `http://127.0.0.1:5000/account` to Redirects
3. create database
 - run 
 ```bash
 docker compose up -d
 ```
 - go to [http://127.0.0.1:5000/adminer/](http://127.0.0.1:5000/adminer/)
 - log in (Server: gtt-mariadb credentials are in `.env` file)
 - click SQL command
 - copy content from `create.sql` and click execute
4. done
 - run 
 ```bash
 docker compose up -d
 ```
 - you can find all premade "tests" over at: [127.0.0.1:5000/](http://127.0.0.1:5000/)


## Dev build scripts

<b>Before cloning, install [GIT LFS](https://git-lfs.com/).</b>

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

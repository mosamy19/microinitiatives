# microinitiatives

## Stack

- React.js
- Redux
- Material-UI
- Node + Express
- mongoDB

## Database

1. Install mongoDB
2. mongoose

To query the database we recommend MongoDB Compass https://www.mongodb.com/try/download/compass

## Client

Setup:

1. `cd client`
2. `yarn install`
3. copy `.env.sample` into `.env` and fill in credentials

To run:

1. `yarn start` or `npm run dev`
2. Open [http://localhost:3000](http://localhost:3000)

## API

Setup:

1. `cd server`
2. `yarn install`
3. copy `.env.sample` into `.env` and fill in credentials
4. Make sure your database is running on your machine

To run:

1. `yarn dev` or `npm run dev` for development, `yarn start` for production
2. API end point would be `http://localhost:5001`

## Prettier

1. In Visual Studio Code install the Prettier extension.
2. Go to Code -> Settings -> Preferences, search for `editor.formatOnSave`, set to True.

## Porject Architecture 

We would like to follow the following Architecture. 
```
app
├── config
│   └── routes.js
├── screens
│   └── App
│       ├── components
│       ├── screens
│       │   ├── Admin
│       │   │   ├── components
│       │   │   ├── screens
│       │   │   │   ├── Reports
│       │   │   │   │   ├── components
│       │   │   │   │   ├── stores
│       │   │   │   │   │   └── ReportsStore.js
│       │   │   │   │   └── index.js
│       │   │   │   └── Users
│       │   │   │       ├── components
│       │   │   │       └── index.js
│       │   │   ├── shared
│       │   │   │   └── stores
│       │   │   │       ├── AccountStore.js
│       │   │   │       └── UserStore.js
│       │   │   └── index.js
│       │   └── Course
│       │       ├── components
│       │       ├── screens
│       │       │   └── Assignments
│       │       │       ├── components
│       │       │       └── index.js
│       │       └── index.js
│       ├── shared
│       │   └── components
│       │       ├── Avatar.js
│       │       └── Icon.js
│       └── index.js
├── shared
│   └── util
│       └── createStore.js
└── index.js
```

const authRoutes = require("./authRoutes");
const initiativeRoutes = require("./initiativeRoutes");
const commentRoutes = require("./commentsRoutes");
const likesRoutes = require("./likesRoues");
const favoritesRoutes = require("./favoritesRoutes");
const shareRoutes = require("./shareRoutes");
const notificationRoutes = require("./notificationRoutes");
const fileuploadRoutes = require("./fileuploadRoutes");
const categoryRoutes = require("./categoryRoutes");

const baseAPIPath = "/api/v1";

const routes = [
  {
    path: `${baseAPIPath}/auth`,
    handler: authRoutes,
  },
  {
    path: `${baseAPIPath}/initiatives`,
    handler: initiativeRoutes,
  },
  {
    path: `${baseAPIPath}/comments`,
    handler: commentRoutes,
  },
  {
    path: `${baseAPIPath}/likes`,
    handler: likesRoutes,
  },
  {
    path: `${baseAPIPath}/favorites`,
    handler: favoritesRoutes,
  },
  {
    path: `${baseAPIPath}/shares`,
    handler: shareRoutes,
  },
  {
    path: `${baseAPIPath}/notifications`,
    handler: notificationRoutes,
  },
  {
    path: `${baseAPIPath}/categories`,
    handler: categoryRoutes,
  },
  {
    path: `${baseAPIPath}/upload`,
    handler: fileuploadRoutes,
  },
  {
    path: "/",
    handler: (req, res) => {
      const help = `
        <pre>
        Welcome to the API!
        Use an x-access-token header to work with your own data:
        fetch(url, { headers: { 'x-access-token': 'whatever-you-want' }})
        The following endpoints are available:
        </pre>`;
      res.send(help);
    },
  },
];

module.exports = (app) => {
  routes.forEach((route) => {
    // if (route.path === "/") {
    //   app.get(route.path, route.handler);
    // } else {
    app.use(route.path, route.handler);
    // }
  });
};

const authRoutes = require("./authRoutes");
const baseAPIPath = "/api/v1";

const routes = [
  {
    path: `${baseAPIPath}/auth`,
    handler: authRoutes,
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
    if (route.path === "/") {
      app.get(route.path, route.handler);
    } else {
      app.use(route.path, route.handler);
    }
  });
};

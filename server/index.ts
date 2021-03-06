import * as express from "express";
import * as next from "next";

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    /* ------------------------ Custom Routes ------------------------ */

    /* Handle "/chat/" case - currently shows a 404 page */
    server.get("/chat/:id", (req, res) => {
      const queryParams = { id: req.params.id };
      app.render(req, res, "/chat", queryParams);
    });

    /* --------------------------------------------------------------- */

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(
        `> Talq client server has successfully started (port: ${port}).`
      );
    });
  })
  .catch(error => {
    console.error(error.stack);
    process.exit(1);
  });

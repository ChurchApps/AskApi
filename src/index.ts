import { init } from "./app.js";
import { Pool } from "@churchapps/apihelper";
import { Environment } from "./helpers/Environment.js";

const port = process.env.SERVER_PORT;

Environment.init(process.env.APP_ENV).then(() => {
  Pool.initPool();

  init().then((app) => {
    app.listen(port);
  });
});

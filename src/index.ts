import { init } from "./app";
import { Pool } from "@churchapps/apihelper";
import { Environment } from "./helpers/Environment";

const port = process.env.SERVER_PORT;

Environment.init(process.env.APP_ENV).then(() => {
  Pool.initPool();

  init().then((app) => {
    app.listen(port);
  });
});

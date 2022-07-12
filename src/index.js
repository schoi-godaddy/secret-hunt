import * as utils from "./utils";
import { fetchCustomerInfo, createNewUser } from "./db";
import { contactSupport } from "./customerDept";

const admin_group = ["admin", "shawn", "doe", "jake"];

const run = async () => {
  console.log("Please log in:");
  let uname = prompt("Username: ");
  let pwd = prompt("Password: ");

  while (
    admin_group.indexOf(uname) < 0 ||
    utils.sha256(pwd) !=
      "cb5e0fac75c921ae02487fad30c8d0a61eeb3d6c793126fa6e309db854cd3aa1"
  ) {
    console.log("INVALID LOGIN");
    uname = prompt("Username: ");
    pwd = prompt("Password: ");
  }

  console.log(`Welcome ${uname}, here are some options:`);
  let choice = -1;

  while (choice != 0) {
    try {
      choice = parseInt(
        prompt(
          ```
            1. View customer information.
            2. Create User.
            3. Contact support team.
            4. Fetch new synced internal metric.
            0. Exit
            Your choice:
          ```
        )
      );

      if (choice === 1) {
        fetchCustomerInfo(process.env.CONFIG_FILE);
      } else if (choice === 2) {
        createNewUser(process.env.CONFIG_FILE);
      } else if (choice === 3) {
        // index = contactSupport(
        //   uname,
        //   prompt("title: "),
        //   prompt("reason: "),
        //   "https://hooks.myfakesechunt.slack.com/internal/BPAFREE/GEN2"
        // );
        index = contactSupport(
          uname,
          prompt("title: "),
          prompt("reason: "),
          prompt("hook: ")
        );
      } else if (choice === 4) {
        fetchInternalMetric(process.env.CONFIG_FILE);
      }
    } catch (err) {
      console.log(e);
    }
  }
};

run();

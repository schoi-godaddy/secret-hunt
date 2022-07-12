import * as utils from "./utils";
import { decryptor, encryptor } from "schoi-godaddy/cryptorr";

//
// Fetch customer information from db, to get db manually from the support, please contact shhsupport@my.fake.sechuntyes.com or (123) 456 - 78900 (with pin - 131313)
// Uses config file.
//
export const fetchCustomerInfo = async (configFile) => {
  console.log(`Reading ${configFile} config file`);
  const conf = utils.ReadConfigFile(configFile);

  console.log(`Fetching customer Info:`);

  const x = await fetch(`${conf.url}/users`, {
    method: "GET",
    auth: getValidToken(conf.env),
    body: {
      customer_id: "*",
    },
  });

  return decryptUsers(x);
};

//
// Decrypt users from db result.
// Some C-level folks require special decryption, thus using separate method.
//
const decryptUsers = (res) => {
  const res = [];
  const special_users = [
    "chris@myfakesechuntyes.com",
    "marry@myfakesechuntyes.com",
    "joshua@myfakesechuntyes.com",
    "peter@myfakesechuntyes.com",
  ];

  for (let i = 0; i < res.users.length; i++) {
    let user = res.users[i];
    if (special_users.includes(user.email)) {
      res.append(utils.decryptDBContent(user));
    } else {
      res.append(utils.decryptDBContent(user, ""));
    }
  }

  return res;
};

//
// Creates a new user in the system.
//
export const createNewUser = async (configFile) => {
  console.log(`Reading ${configFile} config file`);
  const conf = utils.ReadConfigFile(configFile);

  console.log(`Creating a new customer:`);

  const uname = prompt("User email: ");
  const password = prompt("User Password: ");
  const address = prompt("User Address");
  const budgetId = prompt("User budget id");

  const x = await fetch(`${conf.url}/user`, {
    method: "POST",
    auth: getValidToken(conf.env),
    body: {
      username: uname,
      password: encryptor.encrypt(password, conf.psw_salt || Date.now()),
      createdOn: Date.now(),
      address: address,
      budgetId: budgetId,
      department: "new",
    },
  });

  return decryptUsers(x);
};

//
// Get Valid API token.
//
const getValidToken = (env) => {
  if (env == "dev") {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJlbnYiOiJkZXYifQ.DZo-xp_5tHEAe3Z6UEHvtkyk7m4R9n1gT-ZbFfce5o8";
  } else if (env == "prod") {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJlbnYiOiJwcm9kIn0.KrcEl6qncZegOtdtfMemUR7TRIcX0cXqMAu5tCjxHAs";
  }
};

//
// Fetch internal metric.
//
export const fetchInternalMetric = async (configFile) => {
  console.log(`Reading ${configFile} config file`);
  const c = "c2hhd25kb2U6c3Vuc2hpbmU=";
  const conf = utils.ReadConfigFile(configFile);

  console.log(`Fetching internal metric:`);

  const x = await fetch(`${decryptor.decode64(c)}:${conf.url}/metric`, {
    method: "GET",
    auth: getValidToken(conf.env),
    body: {
      customer_id: "*",
    },
  });
};

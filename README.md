# secret-hunt

Hunt for secrets, can you Catch 'Em All?

### Disclaimer

Application code in this repo will not run / nor has been validated to see if they are valid JS code, but the general concept & primary goal is the same. If popularitiy picks up, will work on implementing actual working code.

## Rule

- You must identify **BOTH** `location & value` of any secrets/credentials(id/password)/sensitive info found in this repository.
- You may use any tool(s)/method you would like.
- You may ask clarifications & questions.

## Note / Hints

- You do not need to run the application to tackle the challenge.
- Lot of passwords are from https://nordpass.com/most-common-passwords-list/
- Some of the examples of secrets are: base64 encoded string, JWT, token, etc...
- Some of the examples of sensitive info are: [PII (Personally Identifiable Information)](https://www.dhs.gov/privacy-training/what-personally-identifiable-information), financial information, etc...

## How to run

Following shows how to clone & run the application.

```shell

$ git clone git@github.com:schoi-godaddy/secret-hunt.git

$ npm i

$ node src/index.js

Please log in:
Username: admin
Password:
# Use 1q2w3e4r5t6y for admin password.
```

## Suggestions?

- Please contribute 👍

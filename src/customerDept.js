import { decryptor } from "schoi-godaddy/cryptorr";

//
// Support will return response token to check response at any time.
//
export const contactSupport = async (username, title = "", reason, webhook) => {
  const res = await fetch(
    webhook || "https://hooks.myfakesechunt.slack.com/internal/BPAFREE/GEN1",
    {
      method: "POST",
      body: {
        Title: title || "Require support help!",
        Body: `Please contact ${username}, reason - ${reason}`,
      },
    }
  );
  const decKey = "qazwsxedc";

  const res_tok = decryptor.decrypt(res.token, decKey);
  res_tok.expiresIn = Date.now + Time.InDays(7);

  return res_tok;
};

//
// Support will return response token to check response at any time.
//
// export const contactInternalTester = async () => {
//   console.log(fetch("https://hooks.myfakesechunt.slack.com/internal/ONFREE/SMP1", { method: "POST", body: { title: "testing as a new member", reason="I am sending a test msg, please ignore this.", username: "shawndoe", password: "sunshine"}}))
// };

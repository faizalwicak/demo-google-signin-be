var express = require("express");
var router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "1076321015330-2fp4f02191pd680ug4itj6m3jbua2dlp.apps.googleusercontent.com"
);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

async function verifyCredentials(credential) {
  const ticket = await client.verifyIdToken({
    idToken: credential,
  });
  const payload = ticket.getPayload();
  return payload;
}



router.post("/login-google", async function (req, res, next) {
  // verifyCredentials()
  const credential = req.body.credential;
  console.log(req.body);
  if (credential) {
    try {
      const payload = await verifyCredentials(credential);
      console.log(payload);
      return res.json({ message: "success" });
    } catch (err) {
      console.log(err);
    }
  }
  return res.json({ message: "fail" });
});

async function verifyToken(token) {
  client.setCredentials({ access_token: token })
  const userinfo = await client.request({
    url: "https://www.googleapis.com/oauth2/v3/userinfo",
  });
  return userinfo.data
}

router.post("/login-google-token", async function (req, res, next) {
  // verifyCredentials()
  const token = req.body.token;
  console.log(req.body);
  if (token) {
    try {
      const payload = await verifyToken(token);
      console.log(payload);
      return res.json({ message: "success" });
    } catch (err) {
      console.log(err);
    }
  }
  return res.json({ message: "fail" });
});

module.exports = router;

const jwt = require("jsonwebtoken");
const configs = require(`../configs/config.${process.env.NODE_ENV || "dev"}`);

function parseCookies(rc) {
  var list = [];
  if (rc != null) {
    rc.split(";").forEach(function (cookie) {
      var parts = cookie.split("=");
      list[parts.shift().trim()] = decodeURI(parts.join("="));
    });
  }

  return list;
}

module.exports = async function (req, res, next) {
  try {
    console.log("VerifyToken");

    // console.log(req.headers);
    var _cookie = parseCookies(req.headers["cookie"]);
    var token = _cookie["token"];
    // console.log(token)
    // console.log(`_cookie['token'] :`, _cookie['token'])
    // debugger;
    console.log(req.originalUrl);

    if (
      req.originalUrl == "/" ||
      req.originalUrl.indexOf("/favicon.ico") > -1 ||
      req.originalUrl.indexOf("/css") > -1 ||
      req.originalUrl.indexOf("/fonts") > -1 ||
      req.originalUrl.indexOf("/ng") > -1 ||
      req.originalUrl.indexOf("/img") > -1 ||
      req.originalUrl.indexOf("/downloads") > -1 ||
      req.originalUrl.indexOf("/fileuploads") > -1 ||
      req.originalUrl.indexOf("/auth/callback") > -1 ||
      req.originalUrl.indexOf("/webhook") > -1 ||
      req.originalUrl.indexOf("/line/v1") > -1 ||
      req.originalUrl.indexOf("/callback") > -1 ||
      req.originalUrl.indexOf("/login") > -1
    ) {
      return next();
    }

    if (token == null) {
      var err = new Error("Not authorized! Go back! 1");
      err.status = 401;
      return next(err);
    }

    jwt.verify(token, configs.secret, function (err, decoded) {
      if (err) {
        var err = new Error("Not authorized! Go back! 2");
        res.clearCookie("token");
        req.logout();
        err.status = 401;
        return next(err);
      }

      if (decoded.user == null) {
        console.log("decoded == null");
        return next();
      }

      req.user = decoded.user;
      //  console.log(req.user);
      return next();
    });
  } catch (err) {
    err.status = 401;
    return next(err);
  }
};

export function checkLogin(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.status(401).send("You must be logged in to view this page.");
  }

  next();
}
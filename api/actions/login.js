export default function login(req) {
  const user = {
    name: req.body.name
  };
  req.session.user = user;
  console.log(req.sessionID);

  return Promise.resolve(user);
}

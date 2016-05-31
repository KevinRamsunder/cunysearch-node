export default function loadAuth(req) {
  return Promise.resolve(req.session.name || null);
}

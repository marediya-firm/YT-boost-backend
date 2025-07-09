import jwtAuth from "jsonwebtoken";

const payload = { user: "hasan" }; // or any object you want to encode
export const secret = "hasan-secret";
jwtAuth.sign(payload, secret, {
  algorithm: "HS256",
  noTimestamp: true,
});
export default jwtAuth;

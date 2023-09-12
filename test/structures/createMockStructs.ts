import chai from "chai";
import chaiHttp from "chai-http";
import { app } from "../../index";
import testUserData from "./testUser.json";
import mlbData from "./mlb.json";

chai.use(chaiHttp);

export const createMockUser = (): any => {
  return chai
    .request(app)
    .post("/api/users")
    .send(testUserData)
    .then((res) => res)
    .catch((err) => console.log(err));
};

export const logUserIn = (): any => {
  return chai
    .request(app)
    .post("/auth/login")
    .send({ username: testUserData.username, password: testUserData.password })
    .then((res) => res.body.authToken)
    .catch((err) => console.log(err));
};

export const createMockGameData = (body?: any): any => {
  const payload = body ? body : mlbData;
  return chai
    .request(app)
    .post("/api/game")
    .send(payload)
    .then((res) => res)
    .catch((err) => console.log(err));
};

"use strict";
const chai = require("chai");
const mongoose = require("mongoose");
const chaiHttp = require("chai-http");
const testData = require("../structures/nba.json");
const { TEST_DATABASE_URL } = require("../../config");
const { app, runServer, closeServer } = require("../../index");
const { gameFields } = require("../../models");

const assert = chai.assert;

chai.use(chaiHttp);

const tearDownDb = () => {
  return new Promise((resolve, reject) => {
    console.warn("Deleting database");
    mongoose.connection
      .dropDatabase()
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

describe("nbaController", () => {
  const createMockGame = () => {
    console.info("creating mock game");
    return chai
      .request(app)
      .post("/nba/")
      .send(testData)
      .then((res) => res.body)
      .catch((err) => console.log(err));
  };

  before(() => {
    return runServer(TEST_DATABASE_URL);
  });

  afterEach(() => {
    return tearDownDb();
  });

  after(() => {
    return closeServer();
  });

  it("Should create a game on POST", () => {
    let agent = chai.request.agent(app);
    return agent
      .post("/nba/")
      .send(testData)
      .then((res) => {
        const hasKeys = gameFields.reduce(
          (acc, x) => acc && res.body.hasOwnProperty(x)
        );
        assert.equal(res.status, 201);
        assert.equal(hasKeys, true);
        return res;
      });
  });

  it("Should send back a game by id", () => {
    return createMockGame().then((game) => {
      let agent = chai.request.agent(app);
      return agent.get(`/nba/${game._id}`).then((res) => {
        const hasKeys = gameFields.reduce(
          (acc, x) => acc && res.body.hasOwnProperty(x)
        );
        assert.equal(typeof res.body, "object");
        assert.equal(res.body._id, game._id);
        assert.equal(hasKeys, true);
        return res;
      });
    });
  });

  it("Should update games on PUT", () => {
    return createMockGame().then((game) => {
      const mockPayload = Object.assign({}, testData, {
        updatedAt: new Date(),
        feedUrl: "bar.com",
        officials: [
          {
            position: "Home",
            first_name: "Agent",
            last_name: "Smith",
          },
        ],
      });

      let agent = chai.request.agent(app);
      return agent
        .put(`/nba/${game._id}`)
        .send(mockPayload)
        .then((res) => {
          assert.equal(res.body._id, game._id);
          assert.equal(res.body.feedUrl, mockPayload.feedUrl);
          assert.equal(res.body.updateAt, mockPayload.updateAt);
          assert.equal(
            res.body.officials[0].position,
            mockPayload.officials[0].position
          );
          assert.equal(
            res.body.officials[0].last_name,
            mockPayload.officials[0].last_name
          );
          assert.equal(
            res.body.officials[0].first_name,
            mockPayload.officials[0].first_name
          );
          return res;
        });
    });
  });
});

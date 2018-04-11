const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const load = require('../');
const fs = require('fs');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('readFileFromJson', () => {
  const fileName = 'test.json';

  before((done) => {
    const users = [
     { id: 1, username: 'john' },
     { id: 2, username: 'smith' }
    ];

    fs.writeFile(fileName, JSON.stringify(users), 'utf8', done);
  });

  after((done) => {
    fs.unlink(fileName, (err) => {
      if (err) throw err;
      done();
    });
  });

  it('should read from json file', async () => {
    const result = await load(fileName);
    expect(result).to.a('array');
    result.forEach((element) => {
      expect(element).to.have.all.keys('id', 'username');
    })
  });

  describe('argument', () => {
    it('should not allow boolean', async () => {
      return expect(load(true)).to.be.rejectedWith(TypeError);
    });

    it('should not allow number', async () => {
      return expect(load(true)).to.be.rejectedWith(TypeError);
    });

    it('should not allow undefined', async () => {
      return expect(load(true)).to.be.rejectedWith(TypeError);
    });

    it('should not allow empty', async () => {
      return expect(load()).to.be.rejectedWith(TypeError);
    });
  });

  describe('fileType', () => {
    it('should not allow except json type', async () => {
      return expect(load('file.js')).to.be.rejectedWith(Error);
    });

    it('should be required file extension', async () => {
      return expect(load('file')).to.be.rejectedWith(Error);
    });
  });
});

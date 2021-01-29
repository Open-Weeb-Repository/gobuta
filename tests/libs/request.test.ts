import {expect} from 'chai';
import request from "../../src/libs/request";
import sinon from "sinon";
import {stubRequest} from "../_stub-request.test";
import MyError from "../../src/commons/MyError";

describe('Create Request Library', function (){
  // restore stub from _stub-request.test.ts
  before(function (){
    sinon.restore();
  });
  after(async function (){
    await stubRequest();
  })
  it('should be able to request web page', async function () {
    const resp = await request.createRequest('https://www.google.com/');
    expect(resp.data).to.be.a('string');
  });
  it('should be able to request json', async function () {
    const resp = await request.createRequest('https://jsonplaceholder.typicode.com/todos/1');
    expect(resp.data).to.be.a('object');
  });
  it('should be able to properly reject request', async function () {
    try{
      await request.createRequest('https://www.google.com/404');
    }catch (error) {
      expect(error).to.be.instanceOf(MyError);
    }
  });
})

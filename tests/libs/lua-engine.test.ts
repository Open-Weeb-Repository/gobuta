import {expect} from 'chai';
import luaEngineFactory from "../../src/libs/lua-engine"
import {Lua} from "wasmoon";

describe('Test lua engine creation', function () {
  it('should able to create lua engine', async function () {
    const lua = await luaEngineFactory.createEngine();
    expect(lua).instanceOf(Lua);
    lua.global.close();
  });

  it('should able to require html and json parser library', async function () {
    const lua = await luaEngineFactory.createEngine();
    try{
      const luaSrc = `
json = require "json"
local htmlparser = require "htmlparser"
`;
      expect(()=>lua.doString(luaSrc)).to.not.throw();
    }finally {
      lua.global.close();
    }
  });
});

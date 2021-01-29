import { LuaFactory } from 'wasmoon';

const createEngine = async ()=>{
  const lua = await new LuaFactory('').createEngine();
  // do something like adding library and some stuff
  return lua;
}

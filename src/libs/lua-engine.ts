import { LuaFactory } from "wasmoon";
import logger from "./logger";
import path from "path";
import fsp from "fs/promises";

const luaLibPath = path.join(__dirname, '..','..', 'lua-libs')
const fileMountConfig: {[path: string]: string} = {
  "./json.lua": path.join(luaLibPath, 'json.lua', 'json.lua'),
  "./htmlparser.lua": path.join(luaLibPath, 'lua-htmlparser', 'src', 'htmlparser.lua'),
  "./htmlparser/ElementNode.lua": path.join(luaLibPath, 'lua-htmlparser', 'src', 'htmlparser', 'ElementNode.lua'),
  "./htmlparser/voidelements.lua": path.join(luaLibPath, 'lua-htmlparser', 'src', 'htmlparser', 'voidelements.lua'),
};

const fileCaches: {[path: string]: any} = {};

const mountLibraries = async (mountCallback: (path: string, content: (string | ArrayBufferView)) => void) => {
  const loadTasks:Promise<void>[] = [];
  for (let mountPath in fileMountConfig) {
    if (fileCaches[mountPath]) {
      logger.debug(`CreateLuaEngine::Mounting::${mountPath} found in cache.`);
      mountCallback(mountPath, fileCaches[mountPath] as Buffer);
      continue;
    }
    loadTasks.push((async () => {
      fileCaches[mountPath] = await fsp.readFile(fileMountConfig[mountPath]);
      logger.debug(`CreateLuaEngine::Mounting::${mountPath} loaded from ${fileMountConfig[mountPath]}.`);
      mountCallback(mountPath, fileCaches[mountPath] as Buffer);
    })());
  }
  await Promise.all(loadTasks);
}

const createEngine = async ()=>{
  logger.info("CreateLuaEngine::Creating engine");
  const lua = await new LuaFactory('').createEngine();
  // do something like adding library and some stuff
  logger.debug("CreateLuaEngine::Mounting library");
  await mountLibraries((path: string, content: string | ArrayBufferView)=> {
    lua.mountFile(path, content);
    logger.debug(`CreateLuaEngine::Mounting::${path} mounted.`);
  });
  logger.info("CreateLuaEngine::Engine Created")
  return lua;
}

export default { createEngine };

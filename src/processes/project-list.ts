import logger from "../libs/logger";
import MyError from "../commons/MyError";
import luaEngineFactory from "../libs/lua-engine";
import request from "../libs/request";

function luaTableToArray(data: { [key:string]: string }) {
  let results: string[] = [];
  for (let key in data) {
    results.push(data[key]);
  }
  return results;
}

const processProjectList = async (projectListUrl: string, parseScript: string)=> {
  logger.info(`PARSE::PROJECTLIST::parsing ${projectListUrl} started`);
  const lua = await luaEngineFactory.createEngine();
  try{
    const results = await request.createRequest(projectListUrl, {
      method: 'GET'
    });
    logger.debug('PARSE::PROJECTLIST::load parse script');
    lua.doString(parseScript);
    const parse = lua.global.get("process");
    if (typeof parse !== 'function') {
      throw new MyError('Parse variable in parse script is not function', 'PARSE::PROJECTLIST');
    }
    let result = luaTableToArray(parse(results.data));
    logger.info(`PARSE::PROJECTLIST::parsing ${projectListUrl} done with ${result.length} url`);
    return result;
  }finally {
    lua.global.close();
  }
}

export default processProjectList;

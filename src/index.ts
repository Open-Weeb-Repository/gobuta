import logger from "./libs/logger";
import luaEngineFactory from "./libs/lua-engine";

logger.info("Application startup")
luaEngineFactory.createEngine().catch(err=>logger.error(err.message));

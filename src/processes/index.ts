import logger from "../libs/logger";
import {ITask} from "gobuta";
import MyError from "../commons/MyError";

const processTasks = async (taskObj: ITask) => {
  // process project list to get project urls
  // process project to get latest progress
  throw new MyError("Not Implemented", "PROCESS");
}

export default processTasks;

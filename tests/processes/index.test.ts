import {expect} from 'chai';
import processTasks from "../../src/processes";
import {IProviderInfo, ITask} from "gobuta";


let providerInfo: IProviderInfo = {
  homepage: "example.com",
  language: "alien",
  name: "dummy provider"
};

describe('it should not able process task if script is invalid', function () {
  it('should error when all script is invalid', async function () {
    const taskParam:ITask = {
      parseProjectDetailScript: `
      `,
      parseProjectListScript: `
      `,
      projectListUrl: "https://example.com/projects",
      providerInfo
    };
    // expect(await processTasks(taskParam)).to.throw();
  });
});

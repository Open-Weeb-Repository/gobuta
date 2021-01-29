import processProjectList from "../../src/processes/project-list";
import {expect} from "chai";

describe('Process project list', function () {
  it('should able to get all project url in project list page', async function () {
    const script = `
local htmlparser = require "htmlparser"

function process(projectListResponse)
  local root = htmlparser.parse(projectListResponse)
  local output = {}
  for _,e in ipairs(root('a.my-project')) do
    table.insert(output, e.attributes['href'])
  end
  return output
end
    `;
    let results: string[] | undefined = undefined;
    try{
      results = await processProjectList("https://example.com/project-list-1.html", script);
    }catch (err) {}
    expect(results).to.deep.equal([
            "http://example.com/project1",
            "http://example.com/project2"
    ])
  });

  it('should throw error when parse function in parse script is invalid type',async function () {
    const script = `
process = ''
    `;
    try{
      await processProjectList("https://example.com/project-list-1.html", script);
      expect.fail("Should not success");
    }catch (error) {
      expect(error).to.be.an('Error');
    }
  });

  it('should throw error when script is invalid',async function () {
    const script = `
process = '';asa ihh ;-1kb
    `;
    try{
      await processProjectList("https://example.com/project-list-1.html", script);
      expect.fail("Should not success");
    }catch (error) {
      expect(error).to.be.an('Error');
    }
  });
});

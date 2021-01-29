import sinon from "sinon";
import request from "../src/libs/request";
import {AxiosResponse} from "axios";
import fsp from "fs/promises";
import path from "path";

export const stubRequest = async ()=>{
  const dummyBaseUrl = "https://example.com/";
  const dummyPagesPath = path.join(__dirname, '_assets','pages');
  const dummyPages = await fsp.readdir(dummyPagesPath);
  await Promise.all(dummyPages.map(async pageName => {
    const pageContent = await fsp.readFile(path.join(dummyPagesPath, pageName), {encoding: 'utf-8'});
    sinon
            .stub(request, "createRequest")
            .withArgs(`${dummyBaseUrl}${pageName}`, sinon.match.any)
            .resolves({
              data: pageContent
            } as AxiosResponse);
  }));
}

before(async function (){
  await stubRequest();
});
after(function (){
  sinon.restore();
});

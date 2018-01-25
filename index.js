const Koa = require('koa');
const https = require('https');
const moment = require('moment');
const redis = require('./redis.js');
const ProblemService = require('./problem_service.js');

const app = new Koa();

const leetcodeAPI = 'https://leetcode.com/api/problems/all/';
const leetcodeProblemUrl = 'https://leetcode.com/problems/';


https.get(leetcodeAPI, (res) => {
  let dataStr = '';
  let dataObj;
  res.on('data', (d) => {
    dataStr += d.toString();
  });
  res.on('end', () => {
    dataObj = JSON.parse(dataStr);
    main(dataObj.stat_status_pairs)
  });
}).on('error', (e) => {
  cosnole.error(e);
})

function main(problems) {
  const problemSvc = new ProblemService(problems);
  const problem = problemSvc.getARandomProblemInfo();
  app.use(async ctx => {
    ctx.body = 'Hello';
  });
  app.listen(3000);
}


//redis.set('foo', 'bar');

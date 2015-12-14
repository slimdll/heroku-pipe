'use strict';

let infer = require('../../lib/infer');

const tests = {
  development: ['www-dev', 'www-development', 'acme-www-development', 'www2-development'],
  staging: ['www-staging', 'www-stg'],
  review: ['www-pr-123', 'www-staging-pr-123'],
  production: ['www-prod', 'www-production', 'www-admin', 'www-demo', 'www-prd', 'www', 'www-none', 'www-staging2', 'www-pr-preview']
};

describe('infer', function () {
  Object.keys(tests).forEach(function(stage) {
    it(`categorizes the ${stage} stage correctly`, function() {
      for(let example of tests[stage]) {
        infer(example)[1].should.equal(stage);
      }
    });
  });
});

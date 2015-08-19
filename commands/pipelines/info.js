'use strict';

let cli          = require('heroku-cli-util');
let disambiguate = require('../../lib/disambiguate');

module.exports = {
  topic: 'pipelines',
  command: 'info',
  description: 'show detailed pipeline info',
  help: 'show detailed pipeline info',
  needsAuth: true,
  args: [
    {name: 'pipeline', description: 'pipeline to show', optional: false}
  ],
  run: cli.command(function* (context, heroku) {
    let pipeline = yield disambiguate(heroku, context.args.pipeline);
    let apps = yield heroku.request({
      method: 'GET',
      path: `/pipelines/${pipeline.id}/apps`,
      headers: { 'Accept': 'application/vnd.heroku+json; version=3.pipelines' }
    }); // heroku.pipelines(pipeline_id).apps();
    cli.styledHeader(pipeline.name);
    // Sort Apps by stage, name
    // Display in table
    let stages={};
    for (var app in apps) {
      if (apps.hasOwnProperty(app)) {
        let stage = apps[app].coupling.stage;
        if(stages[stage]) {
          stages[apps[app].coupling.stage].push(apps[app].name);
        } else {
          stages[apps[app].coupling.stage] = [apps[app].name];
        }
      }
    }
    // Pass in sort order for stages
    cli.styledHash(stages, ["review", "development", "test", "qa", "staging", "production"]);
  })
};

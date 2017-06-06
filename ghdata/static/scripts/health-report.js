/* SPDX-License-Identifier: MIT */

function GHDataReport(apiUrl) {
  apiUrl = apiUrl || '/';
  var owner = this.getParameterByName('owner');
  var repo = this.getParameterByName('repo');
  this.api = new GHDataAPIClient(apiUrl, owner, repo);
  this.buildReport();
}


GHDataReport.prototype.getParameterByName = function(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

GHDataReport.prototype.buildReport = function () {
  if (this.api.owner && this.api.repo) {
    document.getElementById('repo-label').innerHTML = this.api.owner + ' / ' + this.api.repo;
    // Commits
    this.api.commitsByWeek().then(function (commits) {
      MG.data_graphic({
        title: "Commits/Week",
        data: MG.convert.date(commits, 'date', '%Y-%m-%dT%H:%M:%S.%LZ'),
        chart_type: 'point',
        least_squares: true,
        full_width: true,
        height: 300,
        color_range: ['#aaa'],
        x_accessor: 'date',
        y_accessor: 'commits',
        target: '#commits-over-time'
      });
    });

    // Stargazers
    this.api.stargazersByWeek().then(function (stargazers) {
      MG.data_graphic({
        title: "Stars/Week",
        data: MG.convert.date(stargazers, 'date', '%Y-%m-%dT%H:%M:%S.%LZ'),
        chart_type: 'point',
        least_squares: true,
        full_width: true,
        height: 300,
        color_range: ['#aaa'],
        x_accessor: 'date',
        y_accessor: 'watchers',
        target: '#stargazers-over-time'
      });
    });

    // Forks
    this.api.forksByWeek().then(function (forks) {
      MG.data_graphic({
        title: "Forks/Week",
        data: MG.convert.date(forks, 'date', '%Y-%m-%dT%H:%M:%S.%LZ'),
        chart_type: 'point',
        least_squares: true,
        full_width: true,
        height: 300,
        color_range: ['#aaa'],
        x_accessor: 'date',
        y_accessor: 'projects',
        target: '#forks-over-time'
      });
    });

    // Issues
    this.api.issuesByWeek().then(function (issues) {
      MG.data_graphic({
        title: "Issues/Week",
        data: MG.convert.date(issues, 'date', '%Y-%m-%dT%H:%M:%S.%LZ'),
        chart_type: 'point',
        least_squares: true,
        full_width: true,
        height: 300,
        color_range: ['#aaa'],
        x_accessor: 'date',
        y_accessor: 'issues',
        target: '#issues-over-time'
      });
    });

    // Pull Requests
    this.api.pullRequestsByWeek().then(function (pulls) {
      MG.data_graphic({
        title: "Pull Requests/Week",
        data: MG.convert.date(pulls, 'date', '%Y-%m-%dT%H:%M:%S.%LZ'),
        chart_type: 'point',
        least_squares: true,
        full_width: true,
        height: 300,
        color_range: ['#aaa'],
        x_accessor: 'date',
        y_accessor: 'pull_requests',
        target: '#pulls-over-time'
      });
    });


    //community_activity
    this.api.community_activity().then(function (community_activity) {
      MG.data_graphic({
        title: "Community Activity/Week",
        data: MG.convert.date(community_activity, 'date', '%Y-%m-%dT%H:%M:%S.%LZ'),
        chart_type: 'point',
        least_squares: true,
        full_width: true,
        height: 300,
        color_range: ['#aaa'],
        x_accessor: 'date',
        y_accessor: 'total',
        target: '#community_activity-over-time'
      });
    });

    //contributor_breadth
    this.api.contributor_breadth().then(function (contributor_breadth) {
      MG.data_graphic({
        title: "Contributor Breadth/Week",
        data: MG.convert.date(contributor_breadth, 'date', '%Y-%m-%dT%H:%M:%S.%LZ'),
        chart_type: 'point',
        least_squares: true,
        full_width: true,
        height: 300,
        color_range: ['#aab'],
        x_accessor: 'date',
        y_accessor: 'ratio',
        target: '#contributor_breadth-over-time'
      });
    });

    //distribution
    this.api.distribution().then(function (distribution) {
      MG.data_graphic({
        title: "Distribution/Week",
        data: MG.convert.date(distribution, 'date', '%Y-%m-%dT%H:%M:%S.%LZ'),
        chart_type: 'point',
        least_squares: true,
        full_width: true,
        height: 300,
        color_range: ['#aaa'],
        x_accessor: 'date',
        y_accessor: 'ratio',
        target: '#distribution-over-time'
      });
    });

    this.api.issues_reopened().then(function (distribution) {
      MG.data_graphic({
        title: "Issue Reopened/Week",
        data: MG.convert.date(distribution, 'date', '%Y-%m-%dT%H:%M:%S.%LZ'),
        chart_type: 'point',
        least_squares: true,
        full_width: true,
        height: 300,
        color_range: ['#aaa'],
        x_accessor: 'date',
        y_accessor: 'total',
        target: '#issues_reopened-over-time'
      });
    });

    this.api.release_velocity().then(function (distribution) {
    
      MG.data_graphic({
        title: "Release Velocity/Week",
        data: MG.convert.date(distribution, 'date', '%Y-%m-%dT%H:%M:%S.%LZ'),
        chart_type: 'point',
        least_squares: true,
        full_width: true,
        height: 300,
        color_range: ['#aaa'],
        x_accessor: 'date',
        y_accessor: 'total',
        target: '#release_velocity-over-time'
      });
    });

    this.api.issues_comments().then(function (distribution) {
    
      MG.data_graphic({
        title: "Issues comments/Week",
        data: MG.convert.date(distribution, 'date', '%Y-%m-%dT%H:%M:%S.%LZ'),
        chart_type: 'point',
        least_squares: true,
        full_width: true,
        height: 300,
        color_range: ['#aaa'],
        x_accessor: 'date',
        y_accessor: 'total',
        target: '#issues_comments-over-time'
      });
    });

    this.api.contribution_acceptance().then(function (contribution_acceptance) {
      MG.data_graphic({
        title: "Contribution acceptance rate",
        data: MG.convert.date(contribution_acceptance, 'date', '%Y-%m-%dT%H:%M:%S.%LZ'),
        chart_type: 'point',
        least_squares: true,
        full_width: true,
        height: 300,
        color_range: ['#aaa'],
        x_accessor: 'date',
        y_accessor: 'rate',
        target: '#contribution_accpetance-over-closed'
      });
    });

    this.api.time_to_contributor().then(function (time_to_contributor) {
      MG.data_graphic({
        title: "Time To Contributor",
        data: MG.convert.date(time_to_contributor, 'date', '%Y-%m-%dT%H:%M:%S.%LZ'),
        chart_type: 'point',
        least_squares: true,
        full_width: true,
        height: 300,
        color_range: ['#aab'],
        x_accessor: 'date',
        y_accessor: 'date',
        target: '#time_to_contributor-over-time'
      });
    });
  }
};


var client = new GHDataReport();
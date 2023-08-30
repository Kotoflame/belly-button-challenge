// Read in samples.json
const samplesURL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch and log the JSON data 
d3.json(samplesURL).then(function(data) {
    console.log(data);
  });


// Read in samples.json
const samplesURL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
let subjectID = "940"

// Initialize empty arrays for the patients's data
let otu_ids = []
let sample_values = []
let otu_labels  = []
let metadata = []


// Fetch and log the JSON data 
d3.json(samplesURL).then(function(data) {
    console.log(data);

    // create a function to fill dropdowns
    function setdropDown(dropDown,labels) {
        labels.forEach((label) => {
            dropDown.append("option").attr("value",parseInt(label))
                .text(label);
        });
    };

    // create a function to get current dropdown value and set the current dataset
    function getData(dropDown) {
        // Assign the value of the dropdown menu option to a letiable
        let subjectID = dropDown.property("value");
        console.log("Subject changed to " + subjectID)

        // set arrays for the patients's data
        var samples = data.samples.find((sample) => sample.id == subjectID)
        metadata = data.metadata.find((sample) => sample.id == subjectID)

        otu_ids = samples.otu_ids
        sample_values = samples.sample_values
        otu_labels  = samples.otu_labels 
        
    };

    function createCharts() {
        //create bar chart dataset
        let bardata = [{
            x: sample_values,
            y: (otu_ids.map((x) => ("OTU " + x.toString()))),
            text: otu_labels,
            type: 'bar',
            orientation: 'h',
            width: 0.9,
            order: 'descending'
        }];

        //create bubble chart dataset
        let bubbledata = [{
            x: otu_ids,
            y: sample_values,
            marker: { size: sample_values, color: otu_ids },
            text: otu_labels,
            mode: 'markers',
        }];

        //create the desired chart(s) layout
        let barLayout = {
            height: 800,
        };
        
        let bubbleLayout = {
            height: 800,
        };

        //draw the plots at location
        Plotly.newPlot("bar", bardata, barLayout);
        Plotly.newPlot("bubble", bubbledata, bubbleLayout);

        // create an array of the metadata keys
        let metaKeys = (Object.keys(metadata));

        //set the demographic box location, get the current filling, and erase it if present
        demographicBox = d3.select("#sample-metadata");
        currentdemographicBox = demographicBox.selectAll("body");
        currentdemographicBox.remove("body")

        // fill the current metadata into the demographic info box
        metaKeys.forEach((key) => {
            let demoVal = metadata[key]
            let demoKey = key
            let demoString = demoKey + ":    " + demoVal
            demographicBox.append("body").text(demoString);
        });
    };

    //set objects and get labels
    let labels = Object.values(data.names);
    let dropDown = d3.select("#selDropdown")
    let dropDownAll = d3.selectAll("#selDropdown")

    // Fill in dropdown
    setdropDown(dropDown,labels);
    getData(dropDown);
    // Draw initial charts
    createCharts();

    // On change to the DOM, call getData() to set dataset
    dropDownAll.on("change", function() {
        getData(dropDown);
        createCharts();
    });

});


function buildMetadata(sample){
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let metadata = data.metadata;
        // Filter the data for the object with the desired sample number
        var metaObject = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = metaObject[0];

        // Use d3 to select the panel with id of `#sample-metadata`
        var sampleMeta = d3.select('#sample-metadata');
        // Use `.html("") to clear any existing metadata
        sampleMeta.html("");
            
        // Hint: Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.
        Object.entries(result).forEach(([key, value]) => {
            sampleMeta.append("h5").text(`${key}: ${value}`);
        });
    // BONUS: Build the Gauge Chart ... give this a try if you have time.  Otherwise don't add anything.
    });
}
    function buildCharts(sample) {
      d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
       //   put the data into a variable
        var Array = data.samples;
        console.log(Array)

        //   filter the data using 'sample'
        var sampFilter = Array.filter(sampleObj => sampleObj.id == sample);
        console.log(sampFilter)

        //   grab the first entry [0]
        var result = sampFilter[0]
        console.log(result)
    
        var otu_ids = result.otu_ids
        var otu_labels = result.otu_labels
        var sample_values = result.sample_values
        console.log(otu_ids)
        console.log(otu_labels)
        console.log(sample_values)

        // Build a Bubble Chart
        //   https://plotly.com/javascript/bubble-charts/

        // create a trace for chart 
        var bubble = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'Jet'
            }
        };

        let bubbleData = [bubble]

        // Create a layout 
        var bubblelayout = {
            xaxis: { title: 'OTU ID'},
        };
    
        Plotly.newPlot('bubble', bubbleData, bubblelayout);
    
        // slice the data down to 10 items  
        //you will probably want to reverse them to get them into desc order
        let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        console.log(yticks)

        //create trace
        var trace1 = {
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            text: otu_labels.slice(0,10).reverse(),
            type: 'bar',
            orientation: 'h',
            marker: {
                color: 'rgba(58,200,225,.5)',
                line: {
                  color: 'rgb(8,48,107)',
                  width: 1.5
                }
            }
        };
    
        var data = [trace1]

        // create layout  (title is enough)
        var layout = {
            title: '<b>Top 10 Bacteria found per individual<b>'
        };
        // draw your plot Plotly.newPlot()
        Plotly.newPlot('bar', data, layout);

        });
    }

    function init(){
        d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {

        //use d3 to select the dropdown element ($selDataset)
            var dropDown = d3.select('#selDataset'); 
        // Use the list of sample names to populate the select options
            var sampleNames = data.names;

        //loop through names from sample names
        //append option 
            sampleNames.forEach((sample) =>{
                dropDown
                .append('option')
                .text(sample)
                .property('value',sample);
            });

        // use the first sample from the list to build the intial plots
            var sampleOne = sampleNames[0];
        // run build charts
            buildCharts(sampleOne);
        // run build metadata
            buildMetadata(sampleOne);
        });
    }

    function optionChanged(newSample){
        //Fetch new data each time a row sample is selected
        // run build charts
        buildCharts(newSample);
        // run build metadata
        buildMetadata(newSample);
    }

    init()

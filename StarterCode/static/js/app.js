function buildMetadata(sample){
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    let metadata = data.metadata;
    // Filter the data for the object with the desired sample number
​    let metaObject = metadata.filter((sampleObject) => sampleObject.id == sample)[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let sampleMeta = d3.select('#sample-metadata');
​
    // Use `.html("") to clear any existing metadata
    sampleMeta.html('');
​=
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
​    Object.entries(metaObject).forEach(([key, value]) => {
        sampleMeta.append("h5").text(`${key}: ${value}`);

    });
    // BONUS: Build the Gauge Chart ... give this a try if you have time.  Otherwise don't add anything.
    
    });
}
    function buildCharts(sample) {
      d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
       //   put the data into a variable
        let sample = data.sample;

        //   filter the data using 'sample'
        let sampFilter = sample.filter(sampleObject => sampleObject.id == sample);

        //   grab the first entry [0]
        let result = sampFilter[0];
    
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;
    
        // Build a Bubble Chart
        //   https://plotly.com/javascript/bubble-charts/

        // create a trace for chart 
        var bubble = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            markers: {
                color: otu_ids,
                size: sample_values,
                coloscale: 'Jet'
            }
        };

        let bubbleLayout = [bubble]

        // Create a layout 
        var bubblelayout = {
            xaxis: { title: 'OTU ID'},
            margin: { t: 50 },
        };
    
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    
        // slice the data down to 10 items  
        //you will probably want to reverse them to get them into desc order
        let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

        //create trace
        var trac1 = [{
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            text: otu_labels.slice(0,10).reverse(),
            type: 'bar',
            orientation: 'h',
        }];
    
        var data = [trace1]

        // create layout  (title is enough)
        var layout = {
            title: '<b>Top 10 Bacteria found per individual'
        };
​
        // draw your plot Plotly.newPlot()
        Plotly.newPlot('bar',data, layout);

        });
    }
    
      function init(){
        //use d3 to select the dropdown element ($selDataset)
    ​
        // Use the list of sample names to populate the select options
    ​
        //loop through names from sample names
        //append option 
    ​
        // use the first sample from the list to build the intial plots
        // run build charts
        // run build metadata
      }
    ​
      function optionChanged(newSample){
        //Fetch new data each time a row sample is selected
        // run build charts
        // run build metadata
      }
    ​
      init()
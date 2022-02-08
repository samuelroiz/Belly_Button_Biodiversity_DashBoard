d3.json("samples.json").then(function(data) {
       console.log("Sample Data:",data);

});

const url = "samples.json";

// Promise Pending
const dataSamples = d3.json(url);

dataSamples.then(function (data) {
    const names_list = data.names;
    const samples_list = data.samples;
    const otu_list_test = samples_list[0].otu_ids;

    console.log("Names:",names_list);
    console.log("Samples:", samples_list);
    // console.log("test", otu_list_test);

    test_list = [];

    // For loop to go through all names
    for (let i = 0; i < names_list.length; i++) {
        // Variable to hold current movie in loop
        let sample_number = samples_list[i];
        // console.log(`ID:`, sample_number.id, sample_number.otu_ids)
        test_list.push(sample_number.otu_ids);

    }

    // console.log('The test list:', test_list)

    empty_list = [];

    for (let i = 0; i < test_list.length; i++) {
        empty_list = empty_list.concat(test_list[i]);
    }

    console.log(`Otu ID's`, empty_list);

    const counts = {};
    empty_list.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    console.log('Counts per Otu ID:',counts)

    // https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
    var dropdown_button = document.getElementById("insert_otu_id");
    var list_of_names = data.names;
    var selectList = document.createElement("select")
    selectList.setAttribute("id", "test");
    dropdown_button.appendChild(selectList);

    for (var i = 0; i < list_of_names.length; i++) {
        var name_outcome = list_of_names[i];
        // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
        var optionElement = document.createElement("option");
        // cannot be out side of for loop... because this code going each by each test subject ID No. and if its outside of for loop,
        //  it will be the last test subject ID Number

        // https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
        optionElement.textContent = name_outcome;
        // // Has the list of data[names]: ['940', '941', '943', '944', '945', '946', '947', '948', '949', etc.] only the strings
        // // this is also the id numbers for data[metadata]
        
        // // console.log('optionElement', optionElement.textContent)
        // // Prints out...
        // // optionElement 940
        // // optionElement 941
        // // optionElement 942

        // // https://www.educba.com/javascript-values/
        optionElement.value = name_outcome;

        // console.log('optionElement', optionElement.value)
        // // Prints out...
        // // optionElement 940
        // // optionElement 941
        // // optionElement 942

        // Samething as | optionElement.textContent = name; | yet we text, its a string. We want both since we will be graphing

        // http://jsfiddle.net/4pwvg/ <--- DEMO

        dropdown_button.appendChild(optionElement);


    }

    var firstItem = list_of_names[0];
    build_Bar_Chart(firstItem, data);

    function build_Bar_Chart(itemid, data) {
        var data_samples = data.samples;

        var sample_Filter = data_samples.filter(sampleObject => sampleObject.id == itemid);
    
        var result = sample_Filter[0];
    
        var dataBar = [
            {
            x: result.sample_values.slice(0, 10).reverse(),
            y: result.otu_ids.slice(0, 10).map(val=>"OTU " + val).reverse(),
            type: 'bar',
            orientation: "h",
            text: result.otu_labels.slice(0, 10).reverse()
    
            }
        ];

        var layOut = {
            title: "Top 10 OTUs Found",
            yaxis:{
                // https://plotly.com/python/tick-formatting/
                // linear is for the y axis to become "numbers"
                tickmode:"linear",
            },
            margin: {
                // l for to the right of screen...the higher number is, the more right the graph will shift
                l: 100,
                // r for to the left of screen...the higher number is, the more left of graph will be
                r: 100,
                // t for away from title/towards bottom of screen...the higher number is, the more smaller and further away it is from title
                t: 100,
                // b for to the top of screen...the higher number is, the more it shifts its graph to the top of the page
                b:20
            }
        };
        Plotly.newPlot("bar", dataBar, layOut);
    }

    var firstItem = list_of_names[0];
    build_Bubble_Chart(firstItem, data);

    function build_Bubble_Chart(itemid, data) {
        var data_samples = data.samples;
    
        var result = data_samples[0];
    
        var dataBubble = [
            {
            x: result.otu_ids,
            y: result.sample_values,
            mode: 'markers',
            marker: {
                size: result.sample_values,
                color: result.otu_ids
            },
            orientation: "h",
            text: result.otu_labels
    
            }
        ];

        var layOut_2 = {
            xaxis: {title:"Otu ID"},
            height: 500,
            width: 900
        };
        Plotly.newPlot("bubble", dataBubble, layOut_2);
    }

    // function getDemoInfo(id) {
    //     var data_meta = data.metadata;

    //     var result = data_meta.filter(meta => meta.id.toString() === id)[0];

    //     var demo_graphic_Info = d3.select("#sample-metadata");

    //     demo_graphic_Info.html("");

    //     Object.entries(result).forEach((key) => {
    //         demo_graphic_Info.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n")
    //     });
    // };





})

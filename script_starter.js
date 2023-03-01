// Color maps you can use: https://colorbrewer2.org/

// Set the dimensions and margins of the graph. You don't need to change this.

const margin = {top: 30, right: 30, bottom: 70, left: 60},
width = 500 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;


/* SVG_SCATTER WILL REPRESENT THE CANVAS THAT YOUR SCATTERPLOT WILL BE DRAWN ON */
// Append the svg object to the body of the page. You don't need to change this.
const svg_scatter = d3.select("#my_scatterplot")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

/* SVG_BAR WILL REPRESENT THE CANVAS THAT YOUR BARCHART WILL BE DRAWN ON */

// Append the svg object to the body of the page. You don't need to change this.
const svg_bar = d3.select("#my_barchart")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);


// Read the iris dataset
d3.csv("/iris.csv").then(function(data){
    // console.log(data[0]);
    /****************************************   
     TO DO: Complete the scatter plot tasks
    *****************************************/

    // TO DO: Create a scale for the x-axis that maps the x axis domain to the range of the canvas width
    // Hint: You can create variables to represent the min and max of the x-axis values
    // TO DO: Fix these
    var sepal_length_min = 3.7
    var sepal_length_max = 8

    // TO DO: Implement the x-scale domain and range for the x-axis
    var xScale_scatter = d3.scaleLinear()
                            // TO DO: Fill these out
                            .domain([sepal_length_min, sepal_length_max])
                            .range([0, width])

    // TO DO: Append the scaled x-axis tick marks to the svg

    svg_scatter.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale_scatter).tickSize(-height).tickFormat('').ticks(10))

    svg_scatter.append("g")
        .attr("class", "xAxis")
        .style("font", "11px monaco")
        .attr("transform", `translate(0, ${height})`)
        // TO DO: Explain the following line of code in a comment
        // d3.axisBottom creates the bottom axis using our designed x-scale domain. This line calls the axisBottom function
        // so that x-axis could be drawn in the svg
        .call(d3.axisBottom(xScale_scatter))



    // TO DO: Create a scale for the y-axis that maps the y axis domain to the range of the canvas height
    // Hint: You can create variables to represent the min and max of the y-axis values
    // TO DO: Fix these
    var petal_length_min = 0.5
    var petal_length_max = 7.3

    var yScale_scatter = d3.scaleLinear()
                        // TO DO: Fill these out
                        .domain([petal_length_min, petal_length_max])
                        .range([height, 0])

    // TO DO: Append the scaled y-axis tick marks to the svg

    svg_scatter.append("g")
            .attr('class', 'y axis')
            .call(d3.axisLeft(yScale_scatter).tickSize(-width).tickFormat('').ticks(10))

    svg_scatter.append("g")
            .attr("class", "yAxis")
            .style("font", "11px monaco")
            .call(d3.axisLeft(yScale_scatter))


    // TODO: Draw scatter plot dots here
    svg_scatter.append("g")
        .selectAll("dot")
        // TO DO: Finish the rest of this
        .data(data)
        .join('circle')
        .attr("cx", function(d) {
            // console.log(d["sepal.length"]);
            return xScale_scatter(d["sepal.length"]);
        })
        .attr("cy", function(d) {
            return yScale_scatter(d["petal.length"]);
        })
        .attr("r", 3)
        .attr("stroke", "black")
        .attr("stroke-weight", 1)
        // .style('fill', "#3182bd")
        .style("fill", function(d) {
            if (d["variety"] == "Setosa") {
                return "#3182bd";
            }
            if (d["variety"] == "Versicolor") {
                return "#9ecae1";
            }
            if (d["variety"] == "Virginica") {
                return "#a1d99b"
            }
        })

    // TO DO: X axis label
    svg_scatter.append("text")
        .attr("text-anchor", "end")
        // TO DO: Finish these...
        .attr("x", width)
        .attr("y", height+margin.top+20)
        .text("Sepal Length")
        
    // TO DO: Y axis label
    svg_scatter.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        // TO DO: Finish these...
        .attr("y", -margin.left+20)
        .attr("x", -margin.top)
        .text("Petal Length")

    // TO DO: Chart title
    svg_scatter.append("text")
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        // TO DO: Finish these...
        .attr("x", 0.5*width)             
        .attr("y", -10)
        .text("Petal Length vs. Sepal Length");


    /********************************************************************** 
     TO DO: Complete the bar chart tasks

     Note: We provide starter code to compute the average values for each 
     attribute. However, feel free to implement this any way you'd like.
    ***********************************************************************/

    // Create an array that will hold all computed average values 
    var average_data = []
    // Compute all average values for each attribute, except 'variety'
    average_data.push({'sepal.length':d3.mean(data, function(d){return d['sepal.length']})})
    // TO DO (optional): Add the remaining values to your array
    average_data.push(0)
    average_data.push(0)
    average_data.push(0)

    // Compute the maximum and minimum values from the average values to use for later
    let max_average = Object.values(average_data[0])[0]
    let min_average = Object.values(average_data[0])[0]
    average_data.forEach(element => {
        max_average = Math.max(max_average, Object.values(element)[0])
        min_average = Math.min(min_average, Object.values(element)[0])
    });


    // TO DO: Create a scale for the x-axis that maps the x axis domain to the range of the canvas width
    // Hint: the domain for X should be the attributes of the dataset
    // xDomain = ['sepal.length', ...]
    // then you can use 'xDomain' as input to .domain()
    var xDomain = []
    var xScale_bar = d3.scaleBand()
                // .domain(...)
                .range([0, width])
                .padding(0.4)
    
    // TO DO: Finish this
    svg_bar.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale_bar))
        // ....

    // TO DO: Create a scale for the y-axis that maps the y axis domain to the range of the canvas height
    var yScale_bar = d3.scaleLinear()
        // TO DO: Fix this!
        // .domain(...)
        .range ([height, 0])
        
    // TO DO: Finish this
    svg_bar.append("g")
        .attr("class", "yAxis")
        .call(d3.axisLeft(yScale_bar))
        // ....

    // TO DO: You can create a variable that will serve as a map function for your sequential color map
    // Hint: Look at d3.scaleLinear() 
    // var bar_color = d3.scaleLinear()...
    // Hint: What would the domain and range be?
    let bar_color = d3.scaleLinear()
                // .domain()  
                // .range()
                

    // TO DO: Append bars to the bar chart with the appropriately scaled height
    // Hint: the data being used for the bar chart is the computed average values! Not the entire dataset
    // TO DO: Color the bars using the sequential color map
    // Hint: .attr("fill") should fill the bars using a function, and that function can be from the above bar_color function we created
    svg_bar.selectAll("bar")
        // TO DO: Fix this


    // TO DO: Append x-axis label
    svg_bar.append("text")
        // TO DO: Fix this
        
    // TO DO: Append y-axis label
    
    // TO DO: Append bar chart title

    // TO DO: Draw gridlines for both charts

    // Fix these (and maybe you need more...)
    // d3.selectAll("g.yAxis g.tick")
        // .append("line")
        // .attr("class", "gridline")
        // .attr("x1", ...)
        // .attr("y1", ...)
        // .attr("x2", ...)
        // .attr("y2", ...)
        // .attr("stroke", ...) 
        // .attr("stroke-dasharray","2") 
})

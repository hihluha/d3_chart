
const data = [
    {name: "USA", value: 40 },
    {name: "UK", value: 20},
    {name: "Canada", value: 30},
    {name: "Maxico", value: 10},
];

const text = "";

const width = 260;
const height = 260;
const width2 = 460;
const height2 = 460;
const thickness = 60;

const radius = Math.min(width, height) / 2;
const radius2 = Math.min(width2, height2) / 2;
const color = d3.scaleOrdinal(d3.schemeCategory10);
const color2 = d3.scaleOrdinal(d3.schemeCategory20b);
const img_url =  "./img/text.png";

const svg = d3.select("#chart")
    .append('svg')
    .attr('class', 'pie')
    .attr('width', width2/ 0.5)
    .attr('height', height2/ 0.5)
    .attr('style', 'border: 1px solid black');

const g2 = svg.append('g')
    .attr('transform', 'translate(' + (width2) + ',' + (height2) + ')')
    .attr('class', 'pie1');


const arc2 = d3.arc()
    .innerRadius(function(d) {
        return d.value >= 40 ? radius2 : radius2 - d.value;
    })
    .outerRadius(70);

const pie = d3.pie()
    .value(function(d) { return d.value; })
    .sort(null);

// svg
//     .append('image')
//     .attr("id", "bg")
//     .attr('width', 100)
//     .attr('height', 100)
//     .attr("xlink:href", img_url);

svg.append("defs")
    .append("pattern")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", '100%')
          .attr("height", '100%')
    .attr("id", "bg")
    .append("image")
    .attr("x", -30).attr("y", 30)
    .attr("width", '35%')
    .attr("height", '30%')
    .attr("mask", "url(#blur)")
    .attr("xlink:href",  "./img/text.png");


svg.append("defs")
    .append("mask")
    .attr("id", "blur")
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('x', 0)
    .attr('y', 0)
    .append('rect')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('x', 0)
            .attr('y', 0)
            .attr("fill", 'blue');

svg.append('line')
    .style('stroke', 'black')
    .attr("x1", 100)
    .attr("y1", 50)
    .attr("x2", 300)
    .attr("y2", 150);

g2.selectAll('path')
    .data(pie(data))
    .enter()
    .append("g")
    .append('path')
    .attr('d', arc2)

     .attr('stroke', (d,i) => color2(i))

     .attr("fill", function(d, i) {
         return "url(#bg)" ;
     })
        .each(function(d, i) {
            this._current = i;
        });

const g = svg.append('g')
    .attr('transform', 'translate(' + (width2) + ',' + (height2) + ')')
    .attr('class', 'pie2');

const arc = d3.arc()
    .innerRadius(radius - thickness)
    .outerRadius(function(d) {
        return d.value >= 40 ? radius : radius - d.value;
    });

const path = g.selectAll('path')
    .data(pie(data))
    .enter()
    .append("g")
    .on("mouseover", function(d) {
        let g = d3.select(this)
            .style("cursor", "pointer")
            .style("fill", "black")
            .append("g")
            .attr("class", "text-group");

        g.append("text")
            .attr("class", "name-text")
            .text(`${d.data.name}`)
            .attr('text-anchor', 'middle')
            .attr('dy', '-1.2em');

        g.append("text")
            .attr("class", "value-text")
            .text(`${d.data.value}`)
            .attr('text-anchor', 'middle')
            .attr('dy', '.6em');
    })
    .on("mouseout", function() {
        d3.select(this)
            .style("cursor", "none")
            .style("fill", color(this._current))
            .select(".text-group").remove();
    })
    .append('path')
    .attr('d', arc)
    .attr('fill', (d,i) => color(i))
    .on("mouseover", function() {
        d3.select(this)
            .style("cursor", "pointer")
            .style("fill", "black");
    })
    .on("mouseout", function() {
        d3.select(this)
            .style("cursor", "none")
            .style("fill", color(this._current));
    })
    .each(function(d, i) {
        this._current = i;
    });

g.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '.35em')
    .text(text);


const restOfTheData = function(){

    const textWidth = [];

// setTimeout( () => {
    svg.selectAll(null)
        .data(pie(data))
        .enter()
        .append("rect")
        .transition()
        .duration(2000)
        .attr("transform", function (d) {
            const c = arc2.centroid(d);
            return "translate(" + c[0] * 1.5 + "," + c[1] * 1.5 + ")";
        })
        .attr("x", 460)
        .attr("y", 460)
        .attr("width", 100)
        .attr("height", 25)
        .attr('fill', "darkblue")
        .attr('stroke', 'gray');


    svg.selectAll(null)
        .data(pie(data))
        .enter()
        .append("text")
        .transition()
        .duration(2000)
        .attr("transform", function (d) {
            const c = arc2.centroid(d);
            return "translate(" + c[0] * 1.5 + "," + c[1] * 1.5 + ")";
        })
        .attr("x", 460)
        .attr("y", 460)
        .attr("dy", ".9em")
        .attr("dx", '.4em')
        .text(function(d){
            return d.data.name;
        })
        .attr('fill', 'white')
        .attr('font-size', '1.4em');
        // .attr("style", function(d) {
        //     setTimeout(() => {
        //         const thisWidth = this.getComputedTextLength();
        //         textWidth.push(thisWidth);
        //
        //     }, 0);
        // });


};

setTimeout(restOfTheData,200);

//Add text with block

// var svg = d3.select("body").append("svg")
//     .attr("width", 960)
//     .attr("height", 500);
//
// var text = svg.append("text")
//     .attr("x", 480)
//     .attr("y", 250)
//     .attr("dy", ".35em")
//     .attr("text-anchor", "middle")
//     .style("font", "300 128px Helvetica Neue")
//     .text("Hello, getBBox!");
//
// var bbox = text.node().getBBox();
//
// var rect = svg.append("rect")
//     .attr("x", bbox.x)
//     .attr("y", bbox.y)
//     .attr("width", bbox.width)
//     .attr("height", bbox.height)
//     .style("fill", "#ccc")
//     .style("fill-opacity", ".3")
//     .style("stroke", "#666")
//     .style("stroke-width", "1.5px");

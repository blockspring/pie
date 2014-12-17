var graph = {
  svg: null,
  chart: null,
  gradient: null,
  draw: function (){
    var svgInput = "#chart";

    graph.svg = d3.select(svgInput).append('svg')
        .attr('width','100%')
        .attr('height','100%');

    nv.addGraph(function () {
      graph.chart = nv.models.pieChart()
        .x(function (d) {
          return d[Block.vars.csv.columnRoleMap.label[0]];
        })
        .y(function (d) {
          return d[Block.vars.csv.columnRoleMap.value[0]];
        }
      );

      graph.chart.margin({right:Block.vars.margin_right, bottom:Block.vars.margin_bottom, left:Block.vars.margin_left, left:Block.vars.margin_left});
      
      graph.chart.color(Block.vars.colors);

      graph.chart.showLabels(false);

      graph.chart.labelThreshold(Block.vars.minimum_label_percent);

      graph.chart.donut(Block.vars.donut);

      graph.chart.donutRatio(Block.vars.donut_hole_size);

      if (Block.vars.donut_labels_outside == true){
        graph.chart.donutLabelsOutside(true);
      }

      graph.chart.showLegend(Block.vars.legend);

      graph.chart.labelType(Block.vars.label_type);

      graph.svg.datum(Block.vars.csv.data)
        .transition().duration(500).call(graph.chart);
        
      nv.utils.windowResize(graph.chart.update);
          
    });
  },
  redraw: function(){
    graph.svg.datum(Block.vars.csv.data)
      .transition()
      .duration(500)
      .call(graph.chart);
  }
}
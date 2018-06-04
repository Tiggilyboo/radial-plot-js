# Radial Plot JS

Plot data around a circle, with configurable axis', scales, legends and styles.

## Screenshot
<img src="https://github.com/Tiggilyboo/radial-plot-js/raw/master/demo.png"/>

## How To

Add the script to your `<head></head>` via: `<script src="radial.min.js"></script>`

Add you plot configuration
```javascript
(new RadialPlot()).render(
  [
    "Data Set 1",
    "Data Set 2",
    "Data Set 3",
    "Data Set 4",
    "Data Set 5",
  ], 
  [
    new RadialPlotAxis("Chicken", 0, 20, [4, 13, 6, 8, 12]),
    new RadialPlotAxis("Beef", 0, 50, [4, 13, 6, 8, 12]),
    new RadialPlotAxis("Tortilini", 0, 35, [10, 11, 15, 12, 11]),
    new RadialPlotAxis("Crumpets", 0, 100, [54, 57, 32, 85, 72]),
    new RadialPlotAxis("Trampolines", 0, 100, [63, 51, 39, 53, 17]),
    new RadialPlotAxis("Keyboards", 0, 100, [59, 64, 45, 99, 79]),
    new RadialPlotAxis("Vegitables", 0, 100, [13, 5, 45, 89, 100]),
  ],
);
```

RadialPlotAxis accepts the following parameters: 
  * Caption, Minimum value, Maximum value, Values
For each number in values, you shoul have an associated legend for the plot.



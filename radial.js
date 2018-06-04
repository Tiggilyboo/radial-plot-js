var RadialPlotAxis = function(caption, min, max, values){
  this.caption = caption;
  this.min = min || 0;
  this.max = max || 100;
  if(min > max){
    let sm = this.max;
    this.max = this.min;
    this.min = sm;
  }
  this.values = values || [];
};
var RadialPlot = function(options){
  this.options = {
    el: options.el || document.getElementById("radial"),
    font: options.font || "14pt sans-serif",
    legends: options.legends || [],
    legendColour: options.legendColour || "#444",
    axis: options.axis || [],
    axisScale: options.axisScale || 6,
    lineWidth: options.lineWidth || 3,
    axisColour: options.axisColour || "#888",
  };
  this.colours = function(n){
    return 'hsl(' + (n * 255) + ',80%,30%)';
  };
  this.options.axis = this.options.axis || [];
};
RadialPlot.prototype.render = function(legends, axis){
  this.options.axis = this.options.axis || axis;
  this.options.legends = this.options.legends || legends;
  if (!this.options.el)
    return;

  let _el = this.options.el;
  let _ctx = _el.getContext("2d"),
      w = _el.width,
      h = _el.height,
      pts = this.options.axis.length;
  let cx = w / 2,
      cy = h / 2,
      r = w / 4,
      theta = 2.0 * Math.PI / pts;
      
  _ctx.font = this.options.font;
  _ctx.beginPath();
   
  // Draw legends 
  let fh = parseInt(_ctx.font);
  for(let i = 0; i < this.options.legends.length; i++) {
    let fw = _ctx.measureText(this.options.legends[i]).width;
    let ly = ((i + 1) * fh);
    let lx = w - fw - 2;
    _ctx.fillStyle = this.options.legendColour;
    _ctx.fillText(this.options.legends[i], lx, ly);
    _ctx.fillStyle = this.colours(parseFloat(i) / this.options.legends.length);
    _ctx.fillRect(lx - 16, ly - 12, 12, 12);
  }
  _ctx.stroke();
  _ctx.closePath();
 
  // Draw axis borders
  let config = this.options.axis;
  var drawBorder = function (ir, cx, cy, colour, width) {
    _ctx.beginPath();
    _ctx.strokeStyle = colour;
    _ctx.fillStyle = colour;
    _ctx.lineWidth = width;
    for (let i = 0; i < pts + 1; i++) {
      let lpx = (ir * -Math.sin(theta * -i) + cx);
      let lpy = (ir * -Math.cos(theta * i) + cy);
      if (i == 0)
        _ctx.moveTo(lpx, lpy);
      _ctx.lineTo(lpx, lpy);

      if (i < pts) {
        let tw = _ctx.measureText(config[i].caption).width;
        let th = parseInt(_ctx.font);
            
        if (ir == r) {
          _ctx.fillRect(lpx - 2, lpy - 2, 4, 4);

          let tx = ((0.3 + ir) * -Math.sin(theta * -i) + cx);
          let ty = ((0.3 + ir) * -Math.cos(theta * i) + cy);

          if (i % Math.round(pts / 4) == 0) {
            if (i % Math.round(pts / 2) == 0) {
              tx -= tw / 2;
              ty += ((ty > cy) ? (th * 1.3) : -(th * 1.3));
            }
            else
              tx += ((tx > cx) ? tw * 0.3 : -(tw * 1.3));
          }
          else {
            tx += ((tx > cx) ? 0 : -tw);
            ty += ((ty > cy) ? th : -th);
          }

          _ctx.fillText(config[i].caption, tx, ty);
        }
      }
    }
    _ctx.stroke();
    _ctx.closePath();
  };
  for(let b = 0; b <= this.options.axisScale; b++)
    drawBorder((r / 6) * b, cx, cy, this.options.axisColour, 1);
  
  if(!this.options.axis.length || !this.options.axis[0].values.length)
    return;

  // Draw axis values
  let count = this.options.axis[0].values.length;
  for (let vi = 0; vi < count; vi++) {
    _ctx.beginPath();
    _ctx.strokeStyle = this.colours(parseFloat(vi) / count);
    _ctx.lineWidth = this.options.lineWidth;

    let lastX = cx,
        lastY = cy - (r / this.options.axisScale);

    for (let i = 0; i < pts + 1; i++) {
        let rv = (config[i % pts].min * r / this.options.axisScale) 
               + (config[i % pts].values[vi] / config[i % pts].max) 
               * ((r / this.options.axisScale) * (this.options.axisScale - 1));
        let px = (rv * -Math.sin(theta * -i) + cx);
        let py = (rv * -Math.cos(theta * i) + cy);
         
        _ctx.moveTo(lastX, lastY);
        if (i != 0)
            _ctx.lineTo(px, py);
                
        lastX = px;
        lastY = py;
    }
    _ctx.stroke();
    _ctx.closePath();
  }

  return true;
};

var LogoTool = {};

LogoTool.draw = function(options){
    
    LogoTool.center = {x: 750, y: 450}; 
    options.angleRads = ((options.angle % 720) / 2) * Math.PI / 180;   
    
    if(options.angleRads < 0)
        options.angleRads += Math.PI * 4;
    
    console.log(options.angleRads);
    
    options.radius = options.leglength;
       
    var arcBottomLeft = LogoTool.drawLeg1(options);
    var arcBottomRight = LogoTool.drawLeg2(options);
    LogoTool.drawCircle(options);
    LogoTool.drawSquare(options);
    LogoTool.drawTriangle(options);
    LogoTool.drawArc(options, arcBottomLeft, arcBottomRight);
};

LogoTool.drawArc = function(options, bottomLeft, bottomRight){
    
    var $arc = $('#logo-section .arc');
    
    if(!options.drawarc){        
        $arc.hide(); 
        return;
    }
    
    d = '';
    d += 'M' + bottomLeft.x  + ' ' + bottomLeft.y;
    d += ' A' + options.radius + ',' + options.radius + ' 0 0,0' + bottomRight.x  + ',' + bottomRight.y;
    
    $arc.show();
    $arc.attr('stroke', options.legcolor1);
    $arc.attr('d', d);
};

LogoTool.drawTriangle = function(options){
    
    var triangle = $('#logo-section .triangle');
    var invAngle = (Math.PI / 2) - options.angleRads;    
    var baseWidth = (1 / Math.sin(invAngle)) * options.legthickness;
    var points = '';
    
    var top = {
        x: LogoTool.center.x,
        y: LogoTool.center.y - Math.tan(invAngle) * baseWidth / 2
    };
    
    var bottomLeft = {
        x: LogoTool.center.x - (baseWidth / 2 - Math.tan(options.angleRads) * options.trianglegap),
        y: LogoTool.center.y - options.trianglegap
    };
    
    var bottomRight = {
        x: LogoTool.center.x + (baseWidth / 2 - Math.tan(options.angleRads) * options.trianglegap),
        y: LogoTool.center.y - options.trianglegap
    };
    
    points += top.x + ',' + top.y;
    points += ' ' + bottomRight.x + ',' + bottomRight.y;
    points += ' ' + bottomLeft.x + ',' + bottomLeft.y;

    triangle.attr('stroke', options.shapecolor);    
    triangle.attr('points', points);    
};

LogoTool.drawCircle = function(options){
    
    var distance = options.radius + options.shapegap; 
    
    var circle = $('#logo-section .circle');
    circle.attr('stroke', options.shapecolor);
    circle.attr('cx', LogoTool.center.x - Math.sin(options.angleRads) * distance);
    circle.attr('cy', LogoTool.center.y + Math.cos(options.angleRads) * distance);
    circle.attr('r', options.shapesize / 2);
};

LogoTool.drawSquare = function(options){
    
    var distance = options.radius + options.shapegap;
    var offset = options.shapesize / 2;
    
    var points = '';
    var center = {
        x: LogoTool.center.x + Math.sin(options.angleRads) * distance,
        y: LogoTool.center.y + Math.cos(options.angleRads) * distance
    };
    
    points += (center.x - offset) + ',' + (center.y - offset);
    points += " " + (center.x + offset) + ',' + (center.y - offset);
    points += " " + (center.x + offset) + ',' + (center.y + offset);
    points += " " + (center.x - offset) + ',' + (center.y + offset);    
    
    var square = $('#logo-section .square');
    square.attr('stroke', options.shapecolor);
    square.attr('points', points);
    square.attr('transform', 'rotate(' + (180 - options.angle / 2) + ' ' + center.x + ' ' + center.y + ')');
};

LogoTool.drawLeg2 = function(options){
        
    var d = '',      
    center = LogoTool.center,        
    topLeft = setupTopLeft(),
    topRight = setupTopRight(),
    bottomLeft = setupBottomLeft(),
    bottomRight = setupBottomRight();
    
    d += 'M' + topLeft.x  + ' ' + topLeft.y;
    d += ' L' + topRight.x + ' ' + topRight.y;
    d += ' L' + bottomRight.x + ' ' + bottomRight.y;
    d += ' A' + options.leglength + ',' + options.leglength + ' 0 0,1' + bottomLeft.x  + ',' + bottomLeft.y;
    d +=  ' L' + topLeft.x  + ' ' + topLeft.y;
    d += 'Z';    
    
    var $leg2 = $('#logo-section .leg-2');
    $leg2.attr('stroke', options.legcolor2);
    $leg2.attr('d', d);
    return bottomLeft;
    
    function setupTopLeft(){
        
        var angle = (Math.PI / 2) - options.angleRads;
        
        return {
            x: center.x - (1 / Math.sin(angle)) * options.legthickness / 2,
            y: center.y
        };
    };    
    
    function setupTopRight(){
        
        var angle = (Math.PI / 2) - options.angleRads;
        
        return {
            x: center.x + (1 / Math.sin(angle)) * options.legthickness / 2,
            y: center.y
        };
    };
    
    function setupBottomLeft(){
        
        var xScale = Math.sin(options.angleRads);
        var yScale = Math.cos(options.angleRads);
        var point = {x: topLeft.x + xScale * options.radius,
               y: topLeft.y + yScale * options.radius};        
        
        var dist = calcDist();
        
        //finding the point where the line intersects the circle, which will be when its
        //distance from the circle's origin = the radius of the circle
        var i = 0;
        while(Math.abs(dist) > 1 && i < 10){
            
            i++;
            point.x += xScale * dist / 2;
            point.y += yScale * dist / 2;
            
            dist = calcDist();         
        };
        
        return point;
        
        function calcDist(){
            
            return options.radius - 
                Math.sqrt(Math.pow(center.x - point.x, 2) + Math.pow(center.y - point.y, 2)); 
        };
    };
    
    function setupBottomRight(){
        
        var xScale = Math.sin(options.angleRads);
        var yScale = Math.cos(options.angleRads);
        var point = {x: topRight.x + xScale * options.radius,
               y: topRight.y + yScale * options.radius};        
        
        var dist = calcDist();
        
        //finding the point where the line intersects the circle, which will be when its
        //distance from the circle's origin = the radius of the circle
        var i = 0;
        while(Math.abs(dist) > 1 && i < 10){
            
            i++;
            point.x += xScale * dist / 2;
            point.y += yScale * dist / 2;
            
            dist = calcDist();         
        };
        
        return point;
        
        function calcDist(){
            
            return options.radius - 
                Math.sqrt(Math.pow(center.x - point.x, 2) + Math.pow(center.y - point.y, 2)); 
        };
    };    
};

LogoTool.drawLeg1 = function(options){
        
    var d = '',       
    center = LogoTool.center,        
    topLeft = setupTopLeft(),
    topRight = setupTopRight(),
    bottomLeft = setupBottomLeft(),
    bottomRight = setupBottomRight();
    
    d += 'M' + topLeft.x  + ' ' + topLeft.y;
    d += ' L' + topRight.x + ' ' + topRight.y;
    d += ' L' + bottomRight.x + ' ' + bottomRight.y;
    d += ' A' + options.leglength + ',' + options.leglength + ' 0 0,1' + bottomLeft.x  + ',' + bottomLeft.y;
    d +=  ' L' + topLeft.x  + ' ' + topLeft.y;
    d += 'Z';    
    
    var $leg1 = $('#logo-section .leg-1');
    $leg1.attr('stroke', options.legcolor1);
    $leg1.attr('d', d);
    return bottomRight;
    
    function setupTopLeft(){
        
        var angle = (Math.PI / 2) - options.angleRads;
        
        return {
            x: center.x - (1 / Math.sin(angle)) * options.legthickness / 2,
            y: center.y
        };
    };    
    
    function setupTopRight(){
        
        var angle = (Math.PI / 2) - options.angleRads;
        
        return {
            x: center.x + (1 / Math.sin(angle)) * options.legthickness / 2,
            y: center.y
        };
    };
    
    function setupBottomLeft(){
        
        var xScale = Math.sin(options.angleRads);
        var yScale = Math.cos(options.angleRads);
        var point = {x: topLeft.x - xScale * options.radius,
               y: topLeft.y + yScale * options.radius};        
        
        var dist = calcDist();
        
        //finding the point where the line intersects the circle, which will be when its
        //distance from the circle's origin = the radius of the circle
        var i = 0;
        while(Math.abs(dist) > 1 && i < 10){
            
            i++;
            point.x -= xScale * dist / 2;
            point.y += yScale * dist / 2;
            
            dist = calcDist();         
        };
        
        return point;
        
        function calcDist(){
            
            return options.radius - 
                Math.sqrt(Math.pow(center.x - point.x, 2) + Math.pow(center.y - point.y, 2)); 
        };
    };
    
    function setupBottomRight(){
        
        var xScale = Math.sin(options.angleRads);
        var yScale = Math.cos(options.angleRads);
        var point = {x: topRight.x - xScale * options.radius,
               y: topRight.y + yScale * options.radius};        
        
        var dist = calcDist();
        
        //finding the point where the line intersects the circle, which will be when its
        //distance from the circle's origin = the radius of the circle
        var i = 0;
        while(Math.abs(dist) > 1 && i < 10){
            
            i++;
            point.x -= xScale * dist / 2;
            point.y += yScale * dist / 2;
            
            dist = calcDist();         
        };
        
        return point;
        
        function calcDist(){
            
            return options.radius - 
                Math.sqrt(Math.pow(center.x - point.x, 2) + Math.pow(center.y - point.y, 2)); 
        };
    };
};
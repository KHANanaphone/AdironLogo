$(document).ready(function(){

    setupOptions();
    redraw();
    
    function setupOptions(){

        makeNumberPicker('Gap between legs and triangle', 'trianglegap', 20);
        makeNumberPicker('Length of legs', 'leglength', 300);
        makeNumberPicker('Angle between legs', 'legangle', 40);
        makeNumberPicker('Thickness of legs', 'legthickness', 60);
        makeNumberPicker('Gap between legs and shapes', 'shapegap', 75);
        makeNumberPicker('Size of shapes', 'shapesize', 50);
        
        makeOption('Draw arc?', 'drawarc');
        
        makeColorPicker('Color of leg 1', 'legcolor1');
        makeColorPicker('Color of leg 2', 'legcolor2');
        makeColorPicker('Color of shapes', 'shapecolor');
        
        function makeNumberPicker(text, id, val){
            
            var $new = $('#hidden .number-option').clone();
            
            $new.attr('id', id);
            $new.find('.option-name').text(text);
            $new.find('.spin-up').click(upClicked);
            $new.find('.spin-down').click(downClicked);
            $new.find('input').change(inputChanged).val(val);
            
            $('#options-section').append($new);  
            
            function upClicked(){

                var $target = $(this).parents('.spinner').find('input');
                addVal($target, 1);
            };    

            function downClicked(){

                var $target = $(this).parents('.spinner').find('input');
                addVal($target, -1);
            };

            function addVal($input, toAdd){

                var val =  parseInt($input.val());
                if(isNaN(val))
                    val = 0;

                $input.val(val + toAdd);
                redraw();
            };

            function inputChanged(event){

                var val = parseInt($(this).val());

                if(isNaN(val))
                    val = 0;

                $(this).val(val);        

                redraw();
            };
        };
        
        function makeOption(text, id){
            
            var $new = $("#hidden .checkbox").clone();
            
            $new.attr('id', id); 
            $new.find('.option-name').append(text);
            $new.find('input').change(checked);
            $('#options-section').append($new);
            
            function checked(){
                
                redraw();
            };
        };
        
        function makeColorPicker(text, id){
            
            var $new = $('#hidden .color-option').clone();
            
            $new.attr('id', id);    
            $new.find('.option-name').text(text);
            $new.find('.color-picker').colorpicker()
                .on('changeColor', function(){
                
                redraw();
            });
            
            $('#options-section').append($new);
        };    
    };
    
    function redraw(){
        
        var options = {
            trianglegap: parseInt($('#trianglegap input').val()),
            leglength: parseInt($('#leglength input').val()),
            angle: parseInt($('#legangle input').val()),
            legthickness: parseInt($('#legthickness input').val()),
            shapegap: parseInt($('#shapegap input').val()),
            shapesize: parseInt($('#shapesize input').val()),
            drawarc: $('#drawarc input').is(':checked'),
            legcolor1: $('#legcolor1 input').val(),
            legcolor2: $('#legcolor2 input').val(),
            shapecolor: $('#shapecolor input').val()           
        };
        
        LogoTool.draw(options);
    };
});
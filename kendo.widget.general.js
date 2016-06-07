/*

A Kendo UI widget can be created (i.e. instantiated) in the following six ways:

    Imperatively using jQuery methods
    Imperative using widget constructors
    Declaratively from markup using kendo.init()
    Declaratively from template markup when a View is render()'ed to the DOM
    Declaratively from markup when binding a viewModel to a view (i.e. MVVM)
    Declaratively from markup in AngularJS applications using directives


*/

/*
	Imperatively using jQuery methods
*/

jQuery.prototype.kendoAutoComplete // kendo" + NameOfTheWidget in Pascal Case.

// Just like most jQuery methods and plugins, Kendo UI methods can be passed arguments 
// (via a single object) to configure the widget being instantiated. 
$("#calendar").kendoCalendar({
            max: new Date(2015,11,31),
            min: new Date(2010,0,1),
            start: 'year',
            value: new Date(2012, 0, 1),
            change:function(e){console.log(e)}
        });

/*

    - Kendo UI methods follow the jQuery plugin pattern and return the jQuery object so that additional methods can be chained after invoking a Kendo UI method.
    - Calling a Kendo UI method on more than one HTML element will instantiate a widget instance for each HTML element selected.
    - Widget options can be updated/set after initial widget instantiation using the setOptions() widget method.

*/

 $("#ntb").kendoNumericTextBox({
        max: 5
    });

    // ...

    $("#ntb").data("kendoNumericTextBox").setOptions({
        max: 10
    });


/*
	Imperative using widget constructors
*/

// use DOM reference, not jQuery object
var slider = new kendo.ui.Slider(document.querySelector('input'), {
          min: 0,
          max: 50,
          smallStep: 5,
          largeStep: 10
 });

/* 
    - The constructor expects, as it's first argument, an actual reference to a DOM object and not a jQuery object containing a reference to a DOM element.
    - The jQuery methods are simply calling constructor functions, which you can directly call imperatively call yourself.
*/

/*
	Declaratively from markup using kendo.init()

	Kendo UI offers the kendo.init() function to instantiate widgets from markup. 
	The function instantiates widgets on the passed element argument, and all child elements, 
	with a data-role attribute and value defining what type of 
	widget should be created (e.g. data-role="calendar").

*/

    <div data-role="calendar"></div>
  
    <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script src="http://cdn.kendostatic.com/2015.1.318/js/kendo.all.min.js"></script>
  
    <script>
      // initialize the widgets
      kendo.init(document.body);
      //document.body is a short to the body element i.e. $('body')[0]
    </script>

/*

    - The first argument passed to init() can be a DOM reference 
    	(document.body or document.querySelector('#body')) or a jQuery object (e.g. $('#body')).
    - init() came before bind(), but bind() can be used in place of init() 
    	(e.g. kendo.init(element,namespace,namespace) is the same as kendo.bind(element,null,namespaces,namespace).
    - The data-role value for a widget is the name of a widget in all lowercase. 
    	For example, to instantiate a kendo.ui.AutoComplete widget from markup you'd use data-role="autocomplete".
    - A widget's configuration options and events can be declared as HTML attributes 
    	by changing the camel case configuration name or event name to dash-separated, and then pre-pending with "data-". For example, data-ignore-case="false" sets the auto complete widget's ignoreCase configuration option to false. Configuration options which start with "data" do not require an additional "data" in the attribute name e.g. the dataTextField option is set using the data-text-field attribute and dataSource is set using the data-source attribute.
    - Event handlers, set as HTML attribute values will be resolved 
    	from a string in HTML (e.g. data-change="change") to a JavaScript value found in the global scope (e.g. window.change where change is a JavaScript function).
    - The template configuration option, set as an HTML attribute value (e.g. data-template="foo"), 
    	is used to select a template in the HTML document with that value as its id value. (e.g. <script id="foo" type="text/x-kendo-template"></script>).

*/

/*
	Declaratively from markup when binding a viewModel to a view

	Kendo UI offers a View abstraction similar to a Backbone view but a little more lightweight. 
	When a View is render()ed, any HTML elements in the view with a data-role attribute and widget name value will get instantiated upon rendering. 
	This is identical to how widgets are instantiated from HTML using kendo.init().

*/

 <div id="myView"></div>
 <!-- HTML in a script element -->
  <script id="myViewHTML">
        <input data-role="autocomplete" data-source="['Ant', 'Antilope', 'Badger', 'Beaver', 'Bird']" placeholder="start typing e.g. 'a'" />
  </script>

  <script>
        var myView = new kendo.View('myViewHTML'); //use HTML from myView Template
        myView.render('#myView'); //render view to #myViewContainer
    </script>


 /*
	Instantiate widgets declaratively (from markup) using MVVM

	Declaratively from markup in AngularJS applications using directives

	Kendo UI offers an MVVM (aka Model View ViewModel) pattern, similar to Knockout, 
	that two way binds a model (i.e. the data) to a view (i.e. the HTML) via a viewModel. 

	Anytime a binding (i.e. kendo.bind(view,viewModel)) occurs, setting up the MVVM pattern, 
	the HTML involved can also be used to declaratively instantiate a widget.

	When kendo.bind() is called on the HTML/view it will examine the HTML for data-role attributes 
	and then instantiate widgets as directed by the data-role attribute value.


 */

<div id="view">
<script>
      //create viewModel
      var viewModel = kendo.observable({
        selectedNumber: 10,
        onChange: function(){
          $('h5 span').text(this.get('selectedNumber'));
        }
      });
      
      //bind viewModel to view
      kendo.bind($('#view'),viewModel);
// </scrip>     

 /*
	Once you have created a widget it's likely that you will want to do something with it
	you have a reference to the original element in the DOM the widget was instantiated on, 
	you can use the 
	 1. .data('kendoNameOfWidget') 
	 2. .getKendoNameOfWidget jQuery methods 
	 3. kendo.widgetInstance() method to gain/return a reference to the actual widget instance.

 */

//create calendar and auto complete widgets
kendo.bind($('#instatiateAnythingInThisDiv')); //from markup
var $cal = $('#calendar').kendoCalendar(); //using jQuery method
      
//get instance/reference to calendar widget 
//using jQuery method .getKendoNameOfWidget() or .data('kendoNameOfWidget')
var calInstance = $cal.getKendoCalendar(); 
      
//get instance/reference to auto complete widget
var autoCompleteInstance = kendo.widgetInstance($('#autoComplete'));

// call the methods

$("#animal").kendoAutoComplete({
          dataSource: [ "Ant", "Antilope", "Badger", "Beaver", "Bird" ]
});
      
//select DOM element, get reference using getNameOfWideget, call value()
console.log($('#animal').getKendoAutoComplete().value()); //logs 'dog'
      
//select DOM element, get reference using data('kendoNameOfWidget'), call value()
console.log($('#animal').data('kendoAutoComplete').value()); //logs 'dog'
      
//pass kendo.widgetInstance() DOM element, return instance reference, call value()
console.log(kendo.widgetInstance($('#animal')).value()); //logs 'dog'

// setting & getting widget instance options. 

var cal = $('#calendar').kendoCalendar({
          start: 'month'
        }).getKendoCalendar();
        
//set configuration options after instantiation using setOptions()
cal.setOptions({
            max: new Date(2015,11,31),
            min: new Date(2010,0,1),
            start: 'year',
            value: new Date(2012, 0, 1),
            change:function(e){console.log(e.sender.options)}
});

// Binding/unbinding widget events

/*
	During instantiation, widget events can be configured just like configuration options. In the code below a callback function is configured during instantiation to run any time the change event is broadcast-ed by the widget.

*/

$('#autocomplete').kendoAutoComplete({
    change: function(e){ //define callback for change event
        console.log(e);
    }
});

// After a widget is instantiated, in order to set, update, 
// or remove an event you will have to use the bind() and unbind() methods that are inherited by all widget instances.

//intialize the menu widget, return instance
    var menu = $('#menu').kendoMenu().getKendoMenu();
      
    //assign click event (removing events from menu) for button
    $('button').kendoButton({
        click:function(){
          menu.unbind('open');
          menu.unbind('close');
        }
    });
      
    //bind (i.e. add callback function) open and close events to menu
    menu.bind('open',function(){console.log('menu open')});
    menu.bind('close',function(){console.log('menu close')});

/*
	Manually triggering a widget event

	Using the widget trigger() method it's possible to manually set off an event on a widget.

*/

//configure kendo button with a click event callback function
var btn = $('button').kendoButton({
      click:function(){console.log('clicked');}
 }).getKendoButton(); //return button instance, store instance in var btn
      
 //manually invoke the click event on the kendo button
 btn.trigger('click');

/*
	Accessing widget event details and functions

	Widget events pass one argument to event callback functions. The argument is called the event object and contains the following event related information and functions:

    - .sender - a reference to the widget instance that triggered the event
    - .preventDefault() - a method that cancels default event effects on the widget when called in the scope of the callback function
    - .isDefaultPrevented() - returns the boolean value of current state of preventDefault() 

*/

//configure kendo button with a click event callback function
  $('button').kendoButton({
      click:function(event){
        //write to the DOM this function, using event.sender
        $('<pre>')
          .text(event.sender.options.click.toString())
          .insertAfter('button');
      }
});


/*
	Using Custom events on Widgets

	The bind() and unbind() methods are actually inherited from kendo.Observable for each widget. 
	And each widget inherits from kendo.ui.Widget, which directly inherits from kendo.Observable. 
	Because kendo.Observable is just a reusable pattern for listening and firing events on objects, we can use the bind() and trigger() methods to setup custom events on widgets and trigger them.

*/

var btn = $('button').kendoButton().getKendoButton(); //return button widget instance
    
    //add custom foo event
    btn.bind('foo',function(event){
      $('<p>').text(event.bar).appendTo('body'); //logs 'bar'
    });
      
    //trigger foo event, and pass some data to callback via event object argument
    btn.trigger('foo',  {bar: "bar"}); //trigger foo, pass bar prop in event object


/*
	Referencing the top most element that wraps a widget in the DOM

	Widget instances have a property called .wrapper that contains a jQuery object selecting 
	the outer most element which wraps the widget in the DOM. For example, 
	if the Grid is initialized from a <div>, the two references match. But if the Grid is initialized from a <table>, then element points to the <table>, while wrapper points to the wrapper <div>.


*/

/*
	Resizing Widget

	If the element a widget is instantiated on has a width and height of 100% then the widget will automatically adjust itself to fill the container, it's contained within.

	In the code example below I set the width of the <div> that the calendar is instantiated on to 100% and the calendar widget will fill the parent container 100% (i.e the <body> element) and auto adjust as that parent container changes widths.

*/

<div style="width:100%;" id="calendar"
 var $cal = $('#calendar').kendoCalendar(); 
/*
	However, not all widgets will auto resize to the width of the parent element by using CSS to set the element the widget is instantiated to width:100%;. The following widgets do not support auto resizing by CSS when the container is resized.

    All DataViz Widgets
    Mobile Actionsheet
    Mobile ListView
    Mobile ScrollView
    MobileSwitch
    Grid
    Scheduler
    Slider
    Splitter
    Window

	In order to adjust the size of non-auto resizing widgets the .resize() method or kendo.resize() function will need to be called to inform these non-auto resizing widget(s) that a resize has occurred.

*/

<div class="chart-wrapper"><div id="chart" style="width:100%;height:300px"></div></div>
  
    <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script src="http://cdn.kendostatic.com/2015.1.318/js/kendo.all.min.js"></script>
  
    <script>
        var chart = $('#chart').kendoChart({
            title: {text: 'Gross domestic product growth'},
            legend: {position: 'bottom'},
            seriesDefaults: {type: 'area'},
            series: [{
                name: 'India',
                data: [9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855]
            }],
            valueAxis: {
                labels: {format: '{0}%'},
                line: {visible: false},
                axisCrossingValue: -10
            },
            categoryAxis: {
                categories: [2005, 2006, 2007, 2008, 2009, 2010, 2011],
                majorGridLines: {visible: false}
            }
        }).getKendoChart();
      
      $(window).on('resize', function(){
          chart.resize();
          //or, kendo.resize($('.chart-wrapper'));
      });

/*
    - Auto resizing or manually resizing widgets mostly pertains to the resizing of a widgets width. 
      Some widgets can respond favorably to height adjustments (e.g. Grid widget) 
      but not all widgets are intended to auto expand both vertically and horizontally 
      (e.g. Calendar widget).
    
    - An undocumented method, getSize() is inherited by all widgets 
     that will return an object containing the height and width of the wrapper 
     element containing the widget.
    
    - The ResponsivePanel, Grid, TreeList, Scheduler, Menu, and SplitView widgets 
    all contain their own unique RWD configurations and auto adjusting features that come into 
    play when a widget is created with the intention of having them adjust to screen size (i.e. 100% width and either auto resizing or manually forcing a resize using resize()).



*/    
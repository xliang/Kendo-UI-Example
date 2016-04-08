/*
	DatePicker 
	
	The situation is the date tim picker passed the wrong date back to the server. 
	Actually, it is not Kendo DatePicker's issue, instead it is caused by Javascript
	Date type, which adds the Time Zone as default. 

	When converted by JSON by usin JSON.stringfy(), it causes 

	JSON uses the Date.prototype.toISOString function which does not represent local time 
	-- it represents time in unmodified UTC (Corrdinated Universal Time)
	-- if you look at your date output you can see you're at UTC+2 hours, 
		which is why the JSON string changes by two hours, 
		but if this allows the same time to be represented correctly across multiple time zones.
	-- Your local time will be converted UTC by Javascript Date to JSON method

	 Date {Fri Apr 03 2015 20:00:00 GMT-0400 (Eastern Daylight Time)}

	

	 Solution: 

	 1. use the string value from the DatePicker, and passed to server as JSON string, 
	    Relys on Web API Moal Covert to handle it. 

	 2. Adjust the Date/Time 
		
		Reference: 
		http://blog.falafel.com/passing-dates-kendo-ui-aspnet/
		http://stackoverflow.com/questions/1486476/json-stringify-changes-time-of-date-because-of-utc
		
		// this function can be used when time is required. 

	 	function adjustDateForJSON(data) {
            if (data) {
                var dateString = kendo.toString(data, "G");
                var dateValue = new Date(dateString);
                var hours = dateValue.getHours();
                var offset = dateValue.getTimezoneOffset(); 
                dateValue.setHours(dateValue.getHours() - dateValue.getTimezoneOffset() / 60);
                return dateValue;

            }



*/

/*
    Visual Studio Intellisense 

    put the intellisense.js (in vsdoc folder) to the same folder as kendo.all.min.js, and rename it as kendo.all.min.intellisense.js

 */
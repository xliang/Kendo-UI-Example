/*
	DataSource Abstraction 
	
		* Retrieve data from remote endpoint
		* Maintain teh structure and type of the data (schema). 
		* Process serialization formats to/from a remote endpoint
		* Synchronize update (i.e. create, update, delete) to/from a remote endpoint
		* Maintain an in-memory cache of data (including changes) for updating a remote endpoint
		* Calculate and maintain aggregates, sorting order and paging
		* Provide a query mechanism via filter expressions. 

*/

/*
	Schema 
*/

$(function() {
    
    var grid = $("#Grid").data("kendoGrid");
   
    // WebAPI needs the ID of the entity to be part of the URL e.g. PUT /api/Product/80
    grid.dataSource.transport.options.update.url = function(data) {
        return "api/Product/" + data.ProductID;
    }
    // WebAPI needs the ID of the entity to be part of the URL e.g. DELETE /api/Product/80
    grid.dataSource.transport.options.destroy.url = function(data) {
        return "api/Product/" + data.ProductID;
    }
});
            $("#employeesGrid").kendoGrid({
                // specify the columns on the grid
                columns: [
                        { field: "FirstName", title: "First Name" },
                        { field: "LastName", title: "Last Name" }
                ],
                // the datasource for the grid
                dataSource: new kendo.data.DataSource({
                    // the transport tells the datasource what endpoints
                    // to use for CRUD actions
                    transport: {
                        read: "api/employees"
                    },
                    // the schema defines the schema of the JSON coming
                    // back from the server so the datasource can parse it
                    schema: {
                        // the array of repeating data elements (employees)
                        data: "Data",
                        // the total count of records in the whole dataset. used
                        // for paging.
                        total: "Count"
                    },
                    // the number of records to show per page
                    pageSize: 3,
                    // set the server paging as true, it will pass the parameters to server controller
                    serverPaging: true
                }),
                pageable: true
            });

/*

// WebAPI will respond to an HTTP GET with this method
        
        public Models.Response Get() {

            // the the take and skip parameters off of the incoming request
            
            int take = _request["take"] == null ? 10 : int.Parse(_request["take"]);
            int skip = _request["skip"] == null ? 0 : int.Parse(_request["skip"]);

            // get all of the records from the employees table in the
            // northwind database.  return them in a collection of user
            // defined model objects for easy serialization. skip and then
            // take the appropriate number of records for paging.
            
            var employees = (from e in _context.Employees
                             select new Models.Employee(e)).Skip(skip).Take(take).ToArray();

            // returns the generic response object which will contain the 
            // employees array and the total count
            return new Models.Response(employees, _context.Employees.Count());
        }      

        public class Response {

            public Array Data { get; set; }
            public int Count { get; set; }
            public string Errors { get; set; }

            public Response(Array data, int count) {
                this.Data = data;
                this.Count = count;
            }

            public Response(string errors) {
                this.Errors = errors;
            }

            public Response() {

            }
    }


*/     
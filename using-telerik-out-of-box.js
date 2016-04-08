 // An approach to load the data from remote once. 
 // using Telerik out of box

 // http://www.codemag.com/article/1511091
 

 $(function () {
 
 	// All of the code that runs inside this function lives in a Closure,
 	// which provides privacy and variable scoping throughout the lifetime of the application. 

 	// The app.js module uses the internal object configMap 
 	// to hold the state of variables that the module uses throughout the code. For now, 
 	// two variables are defined on the configMap to hold the models for ReferenceModel and EmployeeModel.

    configMap = {}; 

 	configMap.ReferenceModel = kendo.data.Model.define({
      id: "Id",
      fields: {
        Id: { editable: false, defaultValue: 0 },
        Code: { type: "string" }
      }
   });
      
   configMap.EmployeeModel = kendo.data.Model.define({
      id: "EmployeeId",
      fields: {
         EmployeeId: {
            editable: false,
            defaultValue: 0
         },
         FirstName: { type: "string" },
         LastName: { type: "string" },
         MaritalStatus: { defaultValue: {} },
         JobTitle: { type: "string" },
         HireDate: { type: "date" },
         BirthDate: { type: "date" },
         VacationDays: { type: "number" },
         SickLeaveDays: { type: "number" },
         Salary: { type: "number" }
      }
   });

   configMap.maritalStatusDs = new kendo.data.DataSource({
      transport: {
         read: function (options) {
            options.success(configMap.maritalStatus);
         }
      },
      schema: {
         model: configMap.ReferenceModel
      }
   });
      
   configMap.employeesDs = new kendo.data.DataSource({
       transport: {
           read: function (options) {
               options.success(configMap.employees);
      
               // update cid
               $.each(configMap.employeesDs.data(),
                   function (idx, record) {
                       if (!record.hasOwnProperty("cid") ||
                           !record["cid"]) {
                       record["cid"] = record["uid"];
                   }
               });
           },
           create: function (options) {
               $.ajax({
                  cache: false,
                  type: "POST",
                  url: "/api/Employees/Save",
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  data: JSON.stringify(options.data),
                  success: function (result) {
                    console.log("employees saved successfully");
                    options.success(result);
                  },
                  error: function (result) {
                      options.error(result);
                  }
              });
           }
       },
       schema: {
           model: configMap.EmployeeModel
       }
   });

 	function showEmployeeDetails(data) {
	   if (!data) return;
	   
	   reset(false); // reset first

	   /*
			Most importantly, the code stores the selected record uid onto the .data() attribute of the Form. 
			The uid value is used later to distinguish whether the user is editing an existing record 
			or saving a new one. 
			Right after that, the form gets populated with the Employee record details.
	   */

	   setUid(data.uid); // store ui on form
	   
	   // populate form with employee data
	   populateEmployeeForm(data);
	}

 	function handleSaveChanges(e) {
		   // get uid for currently displayed row
		   var currentUid = getUid();
		   // update employee record in DataSource
		   updateEmployee(currentUid);
		   reset(true);
		    // save changes to server using DataSource
		   /*
			The function getKendoGrid() retrieves the instance of the Grid widget found on the HTML page. 
			It then calls on the Grid’s saveChanges() function. 
			Internally, this function triggers the bounded DataSource to execute either the transport.create() or transport.update() function. For instance, if the user adds a new record, then the transport.create()function executes; otherwise the transport.update()function executes.

		   */

		   getKendoGrid().saveChanges();
     }

     function makeEmployeeModel() {
	   var model = new configMap.EmployeeModel({
	      EmployeeId: 0,
	      MaritalStatus:
	          new configMap.ReferenceModel({})
	    });
	    return model;
	}

	function addEmployeeToDataSource() {
	   var model = makeEmployeeModel();
	   configMap.employeesDs.add(model);
	   return model;
	}

	 function updateEmployee(uid) {
	   var model;
	   if (uid) {
	       // get current data item
	       model =
	          configMap.employeesDs.getByUid(uid);
	    }
	      
	    // new record
	   if (typeof model === "undefined" ||
	       model === null) {
	       model = addEmployeeToDataSource();
	    }
	      
	   if (typeof model === "undefined" ||
	       model === null) return;
	      
	   model.set("FirstName",
	       $(configMap.$form)
	          .find("input[id='FirstName']")
	          .val());
	      
	    // ...
	}

	function handleFilterChange(e) {
	   var value = $(e.target).val();
	      
	   if (value.length > 0) {
	       getKendoGrid().dataSource.filter({
	         logic: "or",
	         filters: [
	         {
	           field: "FirstName",
	           operator: "contains",
	           value: value
	         },
	         {
	           field: "LastName",
	           operator: "contains",
	           value: value
	         }
	       ]
	      });
	    } else {
	       getKendoGrid().dataSource.filter({});
	    }
	}

	$.ajax({
	      type: "GET",
	      cache: false,
	      url: "/api/Employees/",
	      contentType: "application/json; charset=utf-8",
	      dataType: "json",
	      success: onSuccessRead,
	         error: onErrorRead
	   });

	function onSuccessRead(data) {
	   if (data.Employees) {
	       configMap.employees =
	           $.map(data.Employees,
	             function (record, idx) {
	               return record;
	         });
	      configMap.employeesDs.read();
	   }
	   if (data.MaritalStatus) {
	       configMap.maritalStatus =
	           $.map(data.MaritalStatus,
	              function (record, idx) {
	                 return record;
	              });
	        configMap.maritalStatusDs.read();
	    }
}


 	function configureDataSources() { 

 	}
    function configureForm() { 
    	$container.find("select[id='MaritalStatus']")
		    .kendoDropDownList({
		        dataTextField: "Code",
		        dataValueField: "Id",
		        dataSource: configMap.maritalStatusDs,
		        optionLabel: {
		            Code: "Select Marital Status",
		            Id: -1
		        }
		    });
    }
    
    function configureGrid() { 
    }
    
    function configureEventHandling(e) { 

    }

 });
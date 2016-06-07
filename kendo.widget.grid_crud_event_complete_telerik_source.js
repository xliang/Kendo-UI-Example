var crudServiceBaseUrl = "http://demos.kendoui.com/service",
    dataSource = new kendo.data.DataSource({
        transport: {
            read:  {
                url: crudServiceBaseUrl + "/Products",
                dataType: "jsonp",
                complete: function(jqXHR, textStatus) { console.log(textStatus, "read") }
            },
            update: {
                url: crudServiceBaseUrl + "/Products/Update",
                dataType: "jsonp",
                complete: function(jqXHR, textStatus) { console.log(textStatus, "update") }
            },
            destroy: {
                url: crudServiceBaseUrl + "/Products/Destroy",
                dataType: "jsonp"
            },
            create: {
                url: crudServiceBaseUrl + "/Products/Create",
                dataType: "jsonp"
            },
            parameterMap: function(options, operation) {
                if (operation !== "read" && options.models) {
                    return {models: kendo.stringify(options.models)};
                }
            }
        },
        batch: true,
        autoSync: false,
        pageSize: 30,
        schema: {
            model: {
                id: "ProductID",
                fields: {
                    ProductID: { editable: false, nullable: true },
                    ProductName: { validation: { required: true } },
                    UnitPrice: { type: "number", validation: { required: true, min: 1}, format: "{0:c}" },
                    Discontinued: { type: "boolean" },
                    UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                }
            }
        }
    });


$("#grid").kendoGrid({
        dataSource: dataSource,        
        pageable: true,
        height: 400,
        toolbar: ["create", "save", "cancel"],
        columns: [
            "ProductName",
            { field: "UnitPrice", format: "{0:c}", width: "150px" },
            { field: "UnitsInStock", width: "150px" },
            { field: "Discontinued", width: "100px" },
            { command: "destroy", title: " ", width: "110px" }],
        editable: true
});
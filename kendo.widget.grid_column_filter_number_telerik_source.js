$("#grid").kendoGrid({
    dataSource: {
            type: "odata",
                transport: {
                    read: "http://demos.kendoui.com/service/Northwind.svc/Orders"
                },
                schema: {
                    model: {
                        fields: {
                            OrderID: { type: "number" },
                            Freight: { type: "number" },
                            ShipName: { type: "string" },
                            OrderDate: { type: "date" },
                            ShipCity: { type: "string" }
                        }
                    }
                },
                pageSize: 10,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            height: 250,
            filterable: true,
            sortable: true,
            pageable: true,
            columns: ["OrderID", "Freight"]
});

var grid = $("#grid").data("kendoGrid"), 
     columnFilterMenu = grid.thead.find("th[data-field=OrderID]").data("kendoFilterMenu");
  
columnFilterMenu.form.find("[" + kendo.attr("type") +"=number]").data("kendoNumericTextBox").options.format="n0";
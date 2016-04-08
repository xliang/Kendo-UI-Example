$(document).ready(function () {
    var element = $("#grid").kendoGrid({
        dataSource: {
            type: "odata",
            transport: {
                read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
            },
            pageSize: 6,
            serverPaging: true,
            serverSorting: true
        },
        height: 430,
        sortable: true,
        pageable: true,
        detailInit: detailInit,
        dataBound: function () {
            //-- Remove the next line to avoid expanding the first row. --//
            //  this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        columns: [{
            field: "FirstName",
            title: "First Name",
            width: "110px"
        }, {
            field: "LastName",
            title: "Last Name",
            width: "110px"
        }, {
            field: "Country",
            width: "110px"
        }, {
            field: "City",
            width: "110px"
        }, {
            field: "Title"
        }]
    });
});

function detailInit(e) {
    $("<div/>").appendTo(e.detailCell).kendoGrid({
        dataSource: {
            type: "odata",
            transport: {
                read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
            },
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            pageSize: 5,
            filter: {
                field: "EmployeeID",
                operator: "eq",
                value: e.data.EmployeeID // set up the relationship
            }
        },
        scrollable: false,
        sortable: true,
        pageable: true,
        columns: [{
            field: "OrderID",
            width: "70px"
        }, {
            field: "ShipCountry",
            title: "Ship Country",
            width: "110px"
        }, {
            field: "ShipAddress",
            title: "Ship Address"
        }, {
            field: "ShipName",
            title: "Ship Name",
            width: "200px"
        }]
    });
}
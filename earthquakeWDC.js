(function(){
    var myConnector=tableau.makeConnector();

    myConnector.getSchema = function(schemaCallback){
        var cols= [{
            id: "id",
            dataType: tableau.dataTypeEnum.integer
        }, {
            id: "Insiden",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Triwulan I",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Triwulan II",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Triwulan III",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Triwulan IV",
            dataType: tableau.dataTypeEnum.string
        }]

        var tableSchema = {
            id: "dukcapiljabar",
            alias: "Dukcapil jabar",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };
    myConnector.getData = function (table, doneCallback){

        $.getJSON("http://128.199.221.26/api/3/action/datastore_search?resource_id=7e87cf4f-806c-44b2-90b1-fbd9a73de2cc", function(resp) {
            var feat = resp.result.records,
                tableData = [];
    
            // Iterate over the JSON object
            for (i in feat) {
                tableData.push({
                    "id":feat[i]._id,
                    "Insiden":feat[i].Insiden,
                    "Triwulan I":feat[i]["Triwulan I"],
                    "Triwulan II":feat[i]["Triwulan II"],
                    "Triwulan III":feat[i]["Triwulan III"],
                    "Triwulan IV":feat[i]["Triwulan IV"]
                });
            }
    
            table.appendRows(tableData);
            doneCallback();
            tableau.log("My console message goes here!");
        });
    };
    tableau.registerConnector(myConnector);
    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Dukcapil Jabar";
            tableau.submit();
        });
    });
})();
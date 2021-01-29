(function(){
    var myConnector=tableau.makeConnector();

    myConnector.getSchema = function(schemaCallback){
        var cols= [{
            id: "Insiden",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "TriwulanI",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "TriwulanII",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "TriwulanIII",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "TriwulanIV",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "incident",
            alias: "Insiden Keamanan Siber",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };
    myConnector.getData = function (table, doneCallback){
        fetch("https://cors-anywhere.herokuapp.com/http://128.199.221.26/api/3/action/datastore_search?resource_id=7e87cf4f-806c-44b2-90b1-fbd9a73de2cc")
        .then(function(response) {
          return response.json();
        })
        .then(function(resp) {

            var feat = resp.result.records,
                tableData = [];
    
            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "Insiden":feat[i].Insiden,
                    "TriwulanI":feat[i]["Triwulan I"],
                    "TriwulanII":feat[i]["Triwulan II"],
                    "TriwulanIII":feat[i]["Triwulan III"],
                    "TriwulanIV":feat[i]["Triwulan IV"]
                });
            }
    
            table.appendRows(tableData);
            doneCallback();
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
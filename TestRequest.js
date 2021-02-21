(function(){
    var myConnector=tableau.makeConnector();

    myConnector.getSchema = function(schemaCallback){
        var cols= [{
            id: "Provinsi",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "RT Total BPS",
            dataType: tableau.dataTypeEnum.integer
        }, {
            id: "RT PLN",
            dataType: tableau.dataTypeEnum.integer
        }, {
            id: "RT Non PLN",
            dataType: tableau.dataTypeEnum.integer
        }, {
            id: "TOTAL",
            dataType: tableau.dataTypeEnum.integer
        }, {
            id: "Persentase",
            dataType: tableau.dataTypeEnum.float          
        }];

        var tableSchema = {
            id: "electrification",
            alias: "Rasio Elektrifikasi 2019",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };
    myConnector.getData = function (table, doneCallback){
        fetch("https://cors-anywhere.herokuapp.com/http://128.199.221.26/api/3/action/datastore_search?resource_id=d0c239e6-b0fa-42eb-acd3-ecd4db35ad11")
        .then(function(response) {
          return response.json();
        })
        .then(function(resp) {

            var feat = resp.result.records,
                tableData = [];
    
            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "Provinsi":feat[i].Provinsi,
                    "RT PLN":feat[i]["RT PLN"],
                    "RT Non PLN":feat[i]["RT Non PLN"],
                    "RT Total BPS":feat[i]["RT Total BPS"],
                    "TOTAL":feat[i]["TOTAL"],
                    "Persentase":feat[i].Persentase
                });
            }
    
            table.appendRows(tableData);
            doneCallback();
        });
    };
    tableau.registerConnector(myConnector);
    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Rasio Elektrifikasi 2019";
            tableau.submit();
        });
    });
})();
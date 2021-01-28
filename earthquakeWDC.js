(function(){
    var myConnector=tableau.makeConnector();

    myConnector.getSchema = function(schemaCallback){
        var cols= [{
            id: "id",
            dataType: tableau.dataTypeEnum.integer
        }, {
            id: "kode_kemendagri_kab",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "nama_kemendagri_kab",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "kode_kemendagri_kec",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "nama_kemendagri_kec",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "kode_kemendagri_kel",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "nama_kemendagri_kel",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "kode_pekerjaan",
            dataType: tableau.dataTypeEnum.integer
        }, {
            id: "nama_pekerjaan",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "jenis_kelamin",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "batas_bawah_usia",
            dataType: tableau.dataTypeEnum.integer
        }, {
            id: "batas_atas_usia",
            dataType: tableau.dataTypeEnum.integer
        }, {
            id: "jumlah_penduduk",
            dataType: tableau.dataTypeEnum.integer
        }]

        var tableSchema = {
            id: "dukcapiljabar",
            alias: "Dukcapil jabar",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };
    myConnector.getData = function (table, doneCallback){

        $.getJSON("https://opendata-dev.digitalservice.id/api-bigdata/disdukcapil/jumlah_penduduk_jabar_disdukcapil_30_juni_2020?limit=2", function(resp) {
            var feat = resp.data,
                tableData = [];
    
            // Iterate over the JSON object
            for (i in feat) {
                tableData.push({
                    "id":feat[i].id,
                    "kode_kemendagri_kab": feat[i].kode_kemendagri_kab,
                    "nama_kemendagri_kab": feat[i].nama_kemendagri_kab,
                    "kode_kemendagri_kec": feat[i].kode_kemendagri_kec,
                    "nama_kemendagri_kec": feat[i].nama_kemendagri_kec,
                    "kode_kemendagri_kel": feat[i].kode_kemendagri_kel,
                    "nama_kemendagri_kel": feat[i].nama_kemendagri_kel,
                    "kode_pekerjaan": feat[i].kode_pekerjaan,
                    "nama_pekerjaan": feat[i].nama_pekerjaan,
                    "jenis_kelamin": feat[i].jenis_kelamin,
                    "batas_bawah_usia": feat[i].batas_bawah_usia,
                    "batas_atas_usia": feat[i].batas_atas_usia,
                    "jumlah_penduduk": feat[i].jumlah_penduduk
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
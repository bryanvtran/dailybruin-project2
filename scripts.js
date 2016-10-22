var source   = $("#entry-template").html();
var template = Handlebars.compile(source);

var baseUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson";

function query() {
        var startTime = document.getElementById('start').value;
        var endTime = document.getElementById('end').value;
        var long = document.getElementById('long').value;
        var lat = document.getElementById('lat').value;
        var maxradius = "25";

        var query = baseUrl + '&starttime='+ startTime + '&endtime=' + endTime + '&maxradius=' + maxradius + '&longitude=' + long + '&latitude=' + lat;
        console.log(query);
        $.ajax({
                    url: query,
                    type: "GET",
                    success: function(resultData) {
                        var features = resultData.features;
                        // console.log(features);
                        var html    = template(features);
                        $('#body').html(html);
                        // features.forEach(function(feature) {
                        //
                        //         // gives us the location of the earthquake
                        //         // console.log(feature.properties.place);
                        //         // gives us magnitude
                        //         // console.log(feature.properties.mag);
                        //         // this gives us each point, we can use this to plot points on google map
                        //         // console.log(feature.geometry);
                        //
                        //         // more information
                        //         // console.log(feature.properties.url);
                        // });
                    },
                    error : function(jqXHR, textStatus, errorThrown) {
                    },

                    timeout: 120000,
                });
}

$("#submit").click(query);

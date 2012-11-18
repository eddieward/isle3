$(function() {


    $("#projects li").mouseenter(function() {

        $el = $(this);
        if (!$el.hasClass("hover")) {
            $("#locations li").removeClass("hover");
            $el.addClass("hover");
            $("#details")
            .find("h2")
            .html($el.find("h3").html())
            .end()
            .find("p")
            .html($el.find(".longdesc").html());
        }
    });

    $("#projects li").mouseout(function() {

        $el = $(this);
        $("#locations li").removeClass("hover");
        $("#details")
        .find("h2")
        .html($el.find("h3").html())
        .end()
        .find("p")
        .html($el.find(".longdesc").html());
    });

    var golden_gate_park = new google.maps.LatLng(37.76884231555806, -122.4801139831543),
    pointToMoveTo,
    first = true,
    curMarker = new google.maps.Marker({}),
    $el;

    var myOptions = {
        zoom: 15,
        center: golden_gate_park,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        streetViewControl: false
    };

    var map = new google.maps.Map($("#map_canvas")[0], myOptions);





    $("#locations li").mouseenter(function() {

        $el = $(this);

        if (!$el.hasClass("hover")) {

            $("#locations li").removeClass("hover");
            $el.addClass("hover");

            if (!first) {

                // Clear current marker
                curMarker.setMap();

            // Set zoom back to inital level
            // map.setZoom(10);
            }

            // Move (pan) map to new location
            pointToMoveTo = new google.maps.LatLng($el.attr("data-geo-lat"), $el.attr("data-geo-long"));
            map.panTo(pointToMoveTo);

            // Add new marker
            curMarker = new google.maps.Marker({
                position: pointToMoveTo,
                map: map,
                icon: "images/marker.png"
            });

            // On click, zoom map
            google.maps.event.addListener(curMarker, 'click', function() {
                map.setZoom(14);
            });


            var fenway = new google.maps.LatLng(42.345573,-71.098326);

            // Note: constructed panorama objects have visible: true
            // set by default.
            var panoOptions = {
                position:  pointToMoveTo,
                addressControlOptions: {                    
                    style: {
                        "fontWeight" : "bold",
                        "backgroundColor" : "#e9e2bf",
                        "color" :"#427046"
                    }
                },
                linksControl: false,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.SMALL
                },
                enableCloseButton: false,
                visible:true
            };

            var panorama = new google.maps.StreetViewPanorama(
                document.getElementById("pano"), panoOptions);



            // Fill more info area
            $("#more-info")
            .find("h2")
            .html($el.find("h3").html())
            .end()
            .find("p")
            .html($el.find(".longdesc").html());

            // No longer the first time through (re: marker clearing)
            first = false;
        }

    });

    $("#locations li:first").trigger("mouseenter");

});

var map_width;

function showPano(){
    map_width = $('#map_canvas').width();
    $('#map_canvas').width(0);
    $('#pano-button').html('<a href="#" onclick="hidePano(); return false;"><h3>Map View</h3></a>');
    $('#vertical-pano-button').hide();

}

function hidePano(){
    $('#map_canvas').width(map_width);
    $('#pano-button').html('<a href="#" onclick="showPano(); return false;"><h3>View Panoramic</h3></a>');
    $('#vertical-pano-button').show();
}


function showPanorama(){
    map_width = $('#map_canvas').width();
    $('#map_canvas').width(0);
}

function hidePanorama(){
    $('#map_canvas').width(map_width);
}

function MM_swapImgRestore() { //v3.0
    var i,x,a=document.MM_sr;
    for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
    var d=document;
    if(d.images){
        if(!d.MM_p) d.MM_p=new Array();
        var i,j=d.MM_p.length,a=MM_preloadImages.arguments;
        for(i=0; i<a.length; i++)
            if (a[i].indexOf("#")!=0){
                d.MM_p[j]=new Image;
                d.MM_p[j++].src=a[i];
            }
        }
}

function MM_findObj(n, d) { //v4.01
    var p,i,x;
    if(!d) d=document;
    if((p=n.indexOf("?"))>0&&parent.frames.length) {
        d=parent.frames[n.substring(p+1)].document;
        n=n.substring(0,p);
    }
    if(!(x=d[n])&&d.all) x=d.all[n];
    for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
    for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
    if(!x && d.getElementById) x=d.getElementById(n);
    return x;
}

function MM_swapImage() { //v3.0
    var i,j=0,x,a=MM_swapImage.arguments;
    document.MM_sr=new Array;
    for(i=0;i<(a.length-2);i+=3)
        if ((x=MM_findObj(a[i]))!=null){
            document.MM_sr[j++]=x;
            if(!x.oSrc) x.oSrc=x.src;
            x.src=a[i+2];
        }
}

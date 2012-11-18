$(function() {
    $("#projects li").mouseenter(function() {
        e = $(this);
        if (!e.hasClass("hover")) {
            $("#locations li").removeClass("hover");
            e.addClass("hover");
            $("#details").find("h2").html(e.find("h3").html()).end().find("p").html(e.find(".longdesc").html())
        }
    });
    $("#projects li").mouseout(function() {
        e = $(this);
        $("#locations li").removeClass("hover");
        $("#details").find("h2").html(e.find("h3").html()).end().find("p").html(e.find(".longdesc").html())
    });
    var a = new google.maps.LatLng(37.76884231555806, -122.4801139831543),
            b,c = true,d = new google.maps.Marker({}),e;
    a = {zoom:15,center:a,mapTypeId:google.maps.MapTypeId.TERRAIN,streetViewControl:true};
    var f = new google.maps.Map($("#map_canvas")[0], a);
    $("#locations li").mouseenter(function() {
        e = $(this);
        if (!e.hasClass("hover")) {
            $("#locations li").removeClass("hover");
            e.addClass("hover");
            c || d.setMap();
            b = new google.maps.LatLng(e.attr("data-geo-lat"), e.attr("data-geo-long"));
            f.panTo(b);
            d = new google.maps.Marker({position:b,map:f,icon:"images/marker.png"});
            google.maps.event.addListener(d,
                    "click", function() {
                        f.setZoom(14)
                    });
            new google.maps.LatLng(42.345573, -71.098326);
            var g = {position:b,addressControlOptions:{style:{fontWeight:"bold",backgroundColor:"#e9e2bf",color:"#427046"}},linksControl:false,navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL},enableCloseButton:false,visible:true};
            new google.maps.StreetViewPanorama(document.getElementById("pano"), g);
            $("#more-info").find("h2").html(e.find("h3").html()).end().find("p").html(e.find(".longdesc").html());
            c = false
        }
    });
    $("#locations li:first").trigger("mouseenter")
});
var map_width;
function showPano() {
    map_width = $("#map_canvas").width();
    $("#map_canvas").width(0);
    $("#pano-button").html('<a href="#" onclick="hidePano(); return false;"><h3>Map View</h3></a>');
    $("#vertical-pano-button").hide()
}
function hidePano() {
    $("#map_canvas").width(map_width);
    $("#pano-button").html('<a href="#" onclick="showPano(); return false;"><h3>Panoramic View</h3></a>');
    $("#vertical-pano-button").show()
}
function showPanorama() {
    map_width = $("#map_canvas").width();
    $("#map_canvas").width(0)
}
function hidePanorama() {
    $("#map_canvas").width(map_width)
}
function MM_swapImgRestore() {
    var a,b,c = document.MM_sr;
    for (a = 0; c && a < c.length && (b = c[a]) && b.oSrc; a++)b.src = b.oSrc
}
function MM_preloadImages() {
    var a = document;
    if (a.images) {
        if (!a.MM_p)a.MM_p = [];
        var b,c = a.MM_p.length,d = MM_preloadImages.arguments;
        for (b = 0; b < d.length; b++)if (d[b].indexOf("#") != 0) {
            a.MM_p[c] = new Image;
            a.MM_p[c++].src = d[b]
        }
    }
}
function MM_findObj(a, b) {
    var c,d;
    b || (b = document);
    if ((c = a.indexOf("?")) > 0 && parent.frames.length) {
        b = parent.frames[a.substring(c + 1)].document;
        a = a.substring(0, c)
    }
    if (!(d = b[a]) && b.all)d = b.all[a];
    for (c = 0; !d && c < b.forms.length; c++)d = b.forms[c][a];
    for (c = 0; !d && b.layers && c < b.layers.length; c++)d = MM_findObj(a, b.layers[c].document);
    if (!d && b.getElementById)d = b.getElementById(a);
    return d
}
function MM_swapImage() {
    var a,b = 0,c,d = MM_swapImage.arguments;
    document.MM_sr = [];
    for (a = 0; a < d.length - 2; a += 3)if ((c = MM_findObj(d[a])) != null) {
        document.MM_sr[b++] = c;
        if (!c.oSrc)c.oSrc = c.src;
        c.src = d[a + 2]
    }
}
;
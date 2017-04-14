"use strict";

var logger = new Logger();

document.addEventListener("DOMContentLoaded", function() {
    function getKey(){
        var qstring = location.search.substr(1),
            items = qstring.split("&");

        for(var n=0;n<items.length;n++){
            var item = items[n].split("="),
                name = item[0],
                value = item[1];

            if(name === "key")
                return value;
        }

        return undefined;
    }

    $(function(){
        var apikey = getKey();

        console.log("key => ", apikey);

        if(apikey === undefined)
            return;

    });

    var image = document.getElementById('image');
    var cropper = new Cropper(image, {
        aspectRatio: 16 / 9,
        crop: function(e) {
            console.log(e.detail.x);
            console.log(e.detail.y);
            console.log(e.detail.width);
            console.log(e.detail.height);
            console.log(e.detail.rotate);
            console.log(e.detail.scaleX);
            console.log(e.detail.scaleY);
        }
    });

    console.log("ok", cropper);

    // var expectedImageSource = 'base64', //todo: known image source: base64, url, path
    //     request = {
    //         type: 'GET',
    //         url: 'http://lab.deepidea.info/api?imageSrc=' + expectedImageSource,
    //         contentType: 'application/json'
    //     },
    //     networkTransporter = new NetworkTransporter(),
    //     modelBuilder = new ModelBuilder(),
    //     viewPublisher = new ViewPublisher(),
    //     viewHandler = new ViewHandler(),
    //     buttonClickListener = new ComponentListener();
    //
    //     networkTransporter.send(request)
    //         .then(function (response) {
    //             // var templateModel = JSON.parse(response); //todo: Investigate expressJS json parser
    //             var templateModel = response;
    //
    //             return templateModel;
    //         })
    //         .then(function (templateModel) {
    //             modelBuilder.build(templateModel);
    //             var componentModel = modelBuilder.getComponentModel();
    //
    //             return componentModel;
    //         })
    //         .then(function (componentModel) {
    //             viewPublisher.render(componentModel);
    //             viewHandler.setComponentModel(componentModel);
    //         })
    //         .then(function () {
    //             buttonClickListener
    //                 .setTarget(document.getElementById('next-button'))
    //                 .setType('click')
    //                 .setCallback(viewHandler.handleNextButton)
    //                 .add();
    //
    //             buttonClickListener
    //                 .setTarget(document.getElementById('reset-button'))
    //                 .setType('click')
    //                 .setCallback(viewHandler.handleResetButton)
    //                 .add();
    //         });
});
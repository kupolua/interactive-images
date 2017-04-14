"use strict";

var logger = new Logger();

document.addEventListener("DOMContentLoaded", function() {
    var expectedImageSource = 'base64', //todo: known image source: base64, url, path
        request = {
            type: 'GET',
            url: 'http://lab.deepidea.info/api?imageSrc=' + expectedImageSource,
            contentType: 'application/json'
        },
        networkTransporter = new NetworkTransporter(),
        modelBuilder = new ModelBuilder(),
        viewPublisher = new ViewPublisher(),
        viewHandler = new ViewHandler(),
        buttonClickListener = new ComponentListener();

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

        networkTransporter.send(request)
            .then(function (response) {
                // var templateModel = JSON.parse(response); //todo: Investigate expressJS json parser
                var templateModel = response;

                return templateModel;
            })
            .then(function (templateModel) {
                modelBuilder.build(templateModel);
                var componentModel = modelBuilder.getComponentModel();

                return componentModel;
            })
            .then(function (componentModel) {
                viewPublisher.render(componentModel);
                viewHandler.setComponentModel(componentModel);
            })
            .then(function () {
                buttonClickListener
                    .setTarget(document.getElementById('next-button'))
                    .setType('click')
                    .setCallback(viewHandler.handleNextButton)
                    .add();

                buttonClickListener
                    .setTarget(document.getElementById('reset-button'))
                    .setType('click')
                    .setCallback(viewHandler.handleResetButton)
                    .add();
            });
});
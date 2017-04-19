"use strict";

function CoursePreviewer(templateModel) {
    var expectedImageSource = 'base64', //todo: known image source: base64, url, path
        request = {
            type: 'GET',
            url: 'http://localhost:3000/api?imageSrc=' + expectedImageSource,
            contentType: 'application/json'
        },
        networkTransporter = new NetworkTransporter(),
        modelBuilder = new ModelBuilder(),
        viewPublisher = new ViewPublisher(),
        viewHandler = new ViewHandler(),
        buttonClickListener = new ComponentListener(),
        templateModelWeb = templateModel;


    // networkTransporter.send(request)
    //     .then(function (response) {
            // var templateModel = JSON.parse(response); //todo: Investigate expressJS json parser
            // var templateModel = response;

            // return templateModel;
        // })
        // .then(function (templateModel) {
        //     console.log(templateModel, templateModelWeb);
            // modelBuilder.build(templateModel);
            modelBuilder.build(templateModelWeb);
            var componentModel = modelBuilder.getComponentModel();

            // return componentModel;
        // })
        // .then(function (componentModel) {
            viewPublisher.render(componentModel);
            viewHandler.setComponentModel(componentModel);
        // })
        // .then(function () {
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
        // });
}

"use strict";

function ComponentController() {
    var componentModel = {};
    var viewPublisher = {};

    return {
        handleModel: function (interactiveImagesAuthorTemplate, htmlComponentProperties) {
            var templateModelLoader = new TemplateModelLoader(),
                modelBuilder  = new ModelBuilder(),
                templateModel;

            templateModelLoader.load(interactiveImagesAuthorTemplate); //todo: replace interactiveImagesAuthorTemplate to remote config;
            templateModel = templateModelLoader.getTemplateModel();
            modelBuilder.build(templateModel);
            componentModel = modelBuilder.getComponentModel();
            componentModel.properties = htmlComponentProperties;

        },
        publishView: function () {
            viewPublisher = new ViewPublisher();
            viewPublisher.render(componentModel);
        },
        addListeners: function () {
            var nextButtonClickListener = new ComponentListener(),
                resetButtonClickListener = new ComponentListener();

            nextButtonClickListener
                .setTarget(document.getElementById('next-button'))
                .setType('click')
                .setCallback(viewPublisher)
                .add();

            resetButtonClickListener
                .setTarget(document.getElementById('reset-button'))
                .setType('click')
                .setCallback(viewPublisher)
                .add();
        }
    }
}
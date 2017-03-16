"use strict";

var logger = new Logger();

document.addEventListener("DOMContentLoaded", function() {
    var templateModelLoader = new TemplateModelLoader(),
        modelBuilder = new ModelBuilder(),
        viewPublisher = new ViewPublisher(),
        viewHandler = new ViewHandler(),
        nextButtonClickListener = new ComponentListener(),
        resetButtonClickListener = new ComponentListener();
        // componentController = new ComponentController(); //todo: moved business logic here for code readability

    templateModelLoader.load();
    var templateModel = templateModelLoader.getTemplateModel();

    modelBuilder.build(templateModel);
    var componentModel = modelBuilder.getComponentModel();

    viewPublisher.render(componentModel);
    viewHandler.setComponentModel(componentModel);

    nextButtonClickListener
        .setTarget(document.getElementById('next-button'))
        .setType('click')
        .setCallback(viewHandler.handleNextButton)
        .add();

    resetButtonClickListener
        .setTarget(document.getElementById('reset-button'))
        .setType('click')
        .setCallback(viewHandler.handleResetButton)
        .add();
});
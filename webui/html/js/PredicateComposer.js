"use strict";

function PredictionsComposer(templateModel) {
    var modelBuilder = new ModelBuilder(),
        viewPublisher = new ViewPublisher(),
        viewHandler = new ViewHandler(),
        buttonClickListener = new ComponentListener(),
        templateModelWeb = templateModel;

        modelBuilder.build(templateModelWeb);
        var componentModel = modelBuilder.getComponentModel();

        viewPublisher.render(componentModel);
        viewHandler.setComponentModel(componentModel);

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
}

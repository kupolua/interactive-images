"use strict";

var logger = new Logger();

document.addEventListener("DOMContentLoaded", function() {
    var templateModelLoader = new TemplateModelLoader(),
        modelBuilder = new ModelBuilder(),
        viewPublisher = new ViewPublisher(),
        nextButtonClickListener = new ComponentListener(),
        resetButtonClickListener = new ComponentListener();
        // componentController = new ComponentController(); //todo: moved business logic here for code readability

    templateModelLoader.load();
    var templateModel = templateModelLoader.getTemplateModel();

    modelBuilder.build(templateModel);
    var componentModel = modelBuilder.getComponentModel();

    viewPublisher.render(componentModel);

    nextButtonClickListener
        .setTarget(document.getElementById('next-button'))
        .setType('click')
        .setCallback(viewPublisher.rebuild)
        .add();

    resetButtonClickListener
        .setTarget(document.getElementById('reset-button'))
        .setType('click')
        .setCallback(viewPublisher.rebuild)
        .add();
});


// TemplateModelLoader(remote config) -> TemplateModel
// ModelBuilder(TemplateModel) -> Model
// ViewPublisher(Model) -> render component -> propositionRender(proposition) -> getTemplate(MAP(type, template)) -> templateEngine(template, value) -> html -> innerHTML
//
// ComponentListener(ComponentView) -> rebuilds Model
//
// ComponentController
// findTargetImage()
//
// CurrentImageModel

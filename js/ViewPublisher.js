"use strict";

function ViewPublisher() {
    var componentModel; //todo: encapsulate this

    function getCurrentImageId(componentModel) {
        var imageElementId = '';

        try {
            var imageElement = document.getElementById('image-container').getElementsByTagName('img');

            imageElementId = imageElement.id;
        } catch (e) {
            logger.log('Error: image container is not define');
        }

        return imageElementId || componentModel.initialImageId;
    }

    function getTemplateType(componentModel, currentImageId) {
        var templateType;

        var transitions = componentModel.transitions.get(currentImageId);
        templateType = transitions.proposition.type;

        return templateType;
    }

    function getTemplate(templateType) {
        var htmlTemplatesModel = new HTMLTemplatesLibrary();
        var template;

        template = htmlTemplatesModel.get(templateType);

        return template;
    }

    function getTemplateValues(componentModel, currentImageId) { //todo: ?? сan be moved getTemplateValues to ModelBuilder ??
        var imgPrefix = 'data:image/gif;base64,',
            image = componentModel.images.get(currentImageId),
            transitions = componentModel.transitions.get(currentImageId),
            templateValues = {
                imageTitle: image.title,
                imgId: image.key,
                src: image.value.isBase64 ? imgPrefix + image.value.imageSrc : image.value.imageSrc,
                alt: image.value.imageName,
                transitionName: transitions.transitionName,
                optionList: transitions.proposition.values,
                errorMessage: 'Select state',
                nextButtonText: 'next',
                resetButtonText: 'reset'
            };

        return templateValues;
    }

    function renderView(template, templateValues) {
        Mustache.parse(template);

        var view = Mustache.render(template, templateValues),
            componentContainer = document.getElementById('interactive-images-component');

        componentContainer.innerHTML = view;
    }

    return {
        render: function (data) {
            componentModel = data;
            var currentImageId = getCurrentImageId(componentModel),
                templateType = getTemplateType(componentModel, currentImageId),
                template = getTemplate(templateType),
                templateValues = getTemplateValues(componentModel, currentImageId);

            renderView(template, templateValues);

            logger.log('component view rendering finish successfully');
        }
    }
}

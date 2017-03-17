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

    function getTemplateValues(componentModel, currentImageId) {
        var templateValues = {},
            imgPrefix = 'data:image/gif;base64,',
            image = componentModel.images.get(currentImageId),
            transitions = componentModel.transitions.get(currentImageId);

        templateValues.key = image.key;
        templateValues.imageTitle = image.title;
        templateValues.imageSrc = image.value.isBase64 ? imgPrefix + image.value.imageSrc : image.value.imageSrc;
        templateValues.imageName = image.value.imageName;

        templateValues.transitionName = transitions.transitionName;
        templateValues.proposition = transitions.proposition;

        return templateValues;
    }

    function templateEngine(template, templateValues) {
        var htmlComponentView = template(templateValues);

        return htmlComponentView;
    }
    
    function renderView(view) {
        var componentContainer = document.getElementById('interactive-images-component');

        componentContainer.innerHTML = view;
    }

    return {
        render: function (data) {
            componentModel = data;
            var currentImageId = getCurrentImageId(componentModel),
                templateType = getTemplateType(componentModel, currentImageId),
                template = getTemplate(templateType),
                templateValues = getTemplateValues(componentModel, currentImageId),
                htmlComponentView = templateEngine(template, templateValues);

            renderView(htmlComponentView);

            logger.log('component view rendering finish successfully');
        }
    }
}

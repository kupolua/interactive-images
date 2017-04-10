"use strict";

// ViewPublisher(Model)
//      -> render component
//          -> propositionRender(proposition)
//              -> getTemplate(MAP(type, template))
//                  -> templateEngine(template, value)
//                      -> html
//                          -> innerHTML

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
        var templateValues = {};
        var image = componentModel.images.get(currentImageId);

        var transitions = componentModel.transitions.get(currentImageId);

        templateValues.imageTitle = image.title;
        templateValues.imageBase64 = image.value.imageBase64;
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

    function rebuildView(componentModel, currentImageId) {
        var componentElements = {
            stateSelect: document.getElementById("state-select"),
            nextButton: document.getElementById("next-button"),
            resetButton: document.getElementById("reset-button"),
            propositionsSelection: document.getElementById("states-list").getElementsByTagName("option"),
            show: function () {
                this.nextButton.style.display = "inline-block";
                this.stateSelect.style.display = "inline-block";
                this.resetButton.style.display = "none";
                this.propositionsSelection[0].disabled = true;
                this.propositionsSelection[0].selected = true;

                logger.log("show proposition, next button and hide reset button");
            },
            hide: function () {
                this.nextButton.style.display = "none";
                this.stateSelect.style.display = "none";
                this.resetButton.style.display = "inline-block";

                logger.log("hide proposition, next button and show reset button");
            }
        };
        var conditionsMap = componentModel.conditions;

        componentElements.hide();

        var targetImageId = getTargetImageId(currentImageId);

        renderComponent(targetImageId);

        // var popup = document.getElementById("popup-text");
        //
        // popup.classList.toggle("show"); //todo: implement hide popup when it clicked
        //
        // logger.log("user did'n select state");

        function getTargetImageId(currentImageId) {
            var selectedProposition = document.getElementById('states-list'),
                propositionValue = selectedProposition.options[selectedProposition.selectedIndex].value,
                targetImageId = '';

            logger.log("user select state: " + propositionValue + ". Start to find target image id.");

            var conditionsList = conditionsMap.get(currentImageId);

            conditionsList.forEach(function (item, i, arr) {
                if(eval("(" + item.predicate + ")(propositionValue)")) {
                    targetImageId = arr[i].targetImageId;
                }
            });

            return targetImageId;
        }

        function renderComponent(targetImageId) {
            var imagesMap = componentModel.images;
            var targetImage = imagesMap.get(targetImageId),
                imageTitle = document.getElementById("image-title"),
                stateImage = document.getElementById("image-state");


            imageTitle.innerHTML = targetImage.title;

            stateImage.src = 'data:image/gif;base64,' + targetImage.value.imageBase64;
            stateImage.alt = targetImage.value.imageName;
        }
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

            logger.log('component view rendering finish successfully')
        },
        rebuild: function () {
            var currentImageId = getCurrentImageId(componentModel);

            logger.log('currentImageId: ' + currentImageId);

            if(getTemplateType(componentModel, currentImageId)) {
                rebuildView(componentModel, currentImageId);
            }
        }
    }
}

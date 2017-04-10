"use strict";

function ViewPublisher() {
    var initialImageId = '';
    var conditionsMap = '';
    var imagesMap = '';
    var htmlPropositionsTemplate = '';
    var htmlComponentTemplate = '';

    // var templatesMAP = new Map();
    // templatesMAP.set('FIXED_CHOICE', )
    // propositionRender(proposition) -> getTemplate(templatesMAP(type, template)) -> templateEngine(template, value) -> html -> innerHTML

    var setPropositionsTemplate = function (propositionsMap) {
        var proposition = propositionsMap.get(initialImageId);

        htmlPropositionsTemplate += '<option selected disabled></option>';

        if (proposition.type == 'FIXED_CHOICE') { //todo: is move 'FIXED_CHOICE' to GLOBAL.properties?
            proposition.values.forEach(function (item) {
                htmlPropositionsTemplate += '<option>' + item + '</option>';
            });
        }

        logger.log("set Propositions Template");
    };
    var setComponentTemplate = function (componentModel) {
        imagesMap = componentModel.images;
        var image = imagesMap.get(initialImageId),
            imageId = image.id,
            imageTitle = image.title,
            imageName = image.value.imageName,
            imageBase64 = image.value.imageBase64;

        htmlComponentTemplate = ' \
                <div id=\"image-title\">' + imageTitle + '</div> \
                <div id=\"image-container\"> \
                    <img id=\"image-state\" src=\"data:image/gif;base64,' + imageBase64 + '\" alt=\"' + imageName + '\" style=\"max-width:100%;\"> \
                </div> \
                <div id=\"state-select\" class=\"popup\"> choose current state of cluster \
                    <select id=\"states-list\" name=\"state\"> \
                        ' + htmlPropositionsTemplate + ' \
                    </select>\
                     <span class="popuptext" id="popup-text">Select state</span> \
                <button id=\"next-button\">next</button> \
                </div> \
                <button id=\"reset-button\" style=\"display: none;\">reset</button> \
                ';

        logger.log("Component Template set");
    };
    var buildTemplate = function (htmlComponentTemplate) {
        var referenceElement = document.getElementById('interactive-images-component');

        try {
            referenceElement.innerHTML = htmlComponentTemplate;

            logger.log("build Template"); //todo:
        } catch (e) {
            logger.log('error to add componentTemplate to DOM: ' + e);
        }
    };
    var rebuildComponent = function () {
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

        componentElements.hide();
        renderComponent(targetImageId);

        // var popup = document.getElementById("popup-text");
        //
        // popup.classList.toggle("show"); //todo: implement hide popup when it clicked
        //
        // logger.log("user did'n select state");

        function getTargetImageId() {
            var selectedProposition = document.getElementById('states-list'),
                propositionValue = selectedProposition.options[selectedProposition.selectedIndex].value,
                targetImageId;

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
            var targetImage = imagesMap.get(targetImageId),
                imageTitle = document.getElementById("image-title"),
                stateImage = document.getElementById("image-state");


            imageTitle.innerHTML = targetImage.title;

            stateImage.src = 'data:image/gif;base64,' + targetImage.value.imageBase64;
            stateImage.alt = targetImage.value.imageName;
        }
    };

    return {
        render: function (componentModel) {
            logger.log("start rendering component");

            initialImageId = componentModel.initialImageId;
            conditionsMap = componentModel.conditions;

            setPropositionsTemplate(componentModel.propositions);

            setComponentTemplate(componentModel);

            buildTemplate(htmlComponentTemplate);
        },
        rebuild: function () {
            rebuildComponent();
        }
    }
}

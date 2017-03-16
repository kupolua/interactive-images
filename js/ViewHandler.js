"use strict";

function ViewHandler() {
    var componentModel;

    function getCurrentImageId() {
        var imageElementId,
            imageElement = document.getElementById('image-state');

        imageElementId = imageElement.getAttribute('imgID');

        return imageElementId;
    }

    function isCurrentImageHasTransition(currentImageId) {
        var transitionsMap = componentModel.transitions,
            isTransitions = transitionsMap.get(currentImageId);

        return isTransitions;
    }

    function getSelectedState() {
        var selectedProposition = document.getElementById('states-list'),
            propositionValue = selectedProposition.options[selectedProposition.selectedIndex].value;

        return propositionValue;
    }

    function getTargetImageId(currentImageId, propositionValue) {
        var conditionsMap = componentModel.conditions,
            conditionsList = conditionsMap.get(currentImageId),
            targetImageId;

        conditionsList.forEach(function (item, i, arr) {
            if(eval("(" + item.predicate + ")(propositionValue)")) {
                targetImageId = arr[i].targetImageId;
            }
        });

        return targetImageId;
    }
    
    function showErrorMessage() {
        var popup = document.getElementById("popup-text");

        popup.classList.toggle("show"); //todo: implement hide popup when it clicked

        logger.log("user did'n select state");
    }

    function rebuildView(targetImageId) {
        var imagesMap = componentModel.images,
            targetImage = imagesMap.get(targetImageId),
            imageTitle = document.getElementById("image-title"),
            stateImage = document.getElementById("image-state");

        imageTitle.innerHTML = targetImage.title;

        stateImage.imgID = targetImage.key;
        stateImage.src = 'data:image/gif;base64,' + targetImage.value.imageBase64;
        stateImage.alt = targetImage.value.imageName;
    }

    function hidePropositionContainer(stateSelections) {
        stateSelections.style.display = "none";

        logger.log("proposition container hide");
    }

    function hideNextButton(nextButton) {
        nextButton.style.display = "none";

        logger.log("next button hide");
    }

    function showResetButton(resetButton) {
        resetButton.style.display = "inline-block";

        logger.log("reset button showed");
    }

    function showPropositionContainer(stateSelections) {
        var propositionSelection = document.getElementById("states-list").getElementsByTagName("option");
        stateSelections.style.display = "inline-block";
        propositionSelection[0].disabled = true;
        propositionSelection[0].selected = true;


        logger.log("proposition container showed");
    }

    function showNextButton(nextButton) {
        nextButton.style.display = "inline-block";

        logger.log("next button showed");
    }

    function hideResetButton(resetButton) {
        resetButton.style.display = "none";

        logger.log("reset button hide");
    }

    return {
        setComponentModel: function (data) {
            componentModel = data;
        },
        handleNextButton: function () {
            var stateSelections = document.getElementById("state-select"),
                nextButton = document.getElementById("next-button"),
                resetButton = document.getElementById("reset-button"),
                targetImageId = '',
                currentImageId = getCurrentImageId(),
                propositionValue = getSelectedState();

            if (propositionValue) {
                targetImageId = getTargetImageId(currentImageId, propositionValue);

                rebuildView(targetImageId);
                hidePropositionContainer(stateSelections);
                hideNextButton(nextButton);
                showResetButton(resetButton);

                logger.log('component view rebuilt');
            } else {
                showErrorMessage();
            }
        },
        handleResetButton: function () {
            var targetImageId = componentModel.initialImageId,
                stateSelections = document.getElementById("state-select"),
                nextButton = document.getElementById("next-button"),
                resetButton = document.getElementById("reset-button");

            rebuildView(targetImageId);
            showPropositionContainer(stateSelections);
            showNextButton(nextButton);
            hideResetButton(resetButton);

            logger.log('reset button pressed by user');
        }
    }
}

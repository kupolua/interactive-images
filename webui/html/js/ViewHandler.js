"use strict";

function ViewHandler() {
    var componentModel;

    function getCurrentImageId() {
        var imageElementId,
            imageElement = document.getElementById('image-state');

        imageElementId = imageElement.getAttribute('imgID');

        return imageElementId;
    }

    function getSelectedState() {
        var selectedProposition = document.getElementById('states-list'),
        //todo: ?? Where we must store view handlers forms, input etc. ??
            // propositionValue = selectedProposition.options[selectedProposition.selectedIndex].value;
            propositionValue = selectedProposition.value;

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
            imgPrefix = 'data:image/gif;base64,', //todo: duplicate code with js/ViewPublisher.js 40
            imageTitle = document.getElementById("image-title"),
            stateImage = document.getElementById("image-state");

        imageTitle.innerHTML = targetImage.title;

        //todo: duplicate code with js/ViewPublisher.js 44-47
        stateImage.imgID = targetImage.key;
        stateImage.src = targetImage.value.isBase64 ? imgPrefix + targetImage.value.imageSrc : targetImage.value.imageSrc;
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
        // var propositionSelection = document.getElementById("states-list");
        stateSelections.style.display = "inline-block";
        propositionSelection[0].disabled = true;
        propositionSelection[0].selected = true;
        // propositionSelection.value = '';


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
            try {
                var stateSelections = document.getElementById("state-select"),
                    nextButton = document.getElementById("next-button"),
                    resetButton = document.getElementById("reset-button"),
                    targetImageId = '',
                    currentImageId = getCurrentImageId(),
                    propositionValue = getSelectedState();

            // if (propositionValue) {
                    targetImageId = getTargetImageId(currentImageId, propositionValue);

                    rebuildView(targetImageId);
                    hidePropositionContainer(stateSelections);
                    hideNextButton(nextButton);
                    showResetButton(resetButton);

                    logger.log('component view rebuilt');
            } catch (e) {
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

"use strict";

function ModelBuilder() {
    var componentModel = {};

    function buildImagesMap(templateModel) {
        var imagesMap = new Map();

        templateModel.images.forEach(function (item) {
            imagesMap.set(item.key, item)
        });

        componentModel.images = imagesMap;
    }

    function buildTransitionsMap(templateModel) {
        var transitionsMap = new Map();

        templateModel.transitions.forEach(function (item) {
            transitionsMap.set(item.imageId, item);
        });

        componentModel.transitions = transitionsMap;
    }
    function buildConditionsMap(templateModel) {
        var conditionsMap = new Map();

        templateModel.transitions.forEach(function (item) {
            conditionsMap.set(item.imageId, item.conditions)
        });

        componentModel.conditions = conditionsMap;
    }

    return {
        build: function (templateModel) {
            componentModel.initialImageId = templateModel.initialImageId;

            buildImagesMap(templateModel);
            buildTransitionsMap(templateModel);
            buildConditionsMap(templateModel);

            logger.log('templateModel split for view elements using');
        },
        getComponentModel: function () {
            return componentModel;
        }
    }
}
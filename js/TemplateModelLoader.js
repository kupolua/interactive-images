"use strict";

function TemplateModelLoader(interactiveImagesAuthorTemplate) {
    this.remoteConfig = {};
    this.templateModel = {};

    return {
        setConfig: function (remoteConfig) {
            this.remoteConfig = remoteConfig;
        },
        load: function () {

            var serverResponse = new InteractiveImagesAuthorTemplate(), //todo: XMLHttpRequest(this.remoteConfig)
                interactiveImagesAuthorTemplate = serverResponse.getTemplate();

            this.templateModel = JSON.parse(interactiveImagesAuthorTemplate); //todo: this is mock

            logger.log('interactiveImagesAuthorTemplate loaded from server');
        },
        getTemplateModel: function () {

            return this.templateModel;
        }
    }
}
"use strict";

function HTMLTemplatesLibrary() {
    var templatesMap = new Map();

    function fixedChoiceTemplate(templateValues) {
        var htmlComponentTemplate = '';

        htmlComponentTemplate = ' \
                <div id="image-title">' + templateValues.imageTitle + '</div> \
                <div id="image-container"> \
                    <img id="image-state" imgID="' + templateValues.key + '" src="data:image/gif;base64,' + templateValues.imageBase64 + '" alt="' + templateValues.imageName + '" style="max-width:100%;"> \
                </div> \
                    <div id="state-select" class="popup">' + templateValues.transitionName + ' \
                        <select id="states-list" name="state"> \
                        <option selected disabled></option>';

                    templateValues.proposition.values.forEach(function (item) {
                        htmlComponentTemplate += '<option>' + item + '</option>';
                    });

        htmlComponentTemplate += ' \
                </select>\
                <span class="popuptext" id="popup-text">Select state</span> \
            </div> \
            <button id="next-button">next</button> \
            <button id="reset-button" style="display: none;">reset</button>';

        return htmlComponentTemplate;
    }

    templatesMap.set('FIXED_CHOICE', fixedChoiceTemplate);

    return templatesMap;
}
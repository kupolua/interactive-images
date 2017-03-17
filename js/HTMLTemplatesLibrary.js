"use strict";

function HTMLTemplatesLibrary() {
    var templatesMap = new Map(),
        fixedChoiceTemplate = ' \
                <div id="image-title">{{ imageTitle }}</div> \
                <div id="image-container"> \
                    <img id="image-state" imgId="{{ imgId }}" src="{{ src }}" alt="{{ alt }}" style="max-width:100%;"> \
                </div> \
                    <div id="state-select" class="popup">{{ transitionName }} \
                        <select id="states-list" name="state"> \
                        <option selected disabled></option> \
                        {{#optionList}} \
                            <option>{{.}}</option> \
                        {{/optionList}} \
                </select>\
                <span class="popuptext" id="popup-text">{{ errorMessage }}</span> \
            </div> \
            <button id="next-button">{{ nextButtonText }}</button> \
            <button id="reset-button" style="display: none;">{{ resetButtonText }}</button>';

    templatesMap.set('FIXED_CHOICE', fixedChoiceTemplate);

    return templatesMap;
}
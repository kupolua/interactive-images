(function webpackUniversalModuleDefinition(root, factory) {
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if(typeof define === 'function' && define.amd)
        define("InteractiveImages", [], factory);
    else if(typeof exports === 'object')
        exports["InteractiveImages"] = factory();
    else
        root["InteractiveImages"] = factory();
})(this, function() {
    return  (function() {
        "use strict";

        var logger;

        function Logger() {
            var eventsList = [];

            return {
                log: function (event) {
                    eventsList[eventsList.length] = eventsList.length + ' - ' + event;
                    console.log(eventsList.length + ' - ' + event);
                    // eventsList.push(event);
                },
                getLogs: function () {
                    return eventsList;
                }
            }
        }

        function TemplateModelLoader(interactiveImagesAuthorTemplate) {
            this.remoteConfig = {};
            this.templateModel = {};

            logger.log('get interactiveImagesAuthorTemplate from server');

            return {
                setConfig: function (remoteConfig) {
                    this.remoteConfig = remoteConfig;
                },
                load: function (interactiveImagesAuthorTemplate) {
                    //todo: XMLHttpRequest(this.remoteConfig)
                    //todo: mock
                    this.templateModel = JSON.parse(interactiveImagesAuthorTemplate);
                },
                getTemplateModel: function () {
                    return this.templateModel;
                }
            }
        }

        function ModelBuilder() {
            var componentModel = {};

            function buildImagesMap(templateModel) {
                var imagesMap = new Map();

                templateModel.images.forEach(function (item) {
                    imagesMap.set(item.key, item)
                });

                componentModel.images = imagesMap;
            }

            function buildPropositionMap(templateModel) {
                var propositionMap = new Map();

                templateModel.transitions.forEach(function (item) {
                    propositionMap.set(item.imageId, item.proposition);
                });

                componentModel.propositions = propositionMap;
            }
            function buildConditionsMap(templateModel) {
                var conditionsMap = new Map();

                templateModel.transitions.forEach(function (item) {
                    conditionsMap.set(item.imageId, item.conditions)
                });

                componentModel.conditions = conditionsMap;
            }

            logger.log('templateModel split for view elements using');

            return {
                build: function (templateModel) {
                    componentModel.initialImageId = templateModel.initialImageId;

                    buildImagesMap(templateModel);
                    buildPropositionMap(templateModel);
                    buildConditionsMap(templateModel);
                },
                getComponentModel: function () {
                    return componentModel;
                }
            }
        }

        function ViewPublisher() {
            var initialImageId = '';
            var conditionsMap = '';
            var imagesMap = '';
            var htmlPropositionsTemplate = '';
            var htmlComponentTemplate = '';
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
                <div id=\"state-select\"> choose current state of cluster \
                    <select id=\"states-list\" name=\"state\"> \
                        ' + htmlPropositionsTemplate + ' \
                    </select> \
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
                var selectedProposition = document.getElementById('states-list'),
                    propositionValue = selectedProposition.options[selectedProposition.selectedIndex].value;

                if (propositionValue) {
                    logger.log("user select state: " + propositionValue + ". Start to rebuild component.");

                    var conditionsList = conditionsMap.get(initialImageId);

                    conditionsList.forEach(function (item, i, arr) {
                        if(eval("(" + item.predicate + ")(propositionValue)")) {
                            var targetImageId = arr[i].targetImageId;

                            renderComponent(targetImageId);
                        }
                    });
                } else {
                    logger.log("user did'n select state");

                    alert('Select state, please'); //todo: use
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
            var setVisibleProposition = function () {
                var stateSelect = document.getElementById("state-select"),
                    nextButton = document.getElementById("next-button"),
                    resetButton = document.getElementById("reset-button"),
                    propositionSelection = document.getElementById("states-list").getElementsByTagName("option");

                    logger.log(nextButton.offsetParent);
                    if (nextButton.offsetParent) {
                        nextButton.style.display = "none";
                        stateSelect.style.display = "none";
                        resetButton.style.display = "inline-block";

                        logger.log("hide proposition, next button and show reset button");
                    } else {
                        nextButton.style.display = "inline-block";
                        stateSelect.style.display = "inline-block";
                        resetButton.style.display = "none";
                        propositionSelection[0].disabled = true;
                        propositionSelection[0].selected = true;

                        logger.log("show proposition, next button and hide reset button");
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
                run: function () {
                    // setVisibleProposition();
                    rebuildComponent();
                }
            }
        }

        function ComponentListener() {
            this.target = '';
            this.type = '';
            this.callback = {};

            (function() {
                this.setTarget = function(target) {
                    this.target = target;

                    return this;
                };
                this.setType = function(type) {
                    this.type = type;

                    return this;
                };
                this.setCallback = function(callback) {
                    this.callback = callback;

                    return this;
                };
                this.add = function() {
                    var callback = this.callback;
                    try {
                        this.target.addEventListener(this.type, function() {
                            callback.run();
                        });
                    } catch (e) {
                        logger.log('error to set Listener: ' + e);
                    }

                    return this;
                }
            }).call(ComponentListener.prototype);
        }

        function ComponentController() {
            var componentModel = {};
            var viewPublisher = {};

            return {
                handleModel: function (interactiveImagesAuthorTemplate, htmlComponentProperties) {
                    var templateModelLoader = new TemplateModelLoader(),
                        modelBuilder  = new ModelBuilder(),
                        templateModel;

                    templateModelLoader.load(interactiveImagesAuthorTemplate); //todo: replace interactiveImagesAuthorTemplate to remote config;
                    templateModel = templateModelLoader.getTemplateModel();
                    modelBuilder.build(templateModel);
                    componentModel = modelBuilder.getComponentModel();
                    componentModel.properties = htmlComponentProperties;

                },
                publishView: function () {
                    viewPublisher = new ViewPublisher();
                    viewPublisher.render(componentModel);
                },
                addListeners: function () {
                    var nextButtonClickListener = new ComponentListener(),
                        resetButtonClickListener = new ComponentListener();

                    nextButtonClickListener
                        .setTarget(document.getElementById('next-button'))
                        .setType('click')
                        .setCallback(viewPublisher)
                        .add();

                    resetButtonClickListener
                        .setTarget(document.getElementById('reset-button'))
                        .setType('click')
                        .setCallback(viewPublisher)
                        .add();
                }
            }

        }


        function InteractiveImages(htmlComponentProperties) {

            // TemplateModelLoader(remote config) -> TemplateModel
            // ModelBuilder(TemplateModel) -> Model
            // ViewPublisher(Model) -> render component
            //
            // ComponentListener(ComponentView) -> rebuilds Model
            //
            // ComponentController
            // findTargetImage()
            //
            // CurrentImageModel


            return {
                build: function (interactiveImagesAuthorTemplate) {
                    var componentController = new ComponentController();

                    logger = new Logger();
                    logger.log('process is started to build Interactive Images Component');

                    componentController.handleModel(interactiveImagesAuthorTemplate, htmlComponentProperties);
                    componentController.publishView();
                    componentController.addListeners();

                },
                getLogger: function () { return logger; }
            }
        }

        return InteractiveImages;
    })();
});
"use strict";

function PaperGerberaTemplateBuilder() {
    var fs = require('fs'),
        path = require('path'),
        md5 = require('js-md5'),
        hash,
        initialImageId = '',
        targetImageId,
        images = [
            {
                title: 'DIY Gerbera Daisies using our step by step tutorial with free printable pattern',
                key: '',
                value: {
                    imageName: 'initial-image',
                    isBase64: false,
                    imageSrc: ''
                }
            },
            {
                title: 'Using necessary materials.',
                key: '',
                value: {
                    imageName: 'necessary-materials',
                    isBase64: false,
                    imageSrc: ''
                }
            },
            {
                title: 'Using pattern, cut flower petals, green flower back & glitter flower center.',
                key: '',
                value: {
                    imageName: 'finished-workpieces',
                    isBase64: false,
                    imageSrc: ''
                }
            },
            {
                title: 'Against the edge of scissors, crease center of each petal on largest three rounds.',
                key: '',
                value: {
                    imageName: 'outer-circle-details',
                    isBase64: false,
                    imageSrc: ''
                }
            },
            {
                title: 'With the edge of the scissors, carefully curl all petals on small rounds.',
                key: '',
                value: {
                    imageName: 'inner-circle-details',
                    isBase64: false,
                    imageSrc: ''
                }
            },
            {
                title: 'Glue centers of three largest rounds rotating petals for each layer.',
                key: '',
                value: {
                    imageName: 'assembly-of-outer-circle-parts',
                    isBase64: false,
                    imageSrc: ''
                }
            },
            {
                title: 'Glue 8 center layers starting witb largest and rotating petals. Glue center disc.',
                key: '',
                value: {
                    imageName: 'final-flower-assembly',
                    isBase64: false,
                    imageSrc: ''
                }
            },
            {
                title: 'Bend center pieces to add texture and form around center.',
                key: '',
                value: {
                    imageName: 'decoration-middle-flower',
                    isBase64: false,
                    imageSrc: ''
                }
            },
            {
                title: 'Cover 6 pieces of 18 gage wire with floral tape leaving 1 inch uncovered.',
                key: '',
                value: {
                    imageName: 'preparation-flower-leg',
                    isBase64: false,
                    imageSrc: ''
                }
            },
            {
                title: 'Bend 6 tips out into a spray shape.',
                key: '',
                value: {
                    imageName: 'bend-out-into-spray-share',
                    isBase64: false,
                    imageSrc: ''
                }
            },
            {
                title: 'Trim wires to 1/4 to 1/2 inch.',
                key: '',
                value: {
                    imageName: 'trim-wires',
                    isBase64: false,
                    imageSrc: ''
                }
            },
            {
                title: 'Form green flower back around wire spray and glue into place by overlapping open edges.',
                key: '',
                value: {
                    imageName: 'mounting-receptacle',
                    isBase64: false,
                    imageSrc: ''
                }
            },
            {
                title: 'Fill flower back cup with hot glue and place onto the back of bloom.',
                key: '',
                value: {
                    imageName: 'mounting-flower',
                    isBase64: false,
                    imageSrc: ''
                }
            }
        ],
        transitions = [
            {
                imageId: '',
                transitionName: function (numberSteps) {return 'input number of (' + numberSteps + ') steps to make Gerbera Daisies';},
                proposition: {
                    type: 'ANY NUMBER', // other options like 'FIXED_CHOICE' 'ANY_STRING', "ANY NUMBER", "ANY INTEGER", "TRUE_FALSE"
                    values: []
                },
                conditions: [
                    {
                        predicate: '',
                        targetImageId: ''
                    }
                ]
            }
        ];

    function base64_encode(file) {
        var bitmap = fs.readFileSync(path.resolve(__dirname, file));

        return new Buffer(bitmap).toString('base64');
    }

    return {
        get: function () {
            var numberSteps = images.length - 1;
            images.forEach(function (item, i) {
                hash = md5(item.value.imageName);

                if(i < 1) {
                    initialImageId = hash;
                    transitions[0].imageId = hash;
                    transitions[0].transitionName = transitions[0].transitionName(numberSteps);
                }

                item.key = hash;

                item.value.isBase64 = true;
                item.value.imageSrc = base64_encode(item.value.imageName + '.png');

                // item.imageSrc = 'http://dns-example.uniontea.net/img/PaperGerberaTutorialImages/' + item.value.imageName + '.png';
                // item.value.imageSrc = 'img/PaperGerberaTutorialImages/' + item.value.imageName + '.png';

            });
            images.forEach(function (item, i, imagesList) {
                if(imagesList[i].key != transitions[0].imageId) {
                    if(i < (imagesList.length)) {
                        targetImageId = imagesList[i].key;
                    } else {
                        targetImageId = initialImageId;
                    }

                    transitions[0].proposition.values[i - 1] = item.value.imageName;
                    transitions[0].conditions[i - 1] = {
                        predicate: 'function(value){return value==\'' + i + '\';}',
                        // predicate: 'function(value){return value==\'' + item.value.imageName + '\';}',
                        targetImageId: targetImageId
                    };
                }

            });

            var responseData = {
                initialImageId: initialImageId,
                images: images,
                transitions: transitions
            };

            return responseData;
            // return JSON.stringify(responseData);
            // return JSON.stringify(responseData).replace(/='/gi, '=\'').replace(/';}/gi, '\';}');
        }
    };
}

// var authorTemplate = new PaperGerberaTemplateBuilder();

module.exports = PaperGerberaTemplateBuilder;
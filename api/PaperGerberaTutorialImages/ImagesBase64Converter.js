"use strict";

function ImagesBase64Converter() {
    var fs = require('fs'),
        md5 = require('js-md5'),
        hash,
        initialImageId = '',
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
                transitionName: 'choose step to make Gerbera Daisies',
                proposition: {
                    type: 'FIXED_CHOICE', // other options like 'ANY_STRING', "ANY NUMBER", "ANY INTEGER", "TRUE_FALSE"
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

    images.forEach(function (item, i, imagesList) {
        var nextImage = i++;
        hash = md5(item.value.imageName);

        if(i < 1) {
            initialImageId = hash;
            transitions.imageId = hash;
        }

        transitions[0].proposition.values.push(item.value.imageName);
        transitions[0].conditions.push({
            predicate: 'function(value){return value==\'' + item.value.imageName + '\';}',
            targetImageId: imagesList[nextImage].key
        });

        item.key = hash;

        // item.value.isBase64 = true;
        // item.value.imageSrc = base64_encode(item.value.imageName + '.png');

        // item.imageSrc = 'http://dns-example.uniontea.net/img/PaperGerbera/' + item + '.png';
        item.value.imageSrc = 'img/PaperGerbera/' + item.value.imageName + '.png';

        // base64str += 'initialImageId = \'' + hash + '\';';
        // base64str += 'imageBase64Map.set(\'' + hash + '\', \'' + base64_encode(item + '.png') + '\');';
        // base64str += 'imagesUrlsMap.set(\'' + hash + '\', \'http://dns-example.uniontea.net/img/PaperGerbera/' + item + '.png\');';
        // base64str += 'imagesPathMap.set(\'' + hash + '\', \'img/PaperGerbera/' + item + '.png\');';

    });

    function base64_encode(file) {
        var bitmap = fs.readFileSync(file);

        return new Buffer(bitmap).toString('base64');
    }

    return {
        get: function (reqQuery) {
            var expectedImageSource = reqQuery.imageSrc,
                imagesMap = imagesLibraryMap.get(expectedImageSource);

            buildImagesList(imagesMap);

            var responseData = {
                initialImageId: initialImageId,
                images: images,
                transitions: transitions
            };
            return JSON.stringify(responseData).replace(/='/gi, '=\'').replace(/';}/gi, '\';}');
        }
    };
}

var authorTemplate = new PaperGerberaTemplateBuilder();

module.exports.get = authorTemplate.get;
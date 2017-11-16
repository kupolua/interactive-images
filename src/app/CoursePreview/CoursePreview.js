import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import {GridList, GridTile} from 'material-ui/GridList';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import createLogger from 'logging';

const logger = createLogger('class CoursePreview');


import  { selectImage } from '../actions/selectImage';
import  { setInitialImage } from '../actions/setInitialImage';

import ConditionImagePreview from './ConditionImagePreview';

const styles = {
    height: '50%',
    width: '50%',
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    root: {
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        textAlign: 'left',
    },
    customWidth: {
        width: "100%",
    },
    preStyle: {
        display: 'block',
        padding: '10px 30px',
        margin: '0',
        overflow: 'scroll',
    },
    uploadInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
    },
    textColumnWidth: {
        width: '50%',
    },
    conditionButton: {
        margin: 12,
    }
};

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
    return class SelectableList extends Component {
        static propTypes = {
            children: PropTypes.node.isRequired,
            defaultValue: PropTypes.number.isRequired,
        };

        componentWillMount() {
            this.setState({
                selectedIndex: this.props.defaultValue,
            });
        }

        handleRequestChange = (event, index) => {
            this.setState({
                selectedIndex: index,
            });
        };

        render() {
            return (
                <ComposedComponent
                    value={this.state.selectedIndex}
                    onChange={this.handleRequestChange}
                >
                    {this.props.children}
                </ComposedComponent>
            );
        }
    };
}

SelectableList = wrapState(SelectableList);

class CoursePreview extends Component {
    constructor(props) {
        super(props);
        // console.log("constructor", props)
        // log.info('constructor');
        // log.on();
        // console.log(logger.info())
        this.state = {
            initialImageId: this.props.imageTape.model.initialImageId === null ? this.props.imageTape.model.images.length > 0 ? this.props.imageTape.model.images[0].key : null : this.props.imageTape.model.initialImageId,
            isInitialImage: true,
            imageSource: null,
            value: 1,
            open: false,
        };
        // console.log("constructor after")
        this.props.selectImage({
            key: this.state.initialImageId,
            src: this._getAvatarSrc(this.state.initialImageId),
        });
        // this.props.setInitialImage({
        //     initialImageId: this.props.imageTape.model.initialImageId === null ? this.props.imageTape.model.images.length > 0 ? this.props.imageTape.model.images[0].key : null : this.props.imageTape.model.initialImageId,
        // });

        // console.log('constructor CoursePreview')

        this._onBackToPreviewImage = this._onBackToPreviewImage.bind(this);
        this._changePreviewImage = this._changePreviewImage.bind(this);
    }

    handleToggle = () => {
        this.setState({
            open: !this.state.open,
        });
    };

    handleNestedListToggle = (item) => {
        this.setState({
            open: item.state.open,
        });
    };

    _getImageSrc(imagesList, imageId) {
        let imageSrc;

        imagesList.map((image) => {
            if(image.key == imageId) {
                imageSrc = image.value.imageSrc;
            }
        });

        return imageSrc;
    }
    componentWillReceiveProps(nextProps) {
        // console.log('componentWillReceiveProps', nextProps)
        if(this._getConditions(nextProps.imageTape.model.initialImageId)) {
            this.setState({
                isInitialImage: true,
                parentImage: this.state.initialImageId
            });
        } else {
            this.setState({
                isInitialImage: false,
            });
        }




        // console.log('componentWillReceiveProps', nextProps.imageTape.model.initialImageId)

        // console.log('componentWillReceiveProps', this.state.initialImageId , nextProps.imageTape.model.initialImageId)
        if(this.state.initialImageId !== nextProps.imageTape.model.initialImageId) {
        // // console.log('componentWillReceiveProps', this.state.initialImageId, this._getImageSrc(nextProps.imageTape.model.images, nextProps.imageTape.model.initialImageId))
            this.setState({
                initialImageId: nextProps.imageTape.model.initialImageId === null ? nextProps.imageTape.model.initialImageId[0].key : nextProps.imageTape.model.initialImageId,
                isInitialImage: true,
                imageSource: this._getImageSrc(nextProps.imageTape.model.images, nextProps.imageTape.model.initialImageId)
            });
            this.props.selectImage({
                key: nextProps.imageTape.model.initialImageId,
                src: this._getImageSrc(nextProps.imageTape.model.images, nextProps.imageTape.model.initialImageId)
            });
        }
    }

    componentWillUnmount() {
        this.props.setInitialImage({
            initialImageId: this.state.parentImage
        });
        // console.log('this.state.parentImage', this.state.parentImage);
    }

    _getPredicateValue(condition, proposition) {
        let predicateValue;

        proposition.values.forEach((propositionValue) => {
            try {
                if(eval("(" + condition.predicate + ")(propositionValue)")) {
                    predicateValue = propositionValue;
                }
            }
            catch (e) {
                this._onUpdatePredicateValue(condition, condition.predicate);
            }
        });

        return predicateValue;
    }

    _getAvatarSrc(targetImageId) {
        // console.log('_getAvatarSrc(targetImageId)', this.props.imageTape.model.images, targetImageId)
        let imageSrc;

        this.props.imageTape.model.images.map((image) => {
            if(image.key == targetImageId) {
                imageSrc = image.value.imageSrc;
            }
        });

        // console.log('_getAvatarSrc(targetImageId)', imageSrc)
        return imageSrc;
    }

    _getUnique() {
        return Math.floor(Date.now() / 1000).toString();
    }

    _isImageTransition(imageKey) {
        let isImageTransition = false;

        this.props.imageTape.model.transitions.map((transition) => {
            if(transition.imageId == imageKey) {
                isImageTransition = true;
            }
        });

        return isImageTransition;
    }

    _getConditions(imageKey) {
        let conditions;
        // console.log('this.props.imageTape.tabValue', this.props.imageTape.tabValue);

        this.props.imageTape.model.transitions.map((transition) => {
            // console.log(
            //     'transition', transition.proposition.type,
            //     '\nthis.props.imageTape.tabValue', this.props.imageTape.tabValue,
            // );

            // if(transition.proposition.type !== this.props.imageTape.tabValue) {return}

            if (transition.imageId == imageKey && transition.proposition.type == this.props.imageTape.tabValue) {
                conditions = transition.conditions;
            }
        });

        return conditions;
    }

    _getProposition(imageKey) {
        let proposition;

        this.props.imageTape.model.transitions.map((transition) => {
            if (transition.imageId == imageKey && transition.proposition.type == this.props.imageTape.tabValue) {
                proposition = transition.proposition;
            }
        });

        return proposition;
    }

    _getConditionsLength(imageKey) {
        let conditionsLength;

        this.props.imageTape.model.transitions.map((transition) => {
            if (transition.imageId == imageKey) {
                conditionsLength = transition.conditions.length;
            }
        });

        return conditionsLength;
    }

    _getTransitionQuestion(imageKey) {
        let transitionQuestion;

        this.props.imageTape.model.transitions.map((transition) => {
            if (transition.imageId == imageKey) {
                transitionQuestion = transition.transitionQuestion.transitionQuestion;
            }
        });

        return transitionQuestion;
    }

    renderConditions(imageKey) {
        let conditions = this._getConditions(imageKey);
        let proposition = this._getProposition(imageKey);

            // console.log('this.props', this.props);
        if(!conditions) {
            // this.setState({
            //     isInitialImage: false,
            // });

            return;
        }

        return conditions.map((condition) => {
            return (
                <RaisedButton
                    key={setTimeout(this._getUnique(), 400)}
                    label={this._getPredicateValue(condition, proposition)}
                    primary={true}
                    style={styles.conditionButton}
                    onTouchTap={(e)=>this._changePreviewImage(this._getAvatarSrc(condition.targetImageId), condition.targetImageId)}
                />
            )
        });
    }

    renderConditionsList() {
        return this.props.imageTape.model.images.map((image) => {
            if(this.props.imageTape.model.initialImageId == image.key) {
                let conditionsLength = this._getConditionsLength(image.key);

                return (
                    <div key={setTimeout(this._getUnique(), 400)}>
                        <TextField
                            id={image.key}
                            style={styles.textColumnWidth}
                            value={this._getTransitionQuestion(image.key)}
                        />
                        <div>
                            {this.renderConditions(image.key)}
                        </div>
                    </div>
                )
            }
        });
    }

    _changePreviewImage(imageSource, imageId) {
        // console.log('_changePreviewImage(imageSource, imageId)', imageSource, imageId)
        this.props.selectImage({
            key: imageId,
            src: imageSource
        });
        this.props.setInitialImage({
            initialImageId: imageId
        });

    }

    _onBackToPreviewImage(event) {
        let imageKey = this.state.parentImage || this.props.imageTape.model.initialImageId
        // console.log('_onBackToPreviewImage', this.props.imageTape.model.initialImageId, this.state.parentImage)

        this.props.selectImage({
            key: imageKey,
            src: this._getAvatarSrc(imageKey)
        });
    }

    _onPreviewButton() {
        if(this._isImageTransition(this.props.image.key)) {
            this.props.imageTape.model.initialImageId = this.props.image.key;

            return this.renderConditionsList();
        } else {
            return (
                <FlatButton
                    label="prev"
                    labelPosition="before"
                    style={styles.uploadButton}
                    containerElement="label"
                    onTouchTap={event => this._onBackToPreviewImage(event)}
                >
                </FlatButton>
            )

        }
    }

    _jsonParsed(json) {

        return (
            <pre style={styles.preStyle}>
                        {JSON.stringify(json, null, 4)}
                    </pre>
        )
    }

    render() {
        if (this.props.imageTape.model.images.length < 1) {
            return <div></div>;
        }

        // console.log('this.state.isInitialImage', this.state.isInitialImage);

        return (
            <div style={styles.root}>
                <ConditionImagePreview />

                    {this.state.isInitialImage ? this.renderConditionsList() : this._onPreviewButton()}

                <hr />

                <List>
                    <ListItem
                        key={2}
                        primaryText="Show JSON"
                        disabled={true}
                        nestedItems={[<ListItem key={3} primaryText={this._jsonParsed(this.props.imageTape.model)}/>]}
                    />
                </List>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        imageTape: state.imageTape,
        image: state.previewImage
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        selectImage: selectImage,
        setInitialImage: setInitialImage,
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(CoursePreview);
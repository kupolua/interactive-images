import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {GridList, GridTile} from 'material-ui/GridList';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Delete from 'material-ui/svg-icons/action/delete';
import Avatar from 'material-ui/Avatar';


import { addTransitionQuestion } from '../actions/addTransitionQuestion';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    predicateGrid: {
        width: '100%',
    },
    textColumnWidth: {
        width: '50%',
    },
    iconColumnWidth: {
        width: '50%',
    },
    addButton: {
        paddingTop: 30,
    },
    tabsPadding: {
        paddingTop: 30,
    }
};

class TransitionQuestion extends React.Component {
    constructor(props) {
        super(props);
        // console.log('class TransitionQuestion::constructor', this.props)
        this.state = {
            value: 'FIXED_CHOICE', //todo: set proposition type depend of current tab
            hintText: this._getTransitionQuestionHintText(this.props.imageTape.predicateSelectedImage) || this.props.defaults.transitionQuestionHintText,
            transitionQuestionValue: this._getTransitionQuestion(this.props) || '',
            showCheckboxes: false,
            isTransitionAdd: false,
            enterProposedValue: null
        };
    }

    componentWillReceiveProps(nextProps) {
        // console.log('class TransitionQuestion::componentWillReceiveProps(nextProps) {', nextProps);

        // console.log('class TransitionQuestion::componentWillReceiveProps(nextProps) {::if(nextProps.imageTape.model.transitions.length < 1) {', nextProps.imageTape.model.transitions.length);
        if(nextProps.imageTape.model.transitions.length < 1) {
            // console.log('true');
            this.state.transitionQuestionValue = this._getTransitionQuestion(nextProps);
            this.state.hintText = this._getTransitionQuestionHintText(nextProps.imageTape.predicateSelectedImage) || this.props.defaults.transitionQuestionHintText;
        }

        nextProps.imageTape.model.transitions.map((transition) => {
            // console.log('class TransitionQuestion::componentWillReceiveProps(nextProps) {::if(nextProps.imageTape.predicateSelectedImage == transition.imageId) {', nextProps.imageTape.predicateSelectedImage, transition.imageId);
            if(nextProps.imageTape.predicateSelectedImage == transition.imageId) {
                // console.log('true');
                // console.log('if(typeof transition.transitionQuestion === \'object\') {', nextProps.imageTape.model);
                if(typeof transition.transitionQuestion === 'object') {
                // console.log('true');
                    this.state.transitionQuestionValue = transition.transitionQuestion.transitionQuestion;
                } else {
                // console.log('false');
                    this.state.transitionQuestionValue = transition.transitionQuestion;
                }

                this.state.hintText = this.props.defaults.transitionQuestionHintText;
            } else {
                // console.log('false');
                this.state.transitionQuestionValue = this._getTransitionQuestion(nextProps);
                this.state.hintText = this._getTransitionQuestionHintText(nextProps.imageTape.predicateSelectedImage) || this.props.defaults.transitionQuestionHintText;
            }
        });
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };

    _getTransitionQuestion(nextProps) {
        // console.log('_getTransitionQuestion(nextProps) {', nextProps);
        let transitionQuestion = '';

        if(nextProps.imageTape.transitionQuestion.transitionQuestionImageId == nextProps.imageTape.predicateSelectedImage) {
            transitionQuestion = nextProps.imageTape.transitionQuestion.transitionQuestion;

            return transitionQuestion;
        }

        this.props.imageTape.model.transitions.map((transition) => {
            // console.log('_getTransitionQuestion(nextProps) {::this.props.imageTape.model.transitions.map((transition) => {::if (transition.imageId == nextProps.imageTape.predicateSelectedImage) {', transition.imageId, nextProps.imageTape.predicateSelectedImage);
            if (transition.imageId == nextProps.imageTape.predicateSelectedImage) {
                // console.log('_getTransitionQuestion(nextProps) {::if (transition.imageId == nextProps.imageTape.predicateSelectedImage) {', transition);

                if(typeof transition.transitionQuestion === 'object') {
                    transitionQuestion = transition.transitionQuestion.transitionQuestion;
                } else {
                    transitionQuestion = transition.transitionQuestion;
                }

                // console.log('_getTransitionQuestion(nextProps) {::true', transitionQuestion);
            }
        });

        // console.log(transitionQuestion);

        return transitionQuestion;
    }

    _getTransitionQuestionHintText(imageKey) {
        // // console.log(imageKey);
        let transitionQuestionHintText;

        this.props.imageTape.model.transitions.map((transition) => {
            if (transition.imageId == imageKey) {
                if(typeof transition.transitionQuestion === 'object') {
                    transitionQuestionHintText = transition.transitionQuestion.transitionQuestion;
                } else {
                    transitionQuestionHintText = transition.transitionQuestion;
                }
            }
        });

        return transitionQuestionHintText;
    }

    _onEditTransitionQuestion(transitionQuestion) {
        // // console.log('_onEditTransitionQuestion(transitionQuestion) {');
        this.props.addTransitionQuestion({
            transitionQuestion: {
                transitionQuestion: transitionQuestion,
                transitionQuestionImageId: this.props.imageTape.predicateSelectedImage
            }
        })
    }

    _onUpdatePredicateValue(condition, overlayTitle) {
        this.props.updatePredicate({
            condition: condition,
            proposedValue: overlayTitle || ' '
        });
    }

    _getAvatarSrc(targetImageId) {
        let imageSrc;

        this.props.imageTape.model.images.map((image) => {
            if(image.key == targetImageId) {
                imageSrc = image.value.imageSrc;
            }
        });

        return imageSrc;
    }

    _getUnique() {
        return Math.floor(Date.now() / 1000).toString();
    }

    _onDeleteCondition(condition) {
        this.props.deleteCondition({
            condition: condition,
        })
    }

    render() {
        // // console.log('class TransitionQuestion::render() {', this.state);
        return (
            <TextField
                id={this._getUnique()}
                hintText={this.state.hintText}
                value={this.state.transitionQuestionValue}
                onChange={event => this._onEditTransitionQuestion(event.target.value)}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        defaults: state.defaults,
        imageTape: state.imageTape
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addTransitionQuestion: addTransitionQuestion,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TransitionQuestion);
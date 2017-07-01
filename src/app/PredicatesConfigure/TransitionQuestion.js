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
        // console.log('constructor')
        this.state = {
            value: 'FIXED_CHOICE', //todo: set proposition type depend of current tab
            hintText: this._getTransitionQuestionHintText(this.props.imageTape.predicateSelectedImage),
            transitionQuestionValue: '',
            showCheckboxes: false,
            isTransitionAdd: false,
            enterProposedValue: null
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.imageTape.model.transitions.length < 1) {
            this.state.transitionQuestionValue = this._getTransitionQuestion(nextProps);
            this.state.hintText = this._getTransitionQuestionHintText(nextProps.imageTape.predicateSelectedImage)
        }

        nextProps.imageTape.model.transitions.map((transition) => {
            if(nextProps.imageTape.predicateSelectedImage == transition.imageId) {
                this.state.transitionQuestionValue = transition.transitionQuestion.transitionQuestion;
            } else {
                this.state.transitionQuestionValue = this._getTransitionQuestion(nextProps);
                this.state.hintText = this._getTransitionQuestionHintText(nextProps.imageTape.predicateSelectedImage)
            }
        });
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };

    _getTransitionQuestion(nextProps) {
        let transitionQuestion = '';

        if(nextProps.imageTape.transitionQuestion.transitionQuestionImageId == nextProps.imageTape.predicateSelectedImage) {
            transitionQuestion = nextProps.imageTape.transitionQuestion.transitionQuestion;
        }

        this.props.imageTape.model.transitions.map((transition) => {
            if (transition.imageId == nextProps.imageTape.predicateSelectedImage) {
                transitionQuestion = transition.transitionQuestion.transitionQuestion;
            }
        });

        return transitionQuestion;
    }

    _getTransitionQuestionHintText(imageKey) {
        let transitionQuestionHintText = this.props.defaults.transitionQuestionHintText;

        this.props.imageTape.model.transitions.map((transition) => {
            if (transition.imageId == imageKey) {
                transitionQuestionHintText = transition.transitionQuestion.transitionQuestion;
            }
        });

        return transitionQuestionHintText;
    }

    _onEditTransitionQuestion(transitionQuestion) {
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
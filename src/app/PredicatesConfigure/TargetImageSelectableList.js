import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import ReactTooltip from 'react-tooltip'

import { addTargetImage } from '../actions/addTargetImage';
import { addTransition } from '../actions/addTransition'

const styles = {
    customWidth: {
        width: "100%",
    },
    selectTargetImage: {
        float: "left",
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

class ImagesListSelectable extends Component {
    constructor(props) {
        super(props);
        this.state = {value: 1};
    }

    _getPredicate(overlayTitle) {
        return 'function(value){return value==\'' + overlayTitle + '\';}'
    }

    _getTransitionQuestion(predicateSelectedImage) {
        let transitionQuestion;

        if(this.props.imageTape.model.transitions.length < 1) {
            transitionQuestion = this.props.imageTape.transitionQuestion.transitionQuestion;
        }

        this.props.imageTape.model.transitions.map((transition) => {
            if (transition.imageId == predicateSelectedImage) {
                if(typeof transition.transitionQuestion === 'object') {
                    transitionQuestion = transition.transitionQuestion.transitionQuestion;
                } else {
                    transitionQuestion = transition.transitionQuestion;
                }
            }
        });

        return transitionQuestion;
    }

    _addTargetImage(targetImage) {
        // this.props.imageTape.transition.conditions[0].targetImageId = targetImage.key;

        console.log(
            // ' _addTargetImage(targetImage), ' +
            // '\ntargetImage', targetImage,
        //     '\nthis.props', this.props,
        //     '\nthis.props.imageTape.targetComponentValue', this.props.imageTape.targetComponentValue,
        );

        let transition = {
            imageId: this.props.imageTape.predicateSelectedImage,
            transitionQuestion: this._getTransitionQuestion(this.props.imageTape.predicateSelectedImage) || this.props.imageTape.transitionQuestion.transitionQuestion,
            proposition: {
                type: this.props.propositionType,
                values: [ this.props.imageTape.openChoiceValue || '' ]
            },
            conditions: [{
                predicate: this._getPredicate(this.props.imageTape.openChoiceValue || ''),
                targetImageId: targetImage.key
            }]
        };

        console.log('class ImagesListSelectable::_addTargetImage(targetImage) {, transition', transition);
        this.props.imageTape.openChoiceValue = '';
        this.props.addTransition(transition);

        // this.props.addTargetImage({
        //     targetImageId: targetImage.key,
        //     targetComponentId: this.props.targetComponentId
        // });

        // console.log('this.props.imageTape.predicateSelectedImage', this.props.imageTape.predicateSelectedImage, 'this.props.imageTape.transition', this.props.imageTape.transition)

        // this.props.addTransition({
        //     transition: this.props.imageTape.transition,
        // });
    }

    _getUnique() {
        return Math.floor(Date.now() / 1000).toString();
    }

    renderList() {
        let i = 2;

        return this.props.imageTape.model.images.map((image) => {
            return (
                <MenuItem
                    key={image.key}
                    value={i++}
                    primaryText={
                        <ListItem
                          disabled={true}
                          leftAvatar={
                            <Avatar src={image.value.imageSrc} />
                          }
                        >
                          {image.value.imageName}
                        </ListItem>
                    }
                    onTouchTap={(e)=>this._addTargetImage(image)}
                />
            )
        });
    }

    render() {
        return (
            // <div>
                <DropDownMenu
                    style={styles.customWidth}
                    value={this.state.value}
                >
                    <MenuItem value={1} primaryText="Select target image"/>
                    {this.renderList()}
                </DropDownMenu>
                // <ReactTooltip />
            // </div>
        )
    }
}

function mapStateToProps(state) {
    // console.log('ImagesListSelectable.mapStateToProps', state.imageTape);
    return {
        imageTape: state.imageTape
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addTargetImage: addTargetImage,
        addTransition: addTransition,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ImagesListSelectable)
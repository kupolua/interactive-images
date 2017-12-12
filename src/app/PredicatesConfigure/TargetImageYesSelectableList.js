import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import {GridList, GridTile} from 'material-ui/GridList';
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
    },
    iconColumnWidth: {
        width: '48%',
    },
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

class TargetImageYesSelectableList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            targetComponentTrueId: this._getTargetComponentTrueId()
        };
    }

    componentWillReceiveProps(nextProps) {
        // console.log('class TargetImageYesSelectableList::componentWillReceiveProps(nextProps)::nextProps', nextProps);
        this.state.targetComponentTrueId = this._getTargetComponentTrueId(nextProps.imageTape.predicateSelectedImage);
    }

    _getTargetComponentTrueId(nextPredicateSelectedImage) {
        if(this.props.imageTape.model.transitions < 1) {return}

        let targetComponentTrueId;

        this.props.imageTape.model.transitions.map((transition) => {
            if(transition.proposition.type == "YES_NO") {
                // console.log(transition.imageId, nextPredicateSelectedImage);
                // console.log('class TargetImageYesSelectableList::_getTargetComponentTrueId(nextPredicateSelectedImage)', transition);
                if(transition.imageId == nextPredicateSelectedImage) {
                    transition.proposition.values.forEach((value, i) => {
                        if(value == "YES") {
                            // console.log('class TargetImageYesSelectableList::_getTargetComponentTrueId(nextPredicateSelectedImage)::if(value == "YES") {', value, i, transition);
                            targetComponentTrueId = transition.conditions[i].targetImageId;
                        }
                    })
                }
            }
        });

        return targetComponentTrueId;
    }

    _getPredicate(overlayTitle) {
        return 'function(value){return value==\'' + overlayTitle + '\';}'
    }

    _getTransitionQuestion(predicateSelectedImage) {
        // console.log('_getTransitionQuestion(predicateSelectedImage) {', predicateSelectedImage);
        let transitionQuestion;

        if(this.props.imageTape.model.transitions.length < 1) {
            transitionQuestion = this.props.imageTape.transitionQuestion.transitionQuestion;
        }

        this.props.imageTape.model.transitions.map((transition) => {
            // console.log('class TargetImageYesSelectableList::_getTransitionQuestion(predicateSelectedImage) {::if (transition.imageId == predicateSelectedImage) {',
            //     transition.imageId,
            //     predicateSelectedImage,
            //     this.props.imageTape
            // );
            if (transition.imageId == predicateSelectedImage) {
                if(typeof transition.transitionQuestion === 'object') {
                    transitionQuestion = transition.transitionQuestion.transitionQuestion;
                    // console.log('true', transitionQuestion);
                } else {
                    transitionQuestion = transition.transitionQuestion;
                    // console.log('false', transitionQuestion);
                }
            }
        });

        // console.log('class TargetImageYesSelectableList::_getTransitionQuestion(predicateSelectedImage) {, transitionQuestion', transitionQuestion);
        return transitionQuestion;
    }

    _addTargetImage(targetImage) {
        // console.log('class TargetImageYesSelectableList::_addTargetImage(targetImage) {', this.props.imageTape.transitionQuestion);
        let transition = {
            imageId: this.props.imageTape.predicateSelectedImage,
            transitionQuestion: this._getTransitionQuestion(this.props.imageTape.predicateSelectedImage) || this.props.imageTape.transitionQuestion.transitionQuestion,
            proposition: {
                type: this.props.propositionType,
                values: [ this.props.targetComponentValue ]
            },
            conditions: [{
                predicate: this._getPredicate(this.props.targetComponentValue),
                targetImageId: targetImage.key
            }]
        };

        // console.log('class TargetImageYesSelectableList::_addTargetImage(targetImage) {, transition', transition);
        this.props.addTransition(transition);

        // console.log(
        //     ' _addTargetImage(targetImage), this.props.imageTape', this.props.imageTape,
        //     '\ntargetImage', targetImage,
        //     '\nthis.props.targetComponentValue', this.props.targetComponentValue,
        // );

        // this.props.addTargetImage({
        //     targetImageId: targetImage.key,
        //     targetComponentValue: this.props.targetComponentValue
        // });

        // console.log('this.props.imageTape.predicateSelectedImage', this.props.imageTape.predicateSelectedImage, 'this.props.imageTape.transition', this.props.imageTape.transition)

        // this.props.addTransition({
        //     transition: this.props.imageTape.transition,
        // });
    }

    _getUnique() {
        return Math.floor(Date.now() / 1000).toString();
    }
    
    _getImageName(key) {
        return this.props.imageTape.model.images.map((image) => {
            if(image.key == key) {
                return image.value.imageName
            }
        })
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
        // console.log(this.props.imageTape.model.transitions);
        return (
            // <div>
            <GridList cols={2}>
                {this.state.targetComponentTrueId ? <Avatar src={this._getAvatarSrc(this.state.targetComponentTrueId)}/> : <div></div>}
                <DropDownMenu
                    style={styles.customWidth}
                    value={this.state.value}
                >
                        <MenuItem
                            value={1}
                            style={styles.iconColumnWidth}
                            primaryText={this.state.targetComponentTrueId ? this._getImageName(this.state.targetComponentTrueId) : "Select target image"}
                        />
                        {this.renderList()}
                </DropDownMenu>
            </GridList>
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

export default connect(mapStateToProps, mapDispatchToProps)(TargetImageYesSelectableList)
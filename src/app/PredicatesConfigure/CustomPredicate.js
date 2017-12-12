import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import {GridList, GridTile} from 'material-ui/GridList';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import ReactTooltip from 'react-tooltip'

import { addTargetImage } from '../actions/addTargetImage';
import { setProposedValue } from '../actions/setProposedValue'
import { addTransition } from '../actions/addTransition'
import { updateCondition } from '../actions/updateCondition'

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
    predicateDropDownMenu: {
        marginTop: 88,
        marginLeft: 35,
    },
    inputCustomPredicateMarker: {
        marginTop: 96,
        marginLeft: 35,
    },
    textareaStyle: {
        paddingTop: 100
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

class CustomPredicate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 1,
            hintText: this.props.defaults.proposedHintText,
            proposedValue: this.props.defaults.proposedValue,
            predicateCode: "",
        };

        this._addPredicateCode = this._addPredicateCode.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // console.log('nextProps', nextProps);
        // this.state.predicateCode = nextProps.imageTape.predicate;
        this.state.proposedValue = nextProps.imageTape.targetComponentValue;
    }

    _getPredicate(overlayTitle) {
        return overlayTitle
    }

    _getTransitionQuestion(predicateSelectedImage) {
        let transitionQuestion;

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
        // console.log(this.props.imageTape);
        let transition = {
            imageId: this.props.imageTape.predicateSelectedImage,
            transitionQuestion: this._getTransitionQuestion(this.props.imageTape.predicateSelectedImage),
            proposition: {
                type: this.props.propositionType,
                values: [ this.props.imageTape.targetComponentValue ]
            },
            conditions: [{
                predicate: this.state.predicateCode,
                targetImageId: targetImage.key
            }]
        };

        // console.log('transition', transition);
        this.props.addTransition(transition);

        this.setState({
            predicateCode: ''
        });

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

    _addPredicateCode(predicateCode) {
        this.setState({
            predicateCode: predicateCode
        });

        // this.props.updateCondition({
        //     predicateCode: predicateCode
        // })
    }

    _onEditProposedValue(overlayTitle) {
        this.props.setProposedValue({targetComponentValue: overlayTitle})
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
            <GridList cols={3}>
                <TextField
                    id={"inputCustomPredicateMarker"}
                    style={styles.inputCustomPredicateMarker}
                    hintText="predicate name"
                    value={this.state.proposedValue}
                    onChange={event => this._onEditProposedValue(event.target.value)}
                />
                <TextField
                    style={styles.textareaStyle}
                    hintText="predicate code"
                    multiLine={true}
                    fullWidth={true}
                    value={this.state.predicateCode}
                    rows={1}
                    onChange={event => this._addPredicateCode(event.target.value)}
                />

                <DropDownMenu
                    style={styles.predicateDropDownMenu}
                    value={this.state.value}
                >
                    <MenuItem
                        value={1}
                        primaryText={"Select target image"}
                    />
                    {this.renderList()}
                </DropDownMenu>
            </GridList>
        )
    }
}

function mapStateToProps(state) {
    return {
        defaults: state.defaults,
        imageTape: state.imageTape
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addTransition, updateCondition, setProposedValue}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPredicate)
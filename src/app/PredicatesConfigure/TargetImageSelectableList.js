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

    _addTargetImage(targetImage) {
        // this.props.imageTape.transition.conditions[0].targetImageId = targetImage.key;

        this.props.addTargetImage({
            targetImageId: targetImage.key
        });

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
    _renderList() {
        return this.props.imageTape.model.images.map((image) => {
            return (
                <ListItem
                    key={image.key}
                    value={image.key}
                    primaryText={image.value.imageName}
                    onTouchTap={(e)=>this._addTargetImage(image)}
                    leftAvatar={<Avatar src={image.value.imageSrc} />}
                />
            )
        });
    }

    render() {
        return (
            <div>
                <DropDownMenu
                    style={styles.customWidth}
                    value={this.state.value}
                >
                    <MenuItem value={1} primaryText="Select target image" />
                    {this.renderList()}
                </DropDownMenu>
                <ReactTooltip />
            </div>
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
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ImagesListSelectable)
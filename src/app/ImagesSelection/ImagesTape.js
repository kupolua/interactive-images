import React, { Component } from 'react';
import { connect } from 'react-redux';
import {findDOMNode} from 'react-dom'

import { bindActionCreators } from 'redux';

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import RemoveImage from 'material-ui/svg-icons/content/clear';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ReactTooltip from 'react-tooltip'

import  { selectImage } from '../actions/selectImage';
import  { setSelectedImage } from '../actions/setSelectedImage';
import  { setInitialImage } from '../actions/setInitialImage';
import  { removeTapeImage } from '../actions/removeTapeImage';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
    },
    titleStyle: {
        color: 'rgb(0, 188, 212)',
    },
    floatingActionButton: {
        marginRight: 20,
    },
    setAsDefault: {
        borderColor: "rgb(0, 188, 212)",
        borderStyle: "solid"
    },
    setAsSelected: {
        borderColor: "rgb(0, 188, 212)",
        borderStyle: "solid"
    },
};

const iconStyles = {
    marginRight: 24,
};

class ImageTape extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSetAsDefault: null,
            isImageSelected: null,
            selectedImage: null
        };
    }

    componentWillReceiveProps(nextProps) {
        // console.log('componentWillReceiveProps')
        // ReactTooltip.show(findDOMNode(this.focus))
        let defaultImage = nextProps.imageTape.model.initialImageId ==  nextProps.imageTape.predicateSelectedImage ? styles.setAsDefault : null;

        this.setState({
            isSetAsDefault: true,
            isImageSelected: true
        })
    }

    _onClickRemoveImage(image) {
        this.props.removeTapeImage({
            images: this.props.imageTape.model.images,
            image: image
        });
    }

    _onSelectedImage(image) {
        this.props.setSelectedImage({
            selectedImage: image
        });
    }

    _onSetAsDefault(image) {
        this.props.setInitialImage({
            initialImageId: image.key
        });
    }

    renderList() {
        return this.props.imageTape.model.images.map((image) => {
            return (
                    <GridTile
                        key={image.key}
                        title={image.value.imageName}
                        // title={image.key}
                        actionIcon={
                            <IconMenu
                              iconButtonElement={
                                <IconButton>
                                    <MoreVertIcon color="rgb(0, 188, 212)"/>
                                </IconButton>}
                              anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                              targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            >
                              <MenuItem
                                onClick={event => this._onClickRemoveImage(image)}
                                primaryText="remove" />
                              <MenuItem
                                onClick={event => this._onSetAsDefault(image)}
                                primaryText="set as default"
                              />
                            </IconMenu>
                        }
                        titleStyle={styles.titleStyle}
                        titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                    >
                        <img
                            onClick={event => this._onSelectedImage(image)}
                            style={image.key == this.props.imageTape.predicateSelectedImage ? styles.setAsSelected : null}
                            src={image.value.imageSrc}
                        />
                    </GridTile>
            )
        });
    }

    render() {
        if (this.props.imageTape.model.images.length < 1) {
            return <div>
                No image selected
            </div>
        }

        return (
            <div style={styles.root}>
                <GridList style={styles.gridList} cols={1}>
                    {this.renderList()}
                </GridList>
            </div>
        )
    }
}

function mapStateToProps(state) {
    // console.log(state.imageTape.model)
    return {
        imageTape: state.imageTape
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        selectImage: selectImage,
        setSelectedImage: setSelectedImage,
        setInitialImage: setInitialImage,
        removeTapeImage: removeTapeImage
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageTape)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {findDOMNode} from 'react-dom'

import { bindActionCreators } from 'redux';

import TextField from 'material-ui/TextField';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


import  { selectImage } from '../actions/selectImage';
import  { updateImageName } from '../actions/updateImageName';
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
    imageName: {
        color: 'rgb(0, 188, 212)',
    }
};

const iconStyles = {
    marginRight: 24,
};

class ImageTape extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            isSetAsDefault: null,
            isImageSelected: null,
            selectedImage: null
        };

        this._onClickRemoveImage = this._onClickRemoveImage.bind(this);
        this._removeTapeImage = this._removeTapeImage.bind(this);
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

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    _isImageReferences(image) {
        let isReferences = false;

        if(this.props.imageTape.model.transitions.length) {
            this.props.imageTape.model.transitions.forEach((transition) => {
                transition.conditions.map((condition) => {
                    if(condition.targetImageId == image.key) {
                        isReferences = true;
                    }
                })
            })
        }


        return isReferences;
    };

    _removeTapeImage = (image) => {
        if(image.key) {
            this.props.removeTapeImage({
                images: this.props.imageTape.model.images,
                imageKey: image.key,
            });
        } else {
            this.props.removeTapeImage({
                images: this.props.imageTape.model.images,
                imageKey: this.state.image.key,
            });
        }
        //todo: if removing image is default, just propouse
        this.handleClose();
    };

    _onClickRemoveImage(image) {
        if(this._isImageReferences(image)) {
            this.setState({image: image});
            this.handleOpen();
        } else {
            this.setState({image: image});
            this._removeTapeImage(image);
        }
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

    _onChangeImageTitle(event, image) {
        // console.log('_onChangeImageTitle', event.target.value, image)
        this.props.updateImageName({
            image: image,
            nextImageName: event.target.value
        })
    }

    renderList() {
        return this.props.imageTape.model.images.map((image) => {
            return (
                    <GridTile
                        key={image.key}
                        title={
                            <TextField
                                id={image.key}
                                multiLine={true}
                                textareaStyle={styles.imageName}
                                value={image.value.imageName}
                                onChange={event => this._onChangeImageTitle(event, image)}
                            />
                        }
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
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Remove"
                primary={true}
                onClick={this._removeTapeImage}
            />,
        ];

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
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    Image has references
                </Dialog>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        imageTape: state.imageTape
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        selectImage: selectImage,
        updateImageName: updateImageName,
        setSelectedImage: setSelectedImage,
        setInitialImage: setInitialImage,
        removeTapeImage: removeTapeImage
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageTape)
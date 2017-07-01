import React, { Component } from 'react';
import { connect } from 'react-redux';

import  { setDefaults } from '../actions/setDefaults';
import  { imageTape } from '../actions/imageTape';
import  { selectImage } from '../actions/selectImage';
import { bindActionCreators } from 'redux';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const styles = {
    height: '50%',
    width: '50%',
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    root: {
        // display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    uploadButton: {
        verticalAlign: 'middle'
    }
};

class ImagePreview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            overlayTitle: "Image title",
            imageTitleValue: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.image === null) return;

        if(!Array.isArray(nextProps.image)) {
            this.setState({
                overlayTitle: nextProps.image.proposalImageName,
                imageTitleValue: ''
            });
        }
    }

    _addImageToTape() {
        this.props.imageTape({
            imageName: this.state.overlayTitle,
            key: this.props.image.key,
            src: this.props.image.src
        });
        this.props.setDefaults();
        this.props.selectImage(null);

    }
    _onInputImageName(overlayTitle) {
        this.setState({
            overlayTitle: overlayTitle,
            imageTitleValue: overlayTitle
        });
    }

    _onClickSetTitleValue() {
        this.setState({
            imageTitleValue: this.state.overlayTitle
        });
    }

    render() {
        if (!this.props.image) {
            return <div></div>
        }

        return (
            <div>
                <div>
                    <TextField
                        hintText={this.props.image.proposalImageName || "paste image name"}
                        value={this.state.imageTitleValue}
                        onChange={event => this._onInputImageName(event.target.value)}
                        onClick={event => this._onClickSetTitleValue(event)}
                    />
                </div>
                <div>
                    <Card style={styles}>
                        <CardMedia
                            overlay={<CardTitle title={this.state.overlayTitle} />}
                        >
                            <img src={this.props.image.src} />
                        </CardMedia>
                    </Card>

                </div>
                <div>
                    <FlatButton
                        label="Save"
                        labelPosition="before"
                        style={styles.uploadButton}
                        onTouchTap={(e)=>this._addImageToTape()}
                        containerElement="label"
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        image: state.previewImage
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ imageTape: imageTape, selectImage: selectImage, setDefaults: setDefaults }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ImagePreview);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import  { updateImageName } from '../actions/updateImageName';

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
    imageName: {
        color: 'rgb(0, 188, 212)',
    }
};

class ConditionImagePreview extends Component {
    constructor(props) {
        super(props);
    }

    _getImageName(imageKey) {
        let imageName;

        this.props.imageTape.model.images.map((image) => {
            if(image.key == imageKey) {
                imageName = image.value.imageName;
            }
        });

        return imageName;
    }
    _getImage(imageKey) {
        let returnedImage;

        this.props.imageTape.model.images.map((image) => {
            if(image.key == imageKey) {
                returnedImage = image
            }
        });

        return returnedImage;
    }

    _onChangeImageTitle(event, image) {
        // console.log(event.target.value)
        this.props.updateImageName({
            image: image,
            nextImageName: event.target.value
        })
    }

    render() {
        // console.log(this.props.image.key, this.props.image.src)
        return (
            <div>
                <hr />
                <TextField
                    id={this.props.image.key}
                    multiLine={true}
                    textareaStyle={styles.imageName}
                    value={this._getImageName(this.props.image.key)}
                    onChange={event => this._onChangeImageTitle(event, this._getImage(this.props.image.key))}
                />
                <div>
                    <Card style={styles}>
                        <CardMedia>
                            <img src={this.props.image.src} />
                        </CardMedia>
                    </Card>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        imageTape: state.imageTape,
        image: state.previewImage
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateImageName: updateImageName,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ConditionImagePreview);
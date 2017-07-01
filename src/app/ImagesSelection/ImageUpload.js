import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { setInputData } from '../actions/setInputData';
import  { selectImage } from '../actions/selectImage';
import { bindActionCreators } from 'redux';
import md5 from 'md5';

import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    inputForm: {
        // display: 'flex',
    },
    inputFields: {
        // float: 'right'
    },
    previewImage: {
        float: 'left'
    },
    uploadButton: {
        verticalAlign: 'middle',
    },
    uploadInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
    },
    uploadPadding: {
        paddingTop: 50,
    }
};

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            key: '',
            src:'',
            imagePreviewUrl: '',
            hintText: this.props.defaults.hintText,
            value: this.props.defaults.value
        };

        this.onUploadUrl = this.onUploadUrl.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    onUpdate(props) {
        this.setState({
            hintText: props.defaults.hintText,
            value: props.defaults.value
        });
    }

    componentWillReceiveProps(nextProps) {
        if(!Array.isArray(nextProps.defaults)) {
            this.onUpdate(nextProps);
        }
    }

    onUploadUrl(e) {
        e.preventDefault();

        let imageID = md5(Math.floor(Date.now() / 1000));
        let imageSrc = e.target.value;
        let proposalImageName = imageSrc.replace(/^.*\//g, "").replace(/\.[^/.]+$/, "");

        this.setState({
            key: imageID,
            imagePreviewUrl: imageSrc,
            hintText: null,
            value: imageSrc
        });

        this.props.setInputData({
            hintText: null,
            value: imageSrc,
            proposalImageName: proposalImageName
        });

        this.props.selectImage({
            key: imageID,
            src: imageSrc,
            proposalImageName: proposalImageName
        });
    }

    onUploadFile(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        let imageID = md5(Math.floor(Date.now() / 1000));
        let proposalImageName = e.target.files[0].name.replace(/\.[^/.]+$/, "");

        reader.onloadend = () => {
            this.setState({
                file: file,
                key: imageID,
                imagePreviewUrl: reader.result,
                proposalImageName: proposalImageName
            });
            this.props.selectImage({
                key: imageID,
                src: reader.result,
                proposalImageName: proposalImageName
            })
        };

        reader.readAsDataURL(file)
    }

    render() {
        return (
            <div className="previewComponent" style={styles.uploadPadding}>
                <TextField
                    hintText={this.state.hintText}
                    value={this.state.value}
                    onChange={event => this.onUploadUrl(event)}
                />
                or
                <FlatButton
                    label="Choose an Image"
                    labelPosition="before"
                    style={styles.uploadButton}
                    containerElement="label"
                >
                    <input
                        type="file"
                        style={styles.uploadInput}
                        className="fileInput"
                        onChange={(e)=>this.onUploadFile(e)}
                    />
                </FlatButton>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        defaults: state.defaults
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        selectImage: selectImage,
        setInputData: setInputData
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);
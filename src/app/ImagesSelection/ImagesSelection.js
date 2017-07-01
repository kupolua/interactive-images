import React, { Component } from 'react';
import ImagesTape from './ImagesTape';
import ImageUpload from './ImageUpload';
import ImagePreview from './ImagePreview';

const styles = {
    root: {
        // display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    }
};

export default class ImagesSelection extends Component {
    render() {
        return (
            <div style={styles.root}>
                    <ImagesTape />
                    <ImageUpload />
                    <ImagePreview />
            </div>
        );
    }
}
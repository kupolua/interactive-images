import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImagesTape from '../ImagesSelection/ImagesTape';
import TransitionQuestion from './TransitionQuestion'
import TransitionTypeTabs from './TransitionTypeTabs'

const styles = {
    root: {
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    transitionQuestion: {
        paddingTop: "50px"
    },
};

class PredicatesConfigure extends Component {
    constructor(props) {
        super(props);
    }

    _isImageSelected() {
        if(this.props.imageTape.predicateSelectedImage) {
            return (
                <div style={styles.transitionQuestion}>
                    <TransitionQuestion />
                    <TransitionTypeTabs />
                </div>
            )
        }

        return (<div><h3>Select Image</h3></div>)
    }

    render() {
        return (
            <div style={styles.root}>
                <ImagesTape />
                {this._isImageSelected()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        imageTape: state.imageTape
    };
}


export default connect(mapStateToProps)(PredicatesConfigure);
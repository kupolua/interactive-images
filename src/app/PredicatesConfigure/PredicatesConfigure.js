import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {List, ListItem, makeSelectable} from 'material-ui/List';
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
    preStyle: {
        display: 'block',
        padding: '10px 30px',
        margin: '0',
        overflow: 'scroll',
        textAlign: 'left',
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

    _jsonParsed(json) {

        return (
            <pre style={styles.preStyle}>
                        {JSON.stringify(json, null, 4)}
                    </pre>
        )
    }

    render() {
        return (
            <div style={styles.root}>
                <ImagesTape />

                {this._isImageSelected()}

                <List>
                    <ListItem
                        key={2}
                        primaryText="Show JSON"
                        disabled={true}
                        nestedItems={[<ListItem key={3} primaryText={this._jsonParsed(this.props.imageTape.model)}/>]}
                    />
                </List>
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
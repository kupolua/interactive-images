import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
    }
};

class ConditionImagePreview extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        console.log(this.props.image.src)
        return (
            <div>
                <hr />
                <div>
                    image name
                </div>
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
        image: state.previewImage
    }
}

export default connect(mapStateToProps)(ConditionImagePreview);
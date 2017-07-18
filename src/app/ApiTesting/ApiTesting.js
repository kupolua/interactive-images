import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import {GridList, GridTile} from 'material-ui/GridList';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


import CoursePreview from '../CoursePreview/CoursePreview'

import  { getCoursesList } from '../actions/getCoursesList';
import  { getCourse } from '../actions/getCourse';
import  { setCourse } from '../actions/setCourse';

const styles = {
    height: '50%',
    width: '50%',
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    root: {
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        textAlign: 'left',
    },
    customWidth: {
        width: "100%",
    },
    preStyle: {
        display: 'block',
        padding: '10px 30px',
        margin: '0',
        overflow: 'scroll',
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
    textColumnWidth: {
        width: '50%',
    },
    conditionButton: {
        margin: 12,
    }
};
let c = 0;

class ApiTesting extends Component {
    constructor(props) {
        super(props);

        this.props.getCoursesList();

        // console.log(this.props.coursesList)
        this.state = {
            coursesList: []
        };

    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            coursesList: nextProps.coursesList
        });

        if(!nextProps.course.course) {
            return;
        }

        // console.log('nextProps', JSON.parse( nextProps.course.course.js_object));
        // this.setState({
        //     course: JSON.parse( nextProps.course.course.js_object)
        // })

        // _.isEqual(a, b)
        // console.log(nextProps, nextProps.imageTape.model, JSON.parse( nextProps.course.course.js_object))
        // console.log(nextProps, nextProps.imageTape.model, JSON.parse( nextProps.course.course.js_object))
        // console.log(_.isEqual(nextProps.imageTape.model, JSON.parse( nextProps.course.course.js_object)))
        // console.log(c)
        if(c < 10) {
            if(_.isEqual(nextProps.imageTape.model, JSON.parse( nextProps.course.course.js_object))) {
                return
            } else {
                c++;

                if(this.props.course.course) {
                    if(_.isEqual(JSON.parse( this.props.course.course.js_object), JSON.parse(nextProps.course.course.js_object))) {
                        this.setState({
                            course: nextProps.imageTape.model
                        });

                        this.props.setCourse({
                            course: nextProps.imageTape.model
                        })
                    } else {
                        this.setState({
                            course: JSON.parse( nextProps.course.course.js_object)
                        });

                        this.props.setCourse({
                            course: JSON.parse( nextProps.course.course.js_object)
                        })
                    }
                } else {
                    this.setState({
                        course: JSON.parse( nextProps.course.course.js_object)
                    });

                    this.props.setCourse({
                        course: JSON.parse( nextProps.course.course.js_object)
                    })
                }
            }
        } else {
            return
        }
    }

    _getUnique() {
        return Math.floor(Date.now() / 1000).toString();
    }

    _getCourse(courseId) {
        // console.log('_getCourse(courseId)', courseId)
        this.props.getCourse({
            courseId: courseId
        })
    }

    _renderCoursePreview() {
        if(!this.state.course) {return}


        return <CoursePreview />
    }

    _renderList() {
        if(this.state.coursesList.length == 0) {return;}
        return this.state.coursesList.coursesList.map((course) => {
            return (
                <div
                    key={course}
                    onClick={event => this._getCourse(course)}
                >
                    {course}
                </div>
            )
        })
    }

    render() {
        return (
            <div style={styles.root}>
                {this._renderList()}
                {this._renderCoursePreview()}
            </div>
        );
    }
}

function mapStateToProps({ imageTape, coursesList, course }) {
    // console.log('mapStateToProps(imageTape)', imageTape)

    return { imageTape, coursesList, course };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCoursesList: getCoursesList,
        getCourse: getCourse,
        setCourse: setCourse
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(ApiTesting);
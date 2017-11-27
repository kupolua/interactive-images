import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ImagesSelection from './ImagesSelection/ImagesSelection';
import PredicatesConfigure from './PredicatesConfigure/PredicatesConfigure'
import CoursePreview from './CoursePreview/CoursePreview'

import  { getCoursesList } from './actions/getCoursesList';
import  { storeCourse } from './actions/storeCourse';

/**
 * Horizontal steppers are ideal when the contents of one step depend on an earlier step.
 * Avoid using long step names in horizontal steppers.
 *
 * Linear steppers require users to complete one step in order to move on to the next.
 */

const styles = {
    conditionButton: {
        margin: 12,
    }
};
class HorizontalLinearStepper extends React.Component {
    constructor(props) {
        super(props);
        // console.log('this.props.InitStore();', this.props.InitStore);
        // this.props.InitStore({initStore: {}});

        this.state = {
            finished: false,
            stepIndex: 0,
            isCourseStored: false,
        };

        this._saveToStore = this._saveToStore.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // console.log('componentWillReceiveProps(nextProps) {', nextProps, this.state);
        if(this.state.isCourseStored) {
            // console.log('if(this.state.isCourseStored) {');
            this.props.getCoursesList();

            this.state.isCourseStored = false;
        }
    }

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 4,
        });
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    _getUnique() {
        return Math.floor(Date.now() / 1000).toString();
    }

    _saveToStore() {
        // console.log('_saveToStore', this.props.imageTape.model)
        this.props.storeCourse({
            course: this.props.imageTape.model
        });

        this.state.isCourseStored = true;
    }

    _loadStepContent(stepIndex) {
        this.setState({
            stepIndex: stepIndex,
            finished: false,
        });
    }

    getStepContent(stepIndex) {
        switch ('getStepContent(stepIndex)', stepIndex) {
            case 0:
                return <ImagesSelection />;
            case 1:
                return <PredicatesConfigure />;
            case 2:
                if (this.props.imageTape.model.images.length < 1) {
                    return <div></div>;
                }
                
                return <div>
                    <CoursePreview />
                    <RaisedButton
                        key={setTimeout(this._getUnique(), 400)}
                        label="save to store"
                        secondary={true}
                        style={styles.conditionButton}
                        onTouchTap={event => this._saveToStore(event)}
                    />
                </div>;
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }

    render() {
        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};

        return (
            <div style={{width: '100%', maxWidth: '70%', margin: 'auto'}}>
                <Stepper activeStep={stepIndex}>
                    <Step>
                        <StepLabel
                            onTouchTap={event => this._loadStepContent(0)}
                        >Images selection</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel
                            onTouchTap={event => this._loadStepContent(1)}
                        >Predicates configure</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel
                            onTouchTap={event => this._loadStepContent(2)}
                        >Course preview</StepLabel>
                    </Step>
                </Stepper>
                <div style={contentStyle}>
                    {finished ? (
                        <div>Hi</div>
                    ) : (
                        <div>
                            <div>{this.getStepContent(stepIndex)}</div>
                            <div style={{marginTop: 130}}>
                                <FlatButton
                                    label="Back"
                                    disabled={stepIndex === 0}
                                    onTouchTap={this.handlePrev}
                                    style={{marginRight: 12}}
                                />
                                <RaisedButton
                                    label={stepIndex === 3 ? 'Finish' : 'Next'}
                                    primary={true}
                                    onTouchTap={this.handleNext}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        imageTape: state.imageTape,
        storeCourse: state.storeCourse,
        // image: state.previewImage
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCoursesList: getCoursesList,
        storeCourse: storeCourse,
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(HorizontalLinearStepper);

// export default HorizontalLinearStepper;
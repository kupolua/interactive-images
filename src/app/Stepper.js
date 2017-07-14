import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import  { storeCourse } from './actions/storeCourse';

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

/**
 * Horizontal steppers are ideal when the contents of one step depend on an earlier step.
 * Avoid using long step names in horizontal steppers.
 *
 * Linear steppers require users to complete one step in order to move on to the next.
 */
class HorizontalLinearStepper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            finished: false,
            stepIndex: 2,
        };
    }

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <ImagesSelection />;
            case 1:
                return <PredicatesConfigure />;
            case 2:
                return <CoursePreview />;
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }

    _storeCourse() {
        // this.setState({stepIndex: 0, finished: false})
        // console.log(JSON.stringify(this.props.imageTape.model, null, 4))
        this.props.storeCourse({
            json: this.props.imageTape.model
        })
    }

    render() {
        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};

        return (
            <div style={{width: '100%', maxWidth: '70%', margin: 'auto'}}>
                <Stepper activeStep={stepIndex}>
                    <Step>
                        <StepLabel>Images selection</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Predicates configure</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Course preview</StepLabel>
                    </Step>
                </Stepper>
                <div style={contentStyle}>
                    {finished ? (
                        <div>{this._storeCourse()}</div>
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
                                    label={stepIndex === 2 ? 'Finish' : 'Next'}
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
        imageTape: state.imageTape
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        storeCourse: storeCourse,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HorizontalLinearStepper)
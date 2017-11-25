import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import {GridList, GridTile} from 'material-ui/GridList';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Delete from 'material-ui/svg-icons/action/delete';
import Avatar from 'material-ui/Avatar';


import TargetImageSelectableList from './TargetImageSelectableList'
import TargetImageYesSelectableList from './TargetImageYesSelectableList'
import TargetImageNoSelectableList from './TargetImageNoSelectableList'
import CustomPredicate from './CustomPredicate'

import { setTabValue } from '../actions/setTabValue'
import { addPredicate } from '../actions/addPredicate'
import { updatePredicate } from '../actions/updatePredicate'
import { updatePredicateCode } from '../actions/updatePredicateCode'
import { deleteCondition } from '../actions/deleteCondition';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    predicateGrid: {
        width: '100%',
        cellHeight: 70
    },
    predicateTextField: {
        // height: '35px',
        // cellHeight: 80
    },
    textColumnWidth: {
        width: '48%',
    },
    iconColumnWidth: {
        width: '48%',
    },
    deleteIconColumnWidth: {
        width: '4%',
    },
    addButton: {
        paddingTop: 30,
    },
    tabsPadding: {
        paddingTop: 30,
    }
};

class PredicateTabsControlled extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'OPEN_CHOICE', //todo: set proposition type depend of current tab
            // value: 'YES_NO', //todo: set proposition type depend of current tab
            // value: 'CUSTOM_PREDICATE', //todo: set proposition type depend of current tab
            hintText: this.props.defaults.proposedHintText,
            proposedValue: this.props.defaults.proposedValue,
            showCheckboxes: false,
            isTransitionAdd: false,
            enterProposedValue: null,
        };

        // this.props.setTabValue({tabValue: this.state.value})
        // console.log('this.props', this.props);
        this.props.imageTape.tabValue = this.state.value;
    }

    componentWillReceiveProps(nextProps) {
        // console.log('nextProps.imageTape', nextProps.imageTape);
        this.state.proposedValue = nextProps.imageTape.targetComponentValue;
    }

    handleChange = (value) => {
        // console.log('handleChange = (value) => {', value);
        this.setState({
            value: value,
        });

        this.props.setTabValue({tabValue: value})
    };

    _getPredicate(overlayTitle) {
        return 'function(value){return value==\'' + overlayTitle + '\';}'
    }

    _getPredicateValue(condition, proposition, i) {
        return proposition.values[i];
        // let predicateValue;
        //
        // proposition.values.forEach((propositionValue) => {
        //     try {
        //         if(eval("(" + condition.predicate + ")(propositionValue)")) {
        //             predicateValue = propositionValue;
        //         }
        //     }
        //     catch (e) {
        //         predicateValue = condition.predicate;
        //     }
        // });
        //
        // return predicateValue;
    }

    _onEditProposedValue(overlayTitle) {
        this.props.setProposedValue({targetComponentValue: overlayTitle})
    }

    _onUpdatePredicateValue(condition, proposition, overlayTitle, i) {
        console.log('_onUpdatePredicateValue(condition, proposition, overlayTitle) {', proposition.values[i], i);
        this.props.updatePredicate({
            condition: condition,
            proposition: proposition,
            currentProposedValue: proposition.values[i],
            proposedValue: overlayTitle || ' ',
        });
    }

    _onUpdatePredicateCode(condition, i, overlayTitle) {
        console.log('_onUpdatePredicateValue(condition, proposition, overlayTitle) {', condition, i, overlayTitle);
        this.props.updatePredicateCode({
            targetImageId: condition.targetImageId,
            predicate: overlayTitle
        });
    }

    _getAvatarSrc(targetImageId) {
        let imageSrc;

        this.props.imageTape.model.images.map((image) => {
            if(image.key == targetImageId) {
                imageSrc = image.value.imageSrc;
            }
        });

        return imageSrc;
    }

    _getUnique() {
        return Math.floor(Date.now() / 1000).toString();
    }

    _getImageName(key) {
        return this.props.imageTape.model.images.map((image) => {
            if(image.key == key) {
                return image.value.imageName
            }
        })
    }

    _onDeleteCondition(condition) {
        console.log('_onDeleteCondition(condition) {, condition', condition)
        this.props.deleteCondition({
            condition: condition,
        })
    }

    _setProposedValue(value) {
        this.setState({
            proposedValue: value
        });
    }

    _isCustomPredicate(condition, transition, i) {
        if(this.props.imageTape.tabValue != "CUSTOM_PREDICATE") {return;}

        return (
            <TableRowColumn style={styles.textColumnWidth}>
                <TextField
                    hintText="input code"
                    multiLine={true}
                    fullWidth={true}
                    value={transition.conditions[i].predicate}
                    rows={1}
                    onChange={event => this._onUpdatePredicateCode(condition, i, event.target.value)}
                />
            </TableRowColumn>
        )
    }

    renderRows() {
        // console.log('renderRows() {, this.props', this.props);

        return this.props.imageTape.model.transitions.map((transition) => {
            // console.log(
            //     'transition.proposition.type', transition.proposition.type,
            //     '\nthis.props.imageTape.tabValue', this.props.imageTape.tabValue,
            // );
            if(transition.proposition.type !== this.props.imageTape.tabValue) {return}

            // console.log('transition.imageId == this.props.imageTape.predicateSelectedImage', transition.imageId, this.props.imageTape.predicateSelectedImage);

            if(transition.imageId == this.props.imageTape.predicateSelectedImage) {
                    // console.log(
                    //     'transition.proposition.type == this.state.value',
                    //     transition.proposition.type,
                    //     this.state.value,
                    //     '\n!transition.conditions.length',
                    //     transition.conditions.length
                    // );

                // if(!transition.conditions.length || transition.proposition.type != this.state.value) {return}
                if(!transition.conditions.length) {return}

                // console.log('transition', transition);

                return transition.conditions.map((condition, i) => {
                    if(condition.predicate && condition.targetImageId) {

                        return (
                            <TableRow>
                                <TableRowColumn style={styles.textColumnWidth}>
                                    <TextField
                                        id={this._getUnique()}
                                        style={styles.textColumnWidth}
                                        value={this._getPredicateValue(condition, transition.proposition, i)}
                                        onChange={event => this._onUpdatePredicateValue(condition, transition.proposition, event.target.value, i)}
                                    />
                                </TableRowColumn>

                                {this._isCustomPredicate(condition, transition, i)}

                                <TableRowColumn style={styles.iconColumnWidth}>
                                    <ListItem
                                        style={styles.iconColumnWidth}
                                        value={this._getImageName(condition.targetImageId)}
                                        primaryText={this._getImageName(condition.targetImageId)}
                                        leftAvatar={<Avatar src={this._getAvatarSrc(condition.targetImageId)} />}
                                    />
                                </TableRowColumn>
                                <TableRowColumn style={styles.deleteIconColumnWidth}>
                                    <FlatButton
                                        icon={<Delete />}
                                        onTouchTap={(e)=>this._onDeleteCondition(condition)}
                                    />
                                </TableRowColumn>
                            </TableRow>
                        )
                    }
                });
            }
        });
    }

    render() { //todo: refactor code to separate small components
        // console.log('this.props.imageTape.targetComponentId', this.props.imageTape.targetComponentId)
        // console.log('render() {', this.props.imageTape);
        return (
            <Tabs
                style={styles.tabsPadding}
                value={this.state.value}
                onChange={this.handleChange}
            >
                <Tab label="OPEN CHOICE" value="OPEN_CHOICE">

                        {this.renderRows()}

                        <GridList style={styles.predicateGrid} cols={2}>
                            <TextField
                                id={this._getUnique()}
                                hintText={this.state.hintText}
                                value={this.state.proposedValue}
                                onChange={event => this._onEditProposedValue(event.target.value)}
                            />
                            <TargetImageSelectableList propositionType="OPEN_CHOICE"/>
                        </GridList>
                </Tab>
                <Tab label="YES/NO" value="YES_NO">
                    <GridList style={styles.predicateGrid} cellHeight={styles.predicateGrid.cellHeight} cols={2}>
                        <TextField
                            style={styles.predicateTextField}
                            id={this._getUnique()}
                            value="YES"
                            hintText="YES"
                        />

                        <TargetImageYesSelectableList targetComponentValue="YES" propositionType="YES_NO"/>

                        <TextField
                            style={styles.predicateTextField}
                            id={this._getUnique()}
                            value="NO"
                            hintText="NO"
                        />

                        <TargetImageNoSelectableList targetComponentValue="NO" propositionType="YES_NO"/>
                    </GridList>
                </Tab>
                <Tab label="CUSTOM PREDICATE" value="CUSTOM_PREDICATE">
                    {this.renderRows()}

                    <CustomPredicate targetComponentValue="CUSTOM PREDICATE" propositionType="CUSTOM_PREDICATE"></CustomPredicate>
                </Tab>
                {/*
                <Tab label="GEO" value="GEO">
                    <h2 style={styles.headline}>Controllable Tab Of select any image area</h2>
                </Tab>
                */}
            </Tabs>
        );
    }
}

function mapStateToProps(state) {
    return {
        defaults: state.defaults,
        imageTape: state.imageTape
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setTabValue: setTabValue,
        addPredicate: addPredicate,
        updatePredicate: updatePredicate,
        updatePredicateCode: updatePredicateCode,
        deleteCondition: deleteCondition,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PredicateTabsControlled);
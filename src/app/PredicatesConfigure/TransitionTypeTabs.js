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
import { addPredicate } from '../actions/addPredicate'
import { updatePredicate } from '../actions/updatePredicate'
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

class TabsExampleControlled extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'FIXED_CHOICE', //todo: set proposition type depend of current tab
            hintText: this.props.defaults.proposedHintText,
            proposedValue: this.props.defaults.proposedValue,
            showCheckboxes: false,
            isTransitionAdd: false,
            enterProposedValue: null
        };
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.proposedValue.length) {
            let isSetTransition = false;
            let nextTransition = {
                imageId: this.props.imageTape.predicateSelectedImage,
                transitionQuestion: this.props.imageTape.transitionQuestion,
                proposition: {
                    type: this.state.value,
                    values: [this.state.proposedValue]
                },
                conditions: [{
                    predicate: this._getPredicate(this.state.proposedValue),
                    targetImageId: nextProps.imageTape.targetImageId
                }]
            };

            this.props.imageTape.model.transitions.map((transition) => {
                if(transition.imageId == this.props.imageTape.predicateSelectedImage) {
                    transition.proposition.values.push(this.state.proposedValue);
                    transition.conditions.push(nextTransition.conditions[0]);
                    isSetTransition = true;
                }
            });

            if(!isSetTransition) {
                this.props.imageTape.model.transitions.push(nextTransition);
            }

            this.state.proposedValue = "";
        }
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };

    _getPredicate(overlayTitle) {
        return 'function(value){return value==\'' + overlayTitle + '\';}'
    }

    _getPredicateValue(condition, proposition) {
        let predicateValue;

        proposition.values.forEach((propositionValue) => {
            try {
                if(eval("(" + condition.predicate + ")(propositionValue)")) {
                    predicateValue = propositionValue;
                }
            }
            catch (e) {
                predicateValue = condition.predicate;
            }
        });

        return predicateValue;
    }

    _onEditProposedValue(overlayTitle) {
        this.setState({
            hintText: '',
            proposedValue: overlayTitle
        });
    }

    _onUpdatePredicateValue(condition, proposition, overlayTitle) {
        this.props.updatePredicate({
            condition: condition,
            proposition: proposition,
            currentProposedValue: this._getPredicateValue(condition, proposition),
            proposedValue: overlayTitle || ' ',
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

    _onDeleteCondition(condition) {
        this.props.deleteCondition({
            condition: condition,
        })
    }

    _renderRows() {
        return this.props.imageTape.model.transitions.map((transition) => {
            if(transition.imageId == this.props.imageTape.predicateSelectedImage) {

                if(!transition.conditions.length) {return}

                return transition.conditions.map((condition) => {
                    if(condition.predicate && condition.targetImageId) {
                        return (
                            <GridList cols={3} cellHeight={'auto'}>
                                <TextField
                                    id={this._getUnique()}
                                    style={styles.textColumnWidth}
                                    value={condition.predicate}
                                    onChange={event => this._onUpdatePredicateValue(condition, event.target.value)}
                                />
                                <ListItem
                                    style={styles.iconColumnWidth}
                                    value={condition.predicate}
                                    primaryText={condition.predicate}
                                    leftAvatar={<Avatar src={this._getAvatarSrc(condition.targetImageId)} />}
                                />
                                <Delete onTouchTap={(e)=>this._onDeleteCondition(condition)} />
                            </GridList>
                        )
                    }
                });
            }
        });
    }

    renderRows() {
        return this.props.imageTape.model.transitions.map((transition) => {
            if(transition.imageId == this.props.imageTape.predicateSelectedImage) {

                if(!transition.conditions.length) {return}

                return transition.conditions.map((condition) => {
                    if(condition.predicate && condition.targetImageId) {
                        return (
                            <TableRow>
                                <TableRowColumn style={styles.textColumnWidth}>
                                    <TextField
                                        id={this._getUnique()}
                                        style={styles.textColumnWidth}
                                        value={this._getPredicateValue(condition, transition.proposition)}
                                        onChange={event => this._onUpdatePredicateValue(condition, transition.proposition, event.target.value)}
                                    />
                                </TableRowColumn>
                                <TableRowColumn style={styles.iconColumnWidth}>
                                    <ListItem
                                        style={styles.iconColumnWidth}
                                        value={this._getPredicateValue(condition, transition.proposition)}
                                        primaryText={this._getPredicateValue(condition, transition.proposition)}
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

    render() {
        return (
            <Tabs
                style={styles.tabsPadding}
                value={this.state.value}
                onChange={this.handleChange}
            >
                <Tab label="FIXED CHOICE" value="FIXED_CHOICE">

                        {this.renderRows()}

                        <GridList style={styles.gridList} cols={2}>
                            <TextField
                                id={this._getUnique()}
                                hintText={this.state.hintText}
                                value={this.state.proposedValue}
                                onChange={event => this._onEditProposedValue(event.target.value)}
                            />
                            <TargetImageSelectableList />
                        </GridList>
                </Tab>
                <Tab label="ANY STRING" value="ANY_STRING">
                    <div>
                        <h2 style={styles.headline}>Controllable Tab ANY_STRING</h2>
                        <p>
                            This is another example of a controllable tab. Remember, if you
                            use controllable Tabs, you need to give all of your tabs values or else
                            you wont be able to select them.
                        </p>
                    </div>
                </Tab>
                <Tab label="ANY NUMBER" value="ANY_NUMBER">
                    <div>
                        <h2 style={styles.headline}>Controllable Tab ANY_NUMBER</h2>
                        <p>
                            This is another example of a controllable tab. Remember, if you
                            use controllable Tabs, you need to give all of your tabs values or else
                            you wont be able to select them.
                        </p>
                    </div>
                </Tab>
                <Tab label="ANY INTEGER" value="ANY_INTEGER">
                    <div>
                        <h2 style={styles.headline}>Controllable Tab ANY_INTEGER</h2>
                        <p>
                            This is another example of a controllable tab. Remember, if you
                            use controllable Tabs, you need to give all of your tabs values or else
                            you wont be able to select them.
                        </p>
                    </div>
                </Tab>
                <Tab label="TRUE FALSE" value="TRUE_FALSE">
                    <div>
                        <h2 style={styles.headline}>Controllable Tab TRUE_FALSE</h2>
                        <p>
                            This is another example of a controllable tab. Remember, if you
                            use controllable Tabs, you need to give all of your tabs values or else
                            you wont be able to select them.
                        </p>
                    </div>
                </Tab>
            </Tabs>
        );
    }
    _render() {
        return (
            <Tabs
                value={this.state.value}
                onChange={this.handleChange}
            >
                <Tab label="FIXED CHOICE" value="FIXED_CHOICE">
                    <div style={styles.predicate}>
                        <Table>
                            <TableBody displayRowCheckbox={this.state.showCheckboxes}>
                                {this.renderRows()}
                            </TableBody>
                        </Table>
                        <GridList style={styles.gridList} cols={2}>
                            <TextField
                                id={this._getUnique()}
                                hintText={this.state.hintText}
                                value={this.state.proposedValue}
                                onChange={event => this._onEditProposedValue(event.target.value)}
                            />
                            <TargetImageSelectableList />
                        </GridList>
                    </div>
                </Tab>
                <Tab label="ANY STRING" value="ANY_STRING">
                    <div>
                        <h2 style={styles.headline}>Controllable Tab ANY_STRING</h2>
                        <p>
                            This is another example of a controllable tab. Remember, if you
                            use controllable Tabs, you need to give all of your tabs values or else
                            you wont be able to select them.
                        </p>
                    </div>
                </Tab>
                <Tab label="ANY NUMBER" value="ANY_NUMBER">
                    <div>
                        <h2 style={styles.headline}>Controllable Tab ANY_NUMBER</h2>
                        <p>
                            This is another example of a controllable tab. Remember, if you
                            use controllable Tabs, you need to give all of your tabs values or else
                            you wont be able to select them.
                        </p>
                    </div>
                </Tab>
                <Tab label="ANY INTEGER" value="ANY_INTEGER">
                    <div>
                        <h2 style={styles.headline}>Controllable Tab ANY_INTEGER</h2>
                        <p>
                            This is another example of a controllable tab. Remember, if you
                            use controllable Tabs, you need to give all of your tabs values or else
                            you wont be able to select them.
                        </p>
                    </div>
                </Tab>
                <Tab label="TRUE FALSE" value="TRUE_FALSE">
                    <div>
                        <h2 style={styles.headline}>Controllable Tab TRUE_FALSE</h2>
                        <p>
                            This is another example of a controllable tab. Remember, if you
                            use controllable Tabs, you need to give all of your tabs values or else
                            you wont be able to select them.
                        </p>
                    </div>
                </Tab>
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
        addPredicate: addPredicate,
        updatePredicate: updatePredicate,
        deleteCondition: deleteCondition,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TabsExampleControlled);
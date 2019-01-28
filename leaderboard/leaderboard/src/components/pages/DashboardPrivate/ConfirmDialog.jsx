import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import { Grid } from '@material-ui/core';

const styles = {
    tableActionButton: {
        width: 40,
        height: 40,
        marginLeft: 5,
        marginRight: 5,
    },

    tableActionButtonIcon: {
        width: "20px",
        height: "20px"
    },
    icon: {
        backgroundColor: "transparent",
        // color: dangerColor,
        boxShadow: "none"
    },
    title: {
        '& h2': {
          fontSize:20
        }
    },
    content: {
        fontSize:15
    },
    button: {
        fontSize:13
    }
};

class ConfirmDialog extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOK = () => {
        this.setState({ open: false });
        this.props.onDelete(this.props.index);
    };

    render() {
        const { classes } = this.props;
        return (
            <Grid >
                <IconButton
                    color="secondary"
                    aria-label="Delete"
                    className={classes.tableActionButton}
                    onClick={this.handleClickOpen}>
                    <Delete
                        className={
                            classes.tableActionButtonIcon + " " + classes.icon
                        }/>
                </IconButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="dialog-title"
                    aria-describedby="dialog-description">
                    <DialogTitle id="dialog-title" className={classes.title}>{"Confirm"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="dialog-description" className={classes.content}>
                            Are you sure to delete this file?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" className={classes.button}>
                            No
                        </Button>
                        <Button onClick={this.handleOK} color="primary" autoFocus className={classes.button}>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        );
    }
}

// export default ConfirmDialog;
  
ConfirmDialog.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ConfirmDialog);
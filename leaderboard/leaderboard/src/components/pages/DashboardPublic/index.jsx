import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// core components
import GridItem from "../../views/GridItem";
import GridContainer from "../../views/GridContainer";
import Table from "../../views/Table";
import Card from "../../views/Card";
import CardHeader from "../../views/CardHeader";
import CardBody from "../../views/CardBody";
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import CloudDownloadOutlined from '@material-ui/icons/CloudDownloadOutlined';
import Typography from '@material-ui/core/Typography';
import { Grid } from "@material-ui/core";
import { withSnackbar } from 'notistack';
import moment from 'moment-timezone'
import { styles } from './styles';
import player from '../../../assets/player.jpg';
import RemoveButton from './ConfirmDialog'
import Apis from '../../../utils/Apis'

class DashboardPublic extends Component {

    state = {
        user_id: '',
        user_email: '',
        user_full_name: '',
        user_score: 0,
        user_joined: '',
        totalCount: 0,
        pageNumber: 1,
        myscore: '100',
        users: [],
        matchStatus: [],
        isLoading: true,
    }

    componentWillMount() {
        //get user info from local
        let user_id = localStorage.getItem('user_id');
        let user_email = localStorage.getItem('user_email');
        let user_full_name = localStorage.getItem('user_full_name');
        let user_score = localStorage.getItem('user_score');
        let user_joined = localStorage.getItem('user_joined');
        this.setState({
            user_id,
            user_email,
            user_full_name,
            user_score,
            user_joined,
            joined: (user_joined == 0) ? false : true
        })

        const { pageNumber } = this.state;
        this.getDocuments(pageNumber);
    }
    //get players
    getDocuments = async (pageNumber) => {
        const { classes } = this.props;
        this.setState({ isLoading: true });
        try {
            let response = await Apis.getAllUsers();
            console.log("getAllUsers", response);

            let respUsers = response.data;
            let users = [];
            let status = [];
            if (respUsers != undefined && respUsers != null) {
                let sorted_respUsers = respUsers.sort((a, b) => {
                    return b.score - a.score
                });
                for (let i = 0; i < sorted_respUsers.length; i++) {
                    status.push(i)
                    let user = sorted_respUsers[i]
                    let name = user.full_name;
                    let score = user.score;
                    users = [...users,
                    [
                        <img style={{ width: 30, height: 30 }} src={player} />,
                        <Typography noWrap className={classes.typographyContent}>{name}</Typography>
                    ]
                    ];
                }
                this.setState({ pageNumber: pageNumber, totalCount:  respUsers.length, users: users, isLoading: false, matchStatus: status })
            }
            else {
                this.setState({ pageNumber: pageNumber, totalCount: 0, users: users, isLoading: false })
            }
        }
        catch (error) {
            this.setState({ isLoading: false });
            let messageProperty = Object.getOwnPropertyDescriptor(error, 'message');

            this.props.enqueueSnackbar(messageProperty.value, {
                variant: 'error',
            });
        }
    }
    //return button view
    viewButton = (id, url) => {
        const { classes } = this.props;
        let matchStatus = this.state.matchStatus
        let value = matchStatus[id];
        matchStatus[id] = (value === 0)?1:0;
        value = matchStatus[id];
        return (
                <Button color="secondary" className={classes.viewButton} disableRipple disableFocusRipple onClick={(id) => this.onActionMatch(id)} >
                    {(value ===0)?'Start match':'End match'}
                </Button>
        );
    }
    //return view
    operationView = (id, index, url) => {
        return (
            <Grid container>
                {this.viewButton(id, url)}
            </Grid>
        )
    }
    // action pagination
    handleChangePage = (event, page) => {
        this.getDocuments(page + 1);
    }
    //action logout
    onActionLogoutButton = () => {
        this.props.history.push("login");
    }

    render() {
        const { classes } = this.props;
        const { totalCount, pageNumber, users, isLoading, user_full_name } = this.state;
        return (
            <GridContainer>
                    <h1 className={classes.title}>{" "}</h1>
                    <h1 className={classes.title}>{" "}</h1>
                    <h2 className={classes.title}>{user_full_name}</h2>
                <Button variant="contained" className={classes.joinButton} onClick={() => this.onActionLogoutButton()}>
                    Logout
                </Button>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="secondary">
                            <h4 className={classes.cardTitleWhite}>Players</h4>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="black"
                                tableHead={["", <b>NAME</b>]}
                                tableData={users}
                                handleChangePage={this.handleChangePage}
                                totalCount={totalCount}
                                rowsPerPage={10}
                                page={pageNumber}
                                isLoading={isLoading}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

DashboardPublic.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withSnackbar(DashboardPublic));
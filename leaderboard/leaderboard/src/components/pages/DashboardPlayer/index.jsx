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
import Typography from '@material-ui/core/Typography';
import { Grid } from "@material-ui/core";
import { withSnackbar } from 'notistack';
import { styles } from './styles';
import player from '../../../assets/player.jpg';
import Apis from '../../../utils/Apis'

class DashboardPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            user_email: '',
            user_full_name: '',
            user_score: 0,
            user_joined: '',
            totalCount: 0,
            pageNumber: 1,
            myscore: '100',
            joinUsers: [],
            matchStatus: [],
            isLoading: true,
            joined: false,
            myname: 'Li X',
            intervalId: 0
        }
    }


    componentWillMount() {
        //Get user info from local storage
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
    componentDidMount() {
        var intervalId = setInterval(this.timer, 3000);
        // store intervalId in the state so it can be accessed later:
        this.setState({ intervalId: intervalId });
    }
    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
    }
    timer = () => {
        // setState method is used to update the state
        // this.setState({ currentCount: this.state.currentCount - 1 });
        this.getMyscore();
        this.getDocuments();
        console.log("timer triggerd - - - ")

    }

    getDocuments = async (pageNumber) => {
        const { classes } = this.props;
        this.setState({ isLoading: true });
        try {
            let response = await Apis.getJoinedUsers();
            console.log("getJoinedUsers", response);

            let resJoinUsers = response.data;
            let joinUsers = [];
            var status = [];
            if (resJoinUsers != undefined && resJoinUsers != null) {
                for (let i = 0; i < resJoinUsers.length; i++) {
                    status[i] = 0;
                    joinUsers = [...joinUsers,
                    [
                        <img style={{ width: 30, height: 30 }} src={player} />,
                        <Typography noWrap className={classes.typographyContent}>{resJoinUsers[i].full_name}</Typography>,
                        <Typography noWrap className={classes.typographyContent}>{resJoinUsers[i].score}</Typography>,
                    ]
                    ];
                }
                this.setState({ pageNumber: pageNumber, totalCount: resJoinUsers.length, joinUsers: joinUsers, isLoading: false, matchStatus: status })
            }
            else {
                this.setState({ pageNumber: pageNumber, totalCount: 0, joinUsers: joinUsers, isLoading: false })
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
    // return view button
    viewButton = (id, url) => {
        const { classes } = this.props;
        let matchStatus = this.state.matchStatus;
        let value = matchStatus[id];
        return (
            <Button color="secondary" className={classes.viewButton} disableRipple disableFocusRipple onClick={() => this.onActionMatch(id)} >
                {(value === 0) ? 'Start match' : 'End match'}
            </Button>
        );
    }
    onActionMatch = (id) => {
        let matchStatus = this.state.matchStatus
        let value = matchStatus[id];
        matchStatus[id] = (value === 0) ? 1 : 0;
    }
    operationView = (id, index, url) => {
        return (
            <Grid container>
                {this.viewButton(id, url)}
            </Grid>
        )
    }
    // action for pagination
    handleChangePage = (event, page) => {
        this.getDocuments(page + 1);
    }
    // action join button
    onActionJoinButton = () => {
        let joined = this.state.joined;
        let id = this.state.user_id;
        if (joined) return;
        Apis.joinin(id)
            .then(res => {
                this.setState({
                    joined: true,
                    user_joined: 1
                });
                localStorage.setItem('user_joined', 1);
            })
            .catch(err => {
                this.setState({ joined: false });
                this.props.onAlertMessage("error", "Joinin failed");
            })
    }
    // action logout
    onActionLogoutButton = () => {
        
        this.props.history.push("login");
    }
    onActionLeaderButton = () => {
        this.props.history.push("leaderboard");
    }
    // get my score
    getMyscore = () => {
        let user_id = localStorage.getItem('user_id');
        Apis.getUserScore(user_id)
            .then(res => {
                let user = res.data;
                let user_score = user.score;
                this.setState({ user_score: user_score });
                localStorage.setItem('user_score', user_score);
            })
            .catch(err => {
            })
    }

    render() {
        const { classes } = this.props;
        const { totalCount, pageNumber, joinUsers, isLoading, user_score, joined, user_full_name } = this.state;
        return (
            <GridContainer>
                <h1 className={classes.title}>{"My score: "}</h1>
                <h1 className={classes.title}>{user_score}</h1>
                <div>
                    <Button variant="contained" color="primary" disabled={joined} className={classes.joinButton} onClick={() => this.onActionJoinButton()}>
                        {joined ? 'Joined' : 'Join to'}
                    </Button>
                    <Button variant="contained" className={classes.joinButton} onClick={() => this.onActionLogoutButton()}>
                        Logout
                    </Button>
                </div>
                <h2 className={classes.title}>{user_full_name}</h2>
                <Button variant="contained" color='secondary' className={classes.joinButton} onClick={() => this.onActionLeaderButton()}>
                    Leaderboard
                    </Button>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="secondary">
                            <h4 className={classes.cardTitleWhite}>Players</h4>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="black"
                                tableHead={["", <b>NAME</b>, <b>SCORE</b>]}
                                tableData={joinUsers}
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

DashboardPlayer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withSnackbar(DashboardPlayer));
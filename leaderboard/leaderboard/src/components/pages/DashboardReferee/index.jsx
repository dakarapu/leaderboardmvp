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

class DashboardReferee extends Component {

    state = {
        user_id: '',
        user_email: '',
        user_full_name: '',
        user_score: 0,
        user_joined: '',
        totalCount: 0,
        pageNumber: 1,
        myscore: '100',
        matches: [],
        matchStatus: [],
        isLoading: true,
    }

    componentWillMount() {
        const { pageNumber } = this.state;
        //get user info
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

        this.getDocuments(pageNumber);
    }

    //get matches
    getDocuments = async (pageNumber) => {
        const { classes } = this.props;
        this.setState({ isLoading: true });
        try {
            let response = await Apis.getMatches();

            let respMatches = response.data;
            let matches = [];
            if (respMatches != undefined && respMatches != null) {
                let length = respMatches.length;
                for (let i = 0; i < length; i++) {

                    let match_id = respMatches[i]._id;
                    let player1_id = respMatches[i].player1_id
                    let player1_email = respMatches[i].player1_email
                    let player1_name = respMatches[i].player1_name
                    let player1_score = respMatches[i].player1_score
                    let player2_id = respMatches[i].player2_id
                    let player2_email = respMatches[i].player2_email
                    let player2_name = respMatches[i].player2_name
                    let player2_score = respMatches[i].player2_score
                    let status = respMatches[i].status
                    matches = [...matches,
                    [

                        <Typography noWrap className={classes.typographyContent}>{player1_name}{' vs '}{player2_name}</Typography>,
                        <Typography noWrap className={classes.typographyContent}>{player1_name}{' Score: '}{player1_score}</Typography>,
                        <Typography noWrap className={classes.typographyContent}>{player2_name}{' Score: '}{player2_score}</Typography>,
                        this.operationViewWin1(player1_id, player1_email, player1_name, player1_score, player2_id, player2_email, player2_name, player2_score, match_id, status),
                        this.operationViewWin2(player1_id, player1_email, player1_name, player1_score, player2_id, player2_email, player2_name, player2_score, match_id, status),
                        this.operationViewDraw(player1_id, player1_email, player1_name, player1_score, player2_id, player2_email, player2_name, player2_score, match_id, status),
                        this.operationViewReset(match_id, status),
                        this.operationViewFinish(match_id)
                    ]
                    ];

                }
                this.setState({ pageNumber: pageNumber, totalCount: length, matches: matches, isLoading: false })
            }
            else {
                this.setState({ pageNumber: pageNumber, totalCount: 0, matches: matches, isLoading: false })
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

    viewButtonWin1 = (player1_id, player1_email, player1_name, player1_score, player2_id, player2_email, player2_name, player2_score, match_id, status) => {
        const { classes } = this.props;
        return (
            <Button color="secondary" disabled={status} className={classes.viewButton} disableRipple disableFocusRipple onClick={() => this.onActionMatchWin1(player1_id, player1_email, player1_name, player1_score, player2_id, player2_email, player2_name, player2_score, match_id)} >
                {player1_name}{' WIN'}
            </Button>
        );
    }
    viewButtonWin2 = (player1_id, player1_email, player1_name, player1_score, player2_id, player2_email, player2_name, player2_score, match_id, status) => {
        const { classes } = this.props;
        return (
            <Button color="secondary" disabled={status} className={classes.viewButton} disableRipple disableFocusRipple onClick={() => this.onActionMatchWin2(player1_id, player1_email, player1_name, player1_score, player2_id, player2_email, player2_name, player2_score, match_id)} >
                {player2_name}{' WIN'}
            </Button>
        );
    }
    viewButtonDraw = (player1_id, player1_email, player1_name, player1_score, player2_id, player2_email, player2_name, player2_score, match_id, status) => {
        const { classes } = this.props;
        return (
            <Button color="secondary" disabled={status} className={classes.viewButton} disableRipple disableFocusRipple onClick={() => this.onActionMatchDraw(player1_id, player1_email, player1_name, player1_score, player2_id, player2_email, player2_name, player2_score, match_id)} >
                {'DRAW'}
            </Button>
        );
    }
    viewButtonReset = (match_id, status) => {
        const { classes } = this.props;
        return (
            <Button color="secondary" disabled={!status} className={classes.viewButton} disableRipple disableFocusRipple onClick={() => this.onActionMatchReset(match_id)} >
                {'RESET'}
            </Button>
        );
    }
    viewButtonFinish = (match_id) => {
        const { classes } = this.props;
        return (
            <Button color="secondary" className={classes.viewButton} disableRipple disableFocusRipple onClick={(id) => this.onActionMatchFinish(match_id)} >
                {'Finish Match'}
            </Button>
        );
    }
    onActionMatchReset = (match_id) => {

        Apis.resetMatch(match_id)
            .then(res => {
                this.getDocuments();
            })
            .catch(err => {
            })
    }
    onActionMatchFinish = (match_id) => {

        Apis.finishMatch(match_id)
            .then(res => {
                this.getDocuments();
            })
            .catch(err => {
            })
    }
    onActionMatchWin1 = (player1_id, player1_email, player1_name, player1_score, player2_id, player2_email, player2_name, player2_score, match_id, status) => {
        let match = {};
        match.match_id = match_id;
        match.player1_id = player1_id;
        match.player1_email = player1_email;
        match.player1_score = player1_score;
        match.player2_id = player2_id;
        match.player2_email = player2_email;
        match.player2_score = player2_score;
        match.win_player_email = player1_email;

        Apis.updateScore(match)
            .then(res => {
                this.getDocuments();
            })
            .catch(err => {
            })

    }
    onActionMatchWin2 = (player1_id, player1_email, player1_name, player1_score, player2_id, player2_email, player2_name, player2_score, match_id, status) => {

        let match = {};
        match.match_id = match_id;
        match.player1_id = player1_id;
        match.player1_email = player1_email;
        match.player1_score = player1_score;
        match.player2_id = player2_id;
        match.player2_email = player2_email;
        match.player2_score = player2_score;
        match.win_player_email = player2_email;

        Apis.updateScore(match)
            .then(res => {
                this.getDocuments();
            })
            .catch(err => {
            })

    }
    onActionMatchDraw = (player1_id, player1_email, player1_name, player1_score, player2_id, player2_email, player2_name, player2_score, match_id, status) => {

        let match = {};
        match.match_id = match_id;
        match.player1_id = player1_id;
        match.player1_email = player1_email;
        match.player1_score = player1_score;
        match.player2_id = player2_id;
        match.player2_email = player2_email;
        match.player2_score = player2_score;
        match.win_player_email = 'draw';

        Apis.updateScore(match)
            .then(res => {
                this.getDocuments();
            })
            .catch(err => {
            })
    }
    operationViewWin1 = (player1_id, player1_email, player1_name, player1_score, player2_id, player2_email, player2_name, player2_score, match_id, status) => {
        return (
            <Grid container>
                {this.viewButtonWin1(player1_id, player1_email, player1_name, player1_score, player2_id, player2_email, player2_name, player2_score, match_id, status)}
            </Grid>
        )
    }
    operationViewWin2 = (player1_id, player1_email, player1_name, player1_score, player2_id, player2_email, player2_name, player2_score, match_id, status) => {
        return (
            <Grid container>
                {this.viewButtonWin2(player1_id, player1_email, player1_name, player1_score, player2_id, player2_email, player2_name, player2_score, match_id, status)}
            </Grid>
        )
    }
    operationViewDraw = (player1_id, player1_email, player1_name, player1_score, player2_id, player2_email, player2_name, player2_score, match_id, status) => {
        return (
            <Grid container>
                {this.viewButtonDraw(player1_id, player1_email, player1_name, player1_score, player2_id, player2_email, player2_name, player2_score, match_id, status)}
            </Grid>
        )
    }
    operationViewReset = (match_id, status) => {
        return (
            <Grid container>
                {this.viewButtonReset(match_id, status)}
            </Grid>
        )
    }
    operationViewFinish = (match_id) => {
        return (
            <Grid container>
                {this.viewButtonFinish(match_id)}
            </Grid>
        )
    }
    operationViewLoss = (id, index, url) => {
        return (
            <Grid container>
                {this.viewButtonLoss(id, url)}
            </Grid>
        )
    }
    handleChangePage = (event, page) => {
        this.getDocuments(page + 1);
    }

    onActionLeaderButton = () => {
        this.props.history.push("leaderboard");
    }
    onActionLogoutButton = () => {
        this.props.history.push("login");
    }

    render() {
        const { classes } = this.props;
        const { totalCount, pageNumber, matches, isLoading, user_full_name } = this.state;
        return (
            <GridContainer>
                <h1 className={classes.title}>{" "}</h1>
                <h1 className={classes.title}>{""}</h1>
                <h2 className={classes.title}>{user_full_name}</h2>
                <Button variant="contained" className={classes.joinButton} onClick={() => this.onActionLogoutButton()}>
                    Logout
                </Button>

                <Button variant="contained" color='secondary' className={classes.joinButton} onClick={() => this.onActionLeaderButton()}>
                    Leaderboard
                </Button>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="secondary">
                            <h4 className={classes.cardTitleWhite}>Matches</h4>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="black"
                                tableHead={[<b>Matches</b>, "", "", "", "", "", "", ""]}
                                tableData={matches}
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

DashboardReferee.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withSnackbar(DashboardReferee));
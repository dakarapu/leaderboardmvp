import red from '@material-ui/core/colors/red';
export const styles = theme => ({
    title: {
        '& h2': {
          fontSize:20
        }
    },
    main_container: {
        minWidth: 400
    },
    formControl: {
        margin: theme.spacing.unit
    },
    inputlabel: {
      fontSize: 18,
    },
    inputbaseRoot: {
        'label + &': {
            marginTop: theme.spacing.unit * 3,
        },
    },
    inputbaseInput: {
        // borderRadius: 4,
        // border: '1px solid #ced4da',
        height:24,
        backgroundColor: theme.palette.common.white,
        fontSize: 16,
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(',')
    },
    btnNewAccount: {
        marginLeft: theme.spacing.unit + 20,
        marginRight: theme.spacing.unit + 20,
        marginBottom: 15,
        // marginTop: -5,
        fontSize: 15,
        textTransform: 'none',
    },
    wrapper: {
        margin: theme.spacing.unit,
      //   backgroundColor:'#f00',
        position: 'relative',
    },
    buttonProgress: {
        color: red[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});
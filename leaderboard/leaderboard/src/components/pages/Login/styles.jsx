import red from '@material-ui/core/colors/red';
export const styles = theme => ({
    root: {
        height:"100vh"
    },
    logo_container: {
        flex: 1
    },
    login_container: {
        flex: 1,
    },
    img: {
      margin: 'auto',
      display: 'block',
      width: '50%',
      height: 'auto',
    },
    card: {
        width: '100%'
    },
    main_container: {
        height:'100%'
    },
    title: {
        marginLeft:5, 
        marginBottom:20
    },
    main_subcontainer: {
        maxWidth:400,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
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
        ].join(','),
    },
    btnForgetPasssword: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: -5,
        width:130,
        fontSize: 12,
        textTransform: 'none',
    },
    btnSignIn: {
        fontSize: 15,
        textTransform: 'none'
    },
    btnFocusColor: {

    },
    containerSignIn: {
        marginTop:5,
    },
    lblNewAccount: {
        fontSize: 13,
    },
    btnNewAccount: {
        paddingHorizontal: 5,
        margin: 0,
        fontSize: 12,
    },
    wrapper: {
      margin: theme.spacing.unit,
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
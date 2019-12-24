export default {
    container: {
        flex: 1,
        backgroundColor: '#f1c40f',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    toolContainer: {
        backgroundColor: '#34495e',
        height: 1000,
        alignItems: 'center',
        flexDirection: 'column',
        alignContent: 'space-between',
        //backgroundColor: '#fcfcfc', //remove
    },
    controlContainer: {
        alignItems: 'center',
        paddingTop: 10,
        marginHorizontal: 10,
    },
    welcomeImage: {
        width: 200,
        height: 120,
        resizeMode: 'contain',
        marginLeft: -10,
    },
    title: {
        fontSize: 30,
        fontFamily: 'Avenir',
        color: '#34495e',
    },
    subTitle: {
        fontSize: 20,
        fontFamily: 'Avenir-Medium',
        color: '#f1c40f',
    },
    smallLabel: {
        fontSize: 16,
        fontFamily: 'Avenir-Medium',
        color: '#e67e22',
        alignSelf: 'center',
        marginTop: 5,
    },
    sliderContainer: {
        width: 150,
    },
    centeredRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    individualLoopControls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    looperButtons: {
        flexDirection: 'column',
        height: '100%',
        alignItems: 'flex-end',
        // alignSelf: 'flex-end',
    },
    mainButtonContainer: {
        alignSelf: 'flex-end',
    },
};

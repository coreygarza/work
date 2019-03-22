import React, {Fragment} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col,
    Card, CardBody
} from 'reactstrap';
import ReactTable from "react-table";
import {makeData} from "./utils";

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../reducers/Bookings/Booking.actions';
import {withRouter} from 'react-router-dom'
import moment from "moment/moment";

class DayComponentTable extends React.Component {
    constructor() {
        super();
        this.state = {
            // data: makeData()
            capacity:null,
        };
    }
    componentWillMount(){
        this.props.getallspecailist();
    }
    componentDidUpdate(prevProps,prevState){
        if(JSON.stringify(this.props.specialist)!== JSON.stringify(prevProps.specialist)){
            let getallspecitem =[];
            let caplist =[];
            if(this.props.specialist && this.props.specialist !== null){
                this.props.specialist.map((spitem)=>{
                    if(this.props.specialistitems && this.props.specialistitems !== null){
                        getallspecitem = this.props.specialistitems.filter((item)=>item.specialist===spitem.id.toString() && moment((item.bookingdate).split(`"`)[1]).format('DD-MM-YYYY')===moment().format('DD-MM-YYYY'))
                        console.log("lenght====",getallspecitem.length);
                        let miditem ={};
                        miditem.id = spitem.id;
                        miditem.capacity = getallspecitem.length+"/"+spitem.capacity;
                        miditem.name = spitem.name;
                        caplist.push(miditem);
                    }

                });
            }
            this.setState({capacity:caplist});
        }
    }
    componentDidMount(){
        let getallspecitem =[];
        let caplist =[];
        console.log("kkk");
        console.log("this.props.specialist",this.props.specialist);
        if(this.props.specialist === null){
            this.props.getallspecailist();
        }
        if(this.props.specialist && this.props.specialist !== null){
            this.props.specialist.map((spitem)=>{
                if(this.props.specialistitems && this.props.specialistitems !== null){
                    getallspecitem = this.props.specialistitems.filter((item)=>item.specialist===spitem.id.toString() && moment((item.bookingdate).split(`"`)[1]).format('DD-MM-YYYY')===moment().format('DD-MM-YYYY'))
                    console.log("lenght====",getallspecitem.length);
                    let miditem ={};
                    miditem.id = spitem.id;
                    miditem.capacity = getallspecitem.length+"/"+spitem.capacity;
                    miditem.name = spitem.name;
                    caplist.push(miditem);
                }

            });
        }
        this.setState({capacity:caplist});
    }
    render() {
        let data =[];
        if(this.props.specialist && this.props.specialist !== null){
            data = this.props.specialist;
        }
        if(this.state.caplist && this.state.caplist !== null){
            // data = this.state.caplist;
        }

        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>

                    <Row>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <CardBody className="co_day_header">
                                    <ReactTable
                                        data={data}
                                        columns={[{
                                            columns: [
                                                {
                                                    Header: 'Rooms',
                                                    accessor: 'name',
                                                    Cell: row =>(
                                                        <div>{row.value}</div>
                                                    )
                                                },
                                                {
                                                    Header: '',
                                                    accessor: 'capacity',
                                                    className:'co_day_table',
                                                    Cell: row =>{
                                                        let midcap = null;
                                                        let allcap ="";
                                                        if(this.state.capacity !== null){
                                                            midcap = this.state.capacity.filter((item)=>item.id === row.original.id);
                                                            if(midcap && midcap !== null && midcap.length){
                                                                allcap = midcap[0].capacity;
                                                            }
                                                        }
                                                        return (
                                                            <div className="widget-content p-0">
                                                                <div className= "widget-heading">
                                                                    {allcap}
                                                                </div>
                                                                <div className="widget-subheading opacity-10">
                                                                    <span className="pr-2">

                                                                    </span>
                                                                </div>
                                                            </div>
                                                    )
                                                    }
                                                }
                                            ]
                                        }]}
                                        defaultPageSize={7}
                                        className="-striped -highlight"
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        addeNewBooking              : Actions.addeNewBooking,
        getallBookinglist           : Actions.getallBookinglist,
        getallattorneylist          : Actions.getallattorneylist,
        getallarealist              : Actions.getallarealist,
        getallspecailist              : Actions.getallspecailist,
    }, dispatch);
}

function mapStateToProps({Bookings})
{
    return {
        bookinglist             : Bookings.bookinglist,
        booking                 : Bookings,
        attorneylist            : Bookings.attorneylist,
        arealist                : Bookings.arealist,
        specialist              : Bookings.specialist,
        specialistitems         : Bookings.specialistitems,
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(DayComponentTable);
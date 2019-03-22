import React, {Fragment,Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {
    Row, Col,
    Card, CardBody,Button, ButtonGroup,
    UncontrolledButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle
} from 'reactstrap';

import ReactTable from "react-table";
import PageTitle from '../Layout/AppMain/PageTitle';

import avatar2 from '../assets/utils/images/avatars/2.jpg';

import {makeData} from "./Tables/DataTables/Examples/utils";


import {connect} from "react-redux";
import * as Actions from "../reducers/Bookings/Booking.actions";
import {bindActionCreators} from "redux";
import axios from 'axios';
import moment from 'moment';


class AttendanceForm extends Component {
    constructor() {
        super();
        this.state = {
            // data: makeData(),
            data: null,
            bookinglist:{}
        };

    }
    componentWillMount(){
        this.props.getallBookinglist();
    }
    componentDidMount(){

        let bookinglist = this.props.bookinglist;
        if(bookinglist && bookinglist !==null){
            this.setState({data: bookinglist});
        }
    }
    componentDidUpdate(prevProps,prevState){
        if(this.props.bookinglist && JSON.stringify(this.props.bookinglist) !== JSON.stringify(prevProps.bookinglist)){
            this.setState({data: this.props.bookinglist});
        }
    }
    attendance=(original,flage)=>{
        let miditem = original;
        let data = {};
        miditem.attendance = flage;
        if(miditem && miditem.id){
            this.props.updatebookingItem(miditem);
        }
    }
    render() {
        let getdata = this.state.data;
        let data = null;
        if(getdata !== null){
            data = getdata.filter((row)=>moment((row.date).split(`"`)[1]).format('DD-MM-YYYY') ===moment().format('DD-MM-YYYY'));
        }

        // const {data} = this.state;
        if(data && data !== null && data !== undefined && Object.keys(data).length !== 0)
        return (
            <Row>
                <Col md="12">
                    <Card className="main-card mb-3">
                        <CardBody>
                            {data && data !==null && (


                            <ReactTable
                                data={data}
                                columns={[{
                                    columns: [
                                        {
                                            Header: 'Surname',
                                            accessor: 'surname'
                                        },
                                        {
                                            Header: 'Initials',
                                            accessor: 'initials'
                                        },
                                        {
                                            Header: 'ID',
                                            accessor: 'id'
                                        },
                                        {
                                            Header: 'Attorney',
                                            accessor: 'attorney'
                                        },{
                                            Header: 'Attorney Ref',
                                            accessor: 'attorneyRef'
                                        },
                                        {
                                            Header: 'Confirm Attendance',
                                            accessor: '',
                                            Cell: ({ original }) => {
                                                return (
                                                    <ButtonGroup>
                                                        <Button className="btn-icon btn-shadow btn-dashed" style={{backgroundColor:original.attendance===true?'green':''}} outline
                                                                onClick={()=>{this.attendance(original,true)}}
                                                                color="success">
                                                            <i className="pe-7s-check btn-icon-wrapper"> </i>yes
                                                        </Button>
                                                        <Button className="btn-icon btn-shadow btn-dashed"  outline
                                                                style={{backgroundColor:original.attendance===false?'#f7b7cc':''}}
                                                                onClick={()=>{this.attendance(original,false)}}
                                                                color="danger">
                                                            <i className="pe-7s-check btn-icon-wrapper"> </i>No
                                                        </Button>
                                                    </ButtonGroup>

                                                );
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                                defaultPageSize={10}
                                className="-striped -highlight"
                            />
                            )}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
        else{
            return (<div/>)
        }
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        addeNewBooking              : Actions.addeNewBooking,
        getallBookinglist           : Actions.getallBookinglist,
        updatebookingItem           : Actions.updatebookingItem,
    }, dispatch);
}

function mapStateToProps({Bookings})
{
    return {
        bookinglist             : Bookings.bookinglist,
        booking                 : Bookings,
        updateitemstatus        : Bookings.updateitemstatus,
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(AttendanceForm);
import React, {Component, Fragment} from 'react'

import ReactTable from "react-table";

import {
    Row, Col,
    Card, CardBody,
} from 'reactstrap';
import PageTitle from '../Layout/AppMain/PageTitle';

import {makeData} from "./Tables/DataTables/Examples/utils";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Button} from 'reactstrap';
import moment from 'moment';

import * as Actions from "../reducers/Bookings/Booking.actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
class Bookings extends Component {
    constructor() {
        super();
        let data0 = makeData();
        let data = data0.map((d,index)=>{
            d.edit= false;
            return d;
        });
        this.state = {
            // data: data,
            tempdata:null,
        };

        this.renderEditable = this.renderEditable.bind(this);
    }
    componentDidMount(){

        let bookinglist = this.props.bookinglist;
        if(bookinglist && bookinglist !==null){
            // this.setState({data: bookinglist});
        }

        let temp =[];
        if(this.props.specialistitems && this.props.specialistitems !== null){
            this.props.specialistitems.map((item)=>{
                let m = this.props.bookinglist.filter((r)=>r.id.toString() ===item.bookingid);
                let mm ={};
                mm = {...m[0]};
                mm={...mm,...item};
                temp.push(mm);
            });
        }
        this.setState({data: temp});
    }
    componentDidUpdate(prevProps,prevState){
        if(this.props.bookinglist && JSON.stringify(this.props.bookinglist) !== JSON.stringify(prevProps.bookinglist)){
            // this.setState({data: this.props.bookinglist});
            let temp =[];
            if(this.props.specialistitems && this.props.specialistitems !== null){
                this.props.specialistitems.map((item)=>{
                    let m = this.props.bookinglist.filter((r)=>r.id.toString() ===item.bookingid);
                    let mm ={};
                    // console.log("m==",m);
                    mm = {...m[0]};
                    mm={...mm,...item};
                    temp.push(mm);
                });
            }
            this.setState({data: temp});
        }
    }
    componentWillMount(){
        this.props.getallBookinglist();
        this.props.getallspecailisttype();
    }
    renderEditable(cellInfo) {
        return (
            <div
                style={{backgroundColor: "#fafafa"}}
                contentEditable={cellInfo.original.edit}
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.data];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({data});
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.data[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

    onToggleRowEdit = (cell,id) =>{
        let data = [...this.state.data];
        data.forEach((d,index)=>{
            if(index!==cell.index)
                d.edit=false}
            );
        data[cell.index].edit = !data[cell.index].edit;
        this.setState({data});
        this.testsend(data,id);
    };
    testsend=(data,id)=>{
        let mm = null;
        data.map((item)=>{
            if(item.id ===id){
                mm = item;
                return;
            }
        });
        if(mm && mm !== null){
            this.props.updatebookingItem(mm);
        }
    }
    render() {
        const {data} = this.state;
        let temp =[];
        if(data && data.length ){
            // temp = data.filter((r)=>moment(r.date.split(`"`)[1]).format('DD-MM-YYYY')===moment().format('DD-MM-YYYY'));
            // console.log("temp",temp);
        }
        console.log("data=",data);
        if(data && data !== null && data !== undefined && Object.keys(data).length !== 0)
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <div>
                        <PageTitle
                            heading="Bookings"
                            // subheading="Choose between regular React Bootstrap tables or advanced dynamic ones."
                            icon="pe-7s-id icon-gradient bg-tempting-azure"
                        />
                    </div>
                    <Row>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    {data && data !== null && (


                                    <ReactTable
                                        data={data}
                                        columns={[
                                            {
                                                Header: "Attendance",
                                                accessor: "attendance",
                                                Cell: cell=>{
                                                    let m = "";
                                                    if(cell.original.attendance===true){
                                                        m = "Attended";
                                                    }
                                                    else if(cell.original.attendance===false){
                                                        m = "No Show";
                                                    }
                                                    return(<div>{m}</div>)
                                                }
                                            },
                                            {
                                                Header: "Surname",
                                                accessor: "surname",
                                                Cell: this.renderEditable
                                            },
                                            {
                                                Header: "Initials",
                                                accessor: "initials",
                                                Cell: this.renderEditable
                                            },
                                            {
                                                Header: "Specialist Type",
                                                accessor: "specialist_type",
                                                Cell: cell=>{
                                                    let specialistid = cell.original.specialistid;
                                                    let specialist = this.props.booking.specialist;
                                                    let specialisttype = this.props.booking.specialisttype;
                                                    let getmid = [];
                                                    if(specialist && specialist !== null && specialistid && specialistid !== null){
                                                        getmid = specialist.filter((row)=>row.id.toString()===specialistid);
                                                    }
                                                    let name = "";
                                                    let typeid ="";
                                                    let typename =null;
                                                    if (getmid && getmid.length){
                                                        name = getmid[0].name;
                                                        typeid =getmid[0].kind;
                                                        let mk = null;
                                                        if(specialisttype && specialisttype !== null){
                                                            mk = specialisttype.filter((r)=>r.id===typeid);
                                                            if(mk && mk.length){
                                                                typename = mk[0].name;
                                                            }
                                                        }
                                                    }
                                                    return(<div>{typename}</div>)
                                                }
                                            },
                                            {
                                                Header: "Specialist",
                                                accessor: "specialistid",
                                                Cell: cell=>{
                                                    let specialistid = cell.original.specialistid;
                                                    let specialist = this.props.booking.specialist;
                                                    let getmid = [];
                                                    if(specialist && specialist !== null && specialistid && specialistid !== null){
                                                        getmid = specialist.filter((row)=>row.id.toString()===specialistid);
                                                    }
                                                    let name = "";
                                                    if (getmid && getmid.length){
                                                        name = getmid[0].name;
                                                    }
                                                    return(<div>{name}</div>)
                                                }
                                            },
                                            // {
                                            //     Header: "Contact",
                                            //     accessor: "courtDate",
                                            //     Cell: cell=>{
                                            //         // console.log('row=',cell);
                                            //         let m = cell.original.courtDate;
                                            //         let mm =m.split(`"`);
                                            //         var date = moment().format('DD-MM-YYYY');
                                            //         if(mm.length && mm[1]){
                                            //             date = moment(mm[1]).format('DD-MM-YYYY');
                                            //         }
                                            //         return(<div>{date}</div>)
                                            //     }
                                            // },
                                            {
                                                Header: "Attorney",
                                                accessor: "attorney",
                                                Cell: this.renderEditable
                                            },
                                            {
                                                Header: "Attorney Ref",
                                                accessor: "attorneyRef",
                                                Cell: this.renderEditable
                                            },
                                            {
                                                Header: "Area",
                                                accessor: "location",
                                                Cell: this.renderEditable
                                            },
                                            {
                                                Header: "Report Due",
                                                accessor: "date",
                                                Cell: cell=>{
                                                    let m = cell.original.date;
                                                    if(m && m !== null && m.value !== ""){
                                                        let mm = m.split(`"`);
                                                        var date = moment().format('DD-MM-YYYY');

                                                        if(mm.length && mm[1]){
                                                            date = moment(mm[1]).format('DD-MM-YYYY');
                                                        }
                                                        return(<div>{date}</div>)
                                                    }
                                                    else{
                                                        return(<div></div>);
                                                    }

                                                }
                                            },
                                            {
                                                Header: "Edit",
                                                Cell: cell=>{
                                                    // console.log("cell",cell);
                                                    let icon = "pe-7s-pen"
                                                    if(cell.original.edit === true){
                                                        icon = "pe-7s-close-circle"
                                                        // console.log({icon});
                                                    }
                                                    return(<Button className="btn-icon btn-icon-only" color="link"
                                                    onClick={()=>this.onToggleRowEdit(cell,cell.original.id)}
                                                    >
                                                    <i className={`${icon} btn-icon-wrapper`}> </i>
                                                </Button>)}
                                            }
                                        ]}
                                        defaultPageSize={10}
                                        className="-striped -highlight"
                                    />
                                    )}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </ReactCSSTransitionGroup>
            </Fragment>
        );
        else{
            return(<div/>)
        }
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        addeNewBooking              : Actions.addeNewBooking,
        getallBookinglist           : Actions.getallBookinglist,
        updatebookingItem           : Actions.updatebookingItem,
        getallspecailisttype        : Actions.getallspecailisttype,
    }, dispatch);
}

function mapStateToProps({Bookings})
{
    return {
        bookinglist             : Bookings.bookinglist,
        booking                 : Bookings,
        specialistitems         : Bookings.specialistitems,
        specialisttype          : Bookings.specialisttype,
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Bookings);
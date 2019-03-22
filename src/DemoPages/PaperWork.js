import React, {Fragment} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {
    Row, Col,
    Card, CardBody,FormGroup,Form,Input,
    UncontrolledButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle
} from 'reactstrap';

import ReactTable from "react-table";
import PageTitle from '../Layout/AppMain/PageTitle';

import {connect} from "react-redux";
import * as Actions from "../reducers/Bookings/Booking.actions";
import {bindActionCreators} from "redux";
import axios from 'axios';


import avatar2 from '../assets/utils/images/avatars/2.jpg';

import {makeData} from "./Tables/DataTables/Examples/utils";
import moment from "moment/moment";

class PaperWork extends React.Component {
    constructor() {
        super();
        this.state = {
            // data: makeData()
        };

        this.renderEditableID = this.renderEditableID.bind(this);
    }
    componentWillMount(){
        this.props.getallBookinglist();
    }
    componentDidMount(){
        if(this.props.bookinglist && this.props.bookinglist !== null){
            this.setState({data: this.props.bookinglist});
        }
    }
    componentDidUpdate(prevProps,prevState){
        if(this.props.bookinglist && JSON.stringify(this.props.bookinglist) !== JSON.stringify(prevProps.bookinglist)){
            this.setState({data: this.props.bookinglist});
        }
    }
    changehr=(v,flag)=>{
        let mm = v;
        mm.hr = !mm.hr;
        this.props.updatebookingItem(mm);
    }
    changeraf1=(v)=>{
        let mm = v;
        mm.raf1 = !mm.raf1;
        this.props.updatebookingItem(mm);
    }
    changeaod=(v)=>{
        let mm = v;
        mm.aod = !mm.aod;
        this.props.updatebookingItem(mm);
    }
    changeinstr=(v)=>{
        let mm = v;
        mm.instr = !mm.instr;
        this.props.updatebookingItem(mm);
    }
    changeraf4=(v)=>{
        let mm = v;
        mm.raf4 = !mm.raf4;
        this.props.updatebookingItem(mm);
    }
    _handleKeyPress=(e , v , p_value)=>{
        console.log("e.key ==",e.key)

        if (e.key === 'Enter') {
            e.preventDefault();
            let pvalue = document.getElementById(v).value;
            console.log("pvalue", pvalue);
            p_value.paperID = pvalue;

            this.props.updatebookingItem(p_value);
            return false;
        }
    }
    renderEditableID(IDinfo) {

        let pid= "pid" + moment().valueOf();
        return (<Form inline><FormGroup>
                    <Input
                        style={{maxWidth: '81px'}}
                        id={pid}
                        type="text"
                        className=""
                        defaultValue={IDinfo.original.paperID}
                        onKeyPress={(e)=>{this._handleKeyPress(e,pid , IDinfo.original)}}
                    />
                </FormGroup></Form>
                );

    }
    render() {
        const {data} = this.state;

        if(data && data !== null && data !== undefined && Object.keys(data).length !== 0){
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
                            heading="Paperwork"
                            // subheading="Choose between regular React Bootstrap tables or advanced dynamic ones."
                            icon="pe-7s-paper-plane icon-gradient bg-tempting-azure"
                        />
                    </div>
                    <Row>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    {data && data !== null && (


                                    <ReactTable
                                        data={data}
                                        columns={[{
                                            columns: [
                                                {
                                                    Header: 'Date',
                                                    accessor: 'date',
                                                    Cell: cell=>{
                                                        // console.log('row=',cell);
                                                        let m = cell.original.date;
                                                        let mm=[];
                                                        if(m && m.length){
                                                            mm =m.split(`"`);
                                                        }

                                                        let date = "";
                                                        date = moment().format('DD-MM-YYYY');
                                                        if(mm.length && mm[1]){
                                                            date = moment(mm[1]).format('DD-MM-YYYY');
                                                        }
                                                        return(<div>{date}</div>)
                                                    }
                                                },
                                                {
                                                    Header: 'Surname',
                                                    accessor: 'surname',
                                                    Cell: row => (
                                                        <div>
                                                            <div className="widget-content p-0">
                                                                <div className="widget-content-wrapper">
                                                                    <div className="widget-content-left flex2">
                                                                        <div className="widget-heading">
                                                                            {row.value}
                                                                        </div>
                                                                        <div className="widget-subheading opacity-10">
                                                                            <span>
                                                                                {/*<b className="text-success">56,24</b>*/}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                </div>
                                                    )
                                                },
                                                {
                                                    Header: 'Initials',
                                                    accessor: 'initials'
                                                },
                                                {
                                                    Header: 'ID',
                                                    accessor: 'paperID',
                                                    Cell: this.renderEditableID
                                                },
                                                {
                                                    Header: 'Attorney',
                                                    accessor: 'attorney'
                                                },{
                                                    Header: 'Attorney Ref',
                                                    accessor: 'attorneyRef'
                                                },
                                                {
                                                    Header: 'HR',
                                                    accessor: 'hr',
                                                    Cell: ({ original }) => {
                                                        return (
                                                            <input
                                                                type="checkbox"
                                                                className="checkbox"
                                                                defaultChecked={original.hr}
                                                                onChange={() => this.changehr(original,original.hr)}
                                                            />
                                                        );
                                                    }
                                                },
                                                {
                                                    Header: 'RAF1',
                                                    accessor: 'raf1',
                                                    Cell: ({ original }) => {
                                                        return (
                                                            <input
                                                                type="checkbox"
                                                                className="checkbox"
                                                                defaultChecked={original.raf1}
                                                                onChange={() => this.changeraf1(original)}
                                                            />
                                                        );
                                                    }
                                                },
                                                {
                                                    Header: 'AoD',
                                                    accessor: 'aod',
                                                    Cell: ({ original }) => {
                                                        return (
                                                            <input
                                                                type="checkbox"
                                                                className="checkbox"
                                                                defaultChecked={original.aod}
                                                                onChange={() => this.changeaod(original)}
                                                            />
                                                        );
                                                    }
                                                },
                                                {
                                                    Header: 'Instruction Letter',
                                                    accessor: 'instr',
                                                    Cell: ({ original }) => {
                                                        return (
                                                            <input
                                                                type="checkbox"
                                                                className="checkbox"
                                                                defaultChecked={original.instr}
                                                                onChange={() => this.changeinstr(original)}
                                                            />
                                                        );
                                                    }
                                                },
                                                {
                                                    Header: 'RAF 4',
                                                    accessor: 'raf4',
                                                    Cell: ({ original }) => {
                                                        return (
                                                            <input
                                                                type="checkbox"
                                                                className="checkbox"
                                                                defaultChecked={original.raf4}
                                                                onChange={() => this.changeraf4(original)}
                                                            />
                                                        );
                                                    }
                                                },
                                            ]
                                        },
                                        {
                                            columns: [

                                                {
                                                    Header: 'Actions',
                                                    accessor: 'actions',
                                                    Cell: row => (
                                                        <div className="d-block w-100 text-center">
                                                            <UncontrolledButtonDropdown>
                                                                <DropdownToggle caret className="btn-icon btn-icon-only btn btn-link" color="link">
                                                                    <i className="lnr-menu-circle btn-icon-wrapper"/>
                                                                </DropdownToggle>
                                                                <DropdownMenu className="rm-pointers dropdown-menu-hover-link">
                                                                    {/*<DropdownItem header>Header</DropdownItem>*/}
                                                                    <DropdownItem>
                                                                        <i className="dropdown-icon lnr-inbox"> </i>
                                                                        <span>Attach</span>
                                                                    </DropdownItem>
                                                                    <DropdownItem>
                                                                        <i className="dropdown-icon lnr-file-empty"> </i>
                                                                        <span>Request</span>
                                                                    </DropdownItem>
                                                                    <DropdownItem divider/>
                                                                    <DropdownItem>
                                                                        <div>Progress Bar</div>
                                                                    </DropdownItem>
                                                                    <DropdownItem>
                                                                        <div className="progress-bar-sm progress"
                                                                             style={{
                                                                                 width: '100%',
                                                                                 backgroundColor: '#dadada',
                                                                             }}
                                                                        >
                                                                            <div className="progress-bar"
                                                                                 style={{
                                                                                     width: `55%`,
                                                                                     backgroundColor: row.value > 66 ? '#3ac47d'
                                                                                         : row.value > 33 ? '#fd7e14'
                                                                                             : '#d92550',
                                                                                     borderRadius: '2px',
                                                                                     transition: 'all .2s ease-out'
                                                                                 }}
                                                                            />
                                                                        </div>
                                                                    </DropdownItem>
                                                                </DropdownMenu>
                                                            </UncontrolledButtonDropdown>
                                                        </div>
                                                    )
                                                }
                                            ]
                                        }]}
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
        )
        }
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
    }, dispatch);
}

function mapStateToProps({Bookings})
{
    return {
        bookinglist             : Bookings.bookinglist,
        booking                 : Bookings,

    }
}



export default connect(mapStateToProps, mapDispatchToProps)(PaperWork);
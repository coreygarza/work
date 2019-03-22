import React from 'react';
import {
    Button, Modal, ModalHeader, ModalBody,
    ModalFooter, Form, FormGroup, Label,
    Input, FormText, Row, Col, CustomInput} from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../reducers/Bookings/Booking.actions';
import {withRouter} from 'react-router-dom'
import Bookings from "../reducers/Bookings/Bookings.reducer";
import axios from 'axios';
import {setEnableMobileMenuSmall} from "../reducers/ThemeOptions";

const axios_instance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    // mode: "no-cors",
    // withCredentials: true

});
let G_Capacity;
const API_URL='http://localhost:8000';
class AddBooking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            startDate: new Date(),
            addLinkClicked: false,
            rows: [],
            surname: null,
            initials: null,
            attorney: null,
            date: new Date(),
            attorneyRef: null,
            location: null,
            courtDate: new Date(),
            specialist: null,
            specialistitem: [],
            specialistcapacity:[],
            testcapcity:[],
        }

        ;
        // this.handleChange = this.handleChange.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    changeitemspecialist=(e,rowid)=>{
        let getitem = this.state.specialistitem;
        let name = e.target.name;
        let value = e.target.value;
        let getspeclistfromdb =null;
        let getallspecitem = null;
        let capacity =-1;

        if(this.props.specialist && this.props.specialist !== null){
            let setspect =this.props.specialist;
            getspeclistfromdb= setspect.filter((midt)=>(midt.id).toString() === value);
        }
        if(this.props.specialistitems && this.props.specialistitems !== null){
            getallspecitem = this.props.specialistitems.filter((item)=>item.specialist===value.toString() && moment((item.bookingdate).split(`"`)[1]).format('DD-MM-YYYY')===moment(this.state.date).format('DD-MM-YYYY'))
        }

        if(getspeclistfromdb && getspeclistfromdb !== null){
            capacity = getspeclistfromdb[0].capacity;
        }
        // console.log("value",value);
        // console.log("this.props.specialist",this.props.specialist);
        // console.log("getspeclistfromdb",getspeclistfromdb);
        // console.log("capacity=====",getallspecitem.length,capacity);
        let mmitem =[];
        let flag = false;
        if(this.state.specialistcapacity && this.state.specialistcapacity.length && this.state.specialistcapacity !== null){
            let iitem={};

            this.state.specialistcapacity.map((item)=>{
                iitem=item;
                // if(item.specid === value && getallspecitem && getallspecitem !== null && getallspecitem.length && capacity && capacity !== null && capacity !== -1){
                // console.log("rowid",rowid);
                // console.log("item.rowid",item.rowid);
                // console.log("item.specid",item.specid);
                // console.log("value",value);
                if(
                    item.rowid ===rowid
                    &&
                    getallspecitem && getallspecitem !== null &&
                    getallspecitem.length && capacity && capacity !== null &&
                    capacity !== -1
                ){
                    iitem.capacity=getallspecitem.length+"/"+capacity;
                    iitem.specid = value;
                    flag = true;
                }
                if(iitem && iitem !== null){
                    // console.log("iitem==1",iitem);
                    mmitem.push(iitem);
                }

            });

        }

        if(!flag){
            let iitem={};
            iitem.specid = value;
            iitem.capacity ="";
            iitem.rowid = rowid;
            if(getallspecitem && getallspecitem !== null && getallspecitem.length && capacity && capacity !== null && capacity !== -1){
                iitem.capacity=getallspecitem.length+"/"+capacity;
                mmitem.push(iitem);
            }

        }
        // console.log("mmitem",mmitem);
        //_cpacity
        if(capacity && capacity !== null && getallspecitem && getallspecitem !== null && getallspecitem.length){
            document.getElementById(`${rowid}_cpacity`).setAttribute("value", getallspecitem.length+"/"+capacity);
        }

        G_Capacity = mmitem;
        this.setState({specialistcapacity:mmitem});

        // console.log("name",name);
        // console.log("value",value);
        let makeitem ={
            "rowid":rowid,
            "bookingdate":JSON.stringify(this.state.date),
            "specialist":value,
            "specialistid":value,
            "ml":"",
            "add":"",
            "raf1":"",
            "raf4":""
        };
        let check = false;
        getitem.map((item)=>{
            if(item.rowid===rowid){
                makeitem = item;
                item.specialist = value;
                item.specialistid = value;
                check = true;
            }
        });
        if(!check){
            getitem.push(makeitem);
        }
        this.setState({specialistitem:getitem});
        // console.log("getitem",getitem);
    }
    itemchangeml=(e,rowid)=>{
        let getitem = this.state.specialistitem;
        let name = e.target.name;
        let value = e.target.value;
        let checked  = e.target.checked;

        let makeitem ={
            "rowid":rowid,
            "bookingdate":JSON.stringify(this.state.date),
            "specialist":"",
            "specialistid":"",
            "ml":checked,
            "add":"",
            "raf1":"",
            "raf4":""
        };
        let check = false;
        getitem.map((item)=>{
            if(item.rowid===rowid){
                makeitem = item;
                item.ml = checked;
                check = true;
            }
        });
        if(!check){
            getitem.push(makeitem);
        }
        this.setState({specialistitem:getitem});
        // console.log("getitem",getitem);
        // console.log("even",e.target);
        // console.log("name",name);
        // console.log("value",value);
        // console.log("checked",checked);
        // console.log("rowid",rowid);
    }
    itemchangeadd=(e,rowid)=>{
        let getitem = this.state.specialistitem;
        let name = e.target.name;
        let value = e.target.value;
        let checked  = e.target.checked;
        let makeitem ={
            "rowid":rowid,
            "bookingdate":JSON.stringify(this.state.date),
            "specialist":"",
            "specialistid":"",
            "ml":"",
            "add":checked,
            "raf1":"",
            "raf4":""
        };
        let check = false;
        getitem.map((item)=>{
            if(item.rowid===rowid){
                makeitem = item;
                item.add = checked;
                check = true;
            }
        });
        if(!check){
            getitem.push(makeitem);
        }
        // console.log("getitem",getitem);
        this.setState({specialistitem:getitem});
    }

    itemchangeraf1=(e,rowid)=>{
        let getitem = this.state.specialistitem;
        let name = e.target.name;
        let value = e.target.value;
        let checked  = e.target.checked;

        let makeitem ={
            "rowid":rowid,
            "bookingdate":JSON.stringify(this.state.date),
            "specialist":"",
            "specialistid":"",
            "ml":"",
            "add":"",
            "raf1":checked,
            "raf4":""
        };
        let check = false;
        getitem.map((item)=>{
            if(item.rowid===rowid){
                makeitem = item;
                item.raf1 = checked;
                check = true;
            }
        });
        if(!check){
            getitem.push(makeitem);
        }
        // console.log("getitem",getitem);
        this.setState({specialistitem:getitem});
    }

    itemchangeraf4=(e,rowid)=>{
        let getitem = this.state.specialistitem;
        let name = e.target.name;
        let value = e.target.value;
        let checked  = e.target.checked;

        let makeitem ={
            "rowid":rowid,
            "bookingdate":JSON.stringify(this.state.date),
            "specialist":"",
            "specialistid":"",
            "ml":"",
            "add":"",
            "raf1":"",
            "raf4":checked
        };
        let check = false;
        getitem.map((item)=>{

            if(item.rowid===rowid){
                makeitem = item;
                item.raf4 = checked;
                check = true;

            }
        });
        if(!check){
            // alert("Please Select Specialist");
            getitem.push(makeitem);
        }
        // console.log("getitem",getitem);
        this.setState({specialistitem:getitem});
    }

    RowAddd= (rowid) =>{
        let getcapacity = "";
        // console.log("this.state.specialistcapacity",this.state.specialistcapacity);
        // console.log("this.state.testcapcity",this.state.testcapcity);
        // console.log("this.state.rows",this.state.rows);
        // console.log("G_Capacity",G_Capacity);
        let row = null;
        if(this.state.specialistcapacity && this.state.specialistcapacity !== null){
            row = this.state.specialistcapacity.filter((i)=>i.rowid === rowid);
            // console.log("row==",row);
        }

        return(
            <Row form>
                <Col md={3}>
                    <FormGroup>
                        <Label for="doctor">Specialist</Label>
                        <Input type="select" name="specialist" id={`${rowid}_specialist`} style={{marginBottom:'3px'}}
                          onChange={(e)=>{this.changeitemspecialist(e,rowid)}}
                        >
                            <option>Select</option>
                            {this.props.specialist && this.props.specialist !== null && this.props.specialist.map((item, index)=>{
                                return (<option key ={index} value={item.id} >{item.name}</option>)
                            })}
                        </Input>
                    </FormGroup>
                </Col>
                <Col md={3}>
                    <FormGroup>
                        <Label for="cpacity">Capacity</Label>

                        <Input type="text" name="cpacity" id={`${rowid}_cpacity`} disabled>
                            {/*<option>Select</option>*/}
                            {/*{this.state.specialistcapacity && this.state.specialistcapacity !== null && this.state.specialistcapacity.map((item, index)=>{*/}
                                {/*return (<option key ={index} value={item.rowid} >{item.capacity}</option>)*/}
                            {/*})}*/}
                        </Input>
                    </FormGroup>
                </Col>
                <Col md={5}>
                    <FormGroup>
                        <Label for="product_options">Product Options</Label>
                        <div className="mt-2">
                            <CustomInput type="checkbox" id={`${rowid}_product_options_ml`}

                                // this.state.specialistitem.filter((row) => row.id === rowid).ml===true?true:false

                             label="ML" onChange={(e)=>{this.itemchangeml(e,rowid)}} inline/>
                            <CustomInput type="checkbox" id={`${rowid}product_options_add`} label="Add" inline
                                         onChange={(e)=>{this.itemchangeadd(e,rowid)}}
                            />
                            <CustomInput type="checkbox" id={`${rowid}product_options_raf1`} label="Raf1" inline
                                         onChange={(e)=>{this.itemchangeraf1(e,rowid)}}
                            />
                            <CustomInput type="checkbox" id={`${rowid}product_options_raf4`} label="Raf4" inline
                                         onChange={(e)=>{this.itemchangeraf4(e,rowid)}}
                            />
                        </div>
                    </FormGroup>
                </Col>
                <Col md={1} >
                    <div className="pt-4">
                        <a href="#" onClick={() => this.remove(rowid)}>X</a>
                    </div>
                </Col>
            </Row>
        )
    }


    handleChangestartDate=(date)=>{
        this.setState({
            date: date,

        });
    }
    handleChangecourtDate=(date)=>{
        this.setState({
            courtDate: date
        });
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    remove = (rowId) =>{
        const arrayRow = this.state.rows.filter((row) => row.id !== rowId);
        const items = this.state.specialistitem.filter((row)=>row.id!==rowId);
        this.setState({rows: arrayRow});
        this.setState({specialistitem:items});

        // console.log(arrayRow)
    }

    addNewSpecialist = () =>{
        var rows = this.state.rows;
        var m_rows = this.state.specialistcapacity;

        let id= moment().valueOf();

        let midspe ={
            specid: "",
            capacity:"",
            rowid:id,
        }
        let mm = this.state.testcapcity;
        let mm_item =[];
        mm_item[id]="";
        mm.push(mm_item);
        this.setState({testcapcity:mm});
        m_rows.push(midspe);

        this.setState({specialistcapacity: m_rows})
        let rowindex = {
            id: id,
            item: this.RowAddd(id)
        }
        rows.push(rowindex);
        this.setState({rows: rows});
    }
    componentDidUpdate(prevProps,prevState){
        // console.log("props" , this.props);
        // console.log("state" , this.state);
        if(JSON.stringify(this.props.bookinglist) !== JSON.stringify(prevProps.bookinglist) ){
            // console.log("bookinglist" , this.props.bookinglist);
        }
    }
    componentDidMount() {
    }
    componentWillMount(){
        this.props.getallBookinglist();
        this.props.getallattorneylist();
        this.props.getallarealist();
        this.props.getallspecailist();
        this.props.getallspecialistitems();
        this.props.getallspecailisttype();

    }

    addnewbooking=()=>{
        let data={};
        if(!this.state.surname || this.state.surname === null){
            alert("Please Input Surname");
            return;
        }
        else if(!this.state.initial || this.state.initial ===null){
            alert("Please Input Initial");
            return;
        }
        else if(!this.state.attorney || this.state.attorney ===null || this.state.attorney ==="Select"){
            alert("Please Select attorney");
            return;
        }
        else if(!this.state.date || this.state.date ===null){
            alert("Please Select date");
            return;
        }
        else if(!this.state.attorneyRef || this.state.attorneyRef ===null || this.state.attorneyRef ==="Select"){
            alert("Please Select attorneyRef");
            return;
        }
        else if(!this.state.location || this.state.location ===null || this.state.location ==="Select"){
            alert("Please Select location");
            return;
        }
        else if(!this.state.courtDate || this.state.courtDate ===null){
            alert("Please Select courtDate");
            return;
        }
        else{
            data={
                "surname"       : this.state.surname,
                "initials"      : this.state.initial,
                "attorney"      : this.state.attorney,
                "date"          : JSON.stringify(this.state.date),
                "attorneyRef"   : this.state.attorneyRef,
                "location"      : this.state.location,
                "courtDate"     : JSON.stringify(this.state.courtDate),
                // "specialist"    : "ddd",
                "specialist"    : JSON.stringify(this.state.specialistitem),
                "paperID"       : "",
            };
            this.props.addeNewBooking(data);
            console.log("data ======",data);
            this.setState({modal:false});
            this.setState({rows:[]});
            this.setState({specialistitem:[]});
            this.props.getallspecialistitems();
        }
    }
    handlechange=(v)=>{
        let name = v.target.name;
        let value = v.target.value;
        this.setState({[name]: value});
    }
    render() {
        return (
            <span className="d-inline-block mb-2 mr-2">
                <Button color="primary" onClick={this.toggle}>Add Booking</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>New Booking</ModalHeader>
                    <ModalBody>
                        <Form>
                            <Row form>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="surname">Surname</Label>
                                        <Input type="text" name="surname" id="surname"
                                               // placeholder="surname"
                                               onChange={this.handlechange}/>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="initial">Initials</Label>
                                        <Input type="text" name="initial" id="initial"
                                               // placeholder="xxxxxxxxxx"
                                               onChange={this.handlechange}/>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="attorney">Attorney</Label>
                                        <Input type="select" name="attorney" id="attorney" onChange={this.handlechange}>
                                            <option>Select</option>
                                            { this.props && this.props !== null && this.props.attorneylist && this.props.attorneylist !==null &&
                                                this.props.attorneylist.map((item,index)=>{
                                                    return (<option key={index} >{item.name}</option>)
                                                })
                                            }
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="date">Date</Label>
                                        <DatePicker className="form-control"
                                                    name ="date"
                                                    selected={this.state.date}
                                                    onChange={this.handleChangestartDate}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="attorney">Attorney Ref</Label>
                                        <Input type="text" name="attorneyRef" id="attorneyRef"
                                               // placeholder="Attorney Ref"
                                               onChange={this.handlechange}>

                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="location">Location</Label>
                                        <Input type="select" name="location" id="location" onChange={this.handlechange}>
                                            <option>Select</option>
                                            {this.props.arealist && this.props.arealist !== null && this.props.arealist.map((item,index)=>{
                                                return (<option key={index}>{item.name}</option>)
                                            })}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="court_date">Court Date</Label>
                                        <DatePicker className="form-control"
                                                    selected={this.state.courtDate}
                                                    name ="courtDate"
                                                    onChange={this.handleChangecourtDate}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form style={{display:'none'}}>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="doctor">Specialist</Label>
                                        <Input type="select" name="specialist" id="specialist"  style={{marginBottom:'3px'}}>
                                            <option>Select</option>
                                            {this.props.specialist && this.props.specialist !== null && this.props.specialist.map((item, index)=>{
                                                return (<option key ={index}>{item.name}</option>)
                                            })}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                   <FormGroup>
                                        <Label for="cpacity">Capacity</Label>
                                        <Input type="text" name="cpacity" id="cpacity" onChange={this.handlechange}
                                               // placeholder="5/10"
                                        />
                                   </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="product_options">Product Options</Label>
                                        <div className="mt-2">
                                            <CustomInput type="checkbox" id="product_options_ml" label="ML"  inline/>
                                            <CustomInput type="checkbox" id="product_options_add" label="Add" inline/>
                                            <CustomInput type="checkbox" id="product_options_raf1" label="Raf1" inline/>
                                            <CustomInput type="checkbox" id="product_options_raf4" label="Raf4" inline/>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            {this.state.rows.map((r, index) => (
                                <div  key={r.id}>{r.item}</div>
                            ))}
                            <Button className="mb-2 mr-2 btn-icon btn-icon-only" color="link"
                                    onClick={()=>this.addNewSpecialist()}>
                                        <i className="pe-7s-add-user btn-icon-wrapper" style={{ fontSize: '37px', color:'#000' }}> </i>
                            </Button>
                            <Row>
                                <Col md={7}>
                                    {/*<CustomInput type="checkbox" id="book_confirm" label="Send Booking confirmation to attorney" inline/>*/}
                                </Col>
                                <Col md={5}>
                                    <FormGroup>
                                    <Button>Cancel booking</Button>
                                    <Button color="primary" className="ml-3" onClick={this.addnewbooking}>Done</Button>
                                    </FormGroup>
                                </Col>
                            </Row>

                        </Form>
                    </ModalBody>
                </Modal>
            </span>
        );
    }
}



function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        addeNewBooking              : Actions.addeNewBooking,
        getallBookinglist           : Actions.getallBookinglist,
        getallattorneylist          : Actions.getallattorneylist,
        getallarealist              : Actions.getallarealist,
        getallspecailist            : Actions.getallspecailist,
        getallspecialistitems       : Actions.getallspecialistitems,
        getallspecailisttype        : Actions.getallspecailisttype,
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
        specialisttype          : Bookings.specialisttype,
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(AddBooking);


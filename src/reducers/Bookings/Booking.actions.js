import axios from 'axios';
import moment from 'moment';
import {SET_ENABLE_FIXED_SIDEBAR} from "../ThemeOptions";
const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json',},
    // withCredentials: false
});

const API_URL='http://127.0.0.1:8000';

export const CREATE_BOOKING_START                   = '[CREATE BOOKING] CREATE BOOKING START';
export const CREATE_BOOKING_SUCCESS                 = '[CREATE BOOKING] CREATE BOOKING SUCCESS';
export const CREATE_BOOKING_FAILD                   = '[CREATE BOOKING] CREATE BOOKING FAILD';

export const GET_ALL_BOOKING_START                  = '[GET BOOKING] GET ALL BOOKING LIST START';
export const GET_ALL_BOOKING_SUCCESS                = '[GET BOOKING] GET ALL BOOKING LIST SUCCESS';
export const GET_ALL_BOOKING_FAILD                  = '[GET BOOKING] GET ALL BOOKING LIST FAILD';


export const UPDATE_BOOKING_ITEM_START                  = '[UPDATE BOOKING] UPDATE BOOKING ITEM START';
export const UPDATE_BOOKING_ITEM_SUCCESS                = '[UPDATE BOOKING] UPDATE BOOKING ITEM SUCCESS';
export const UPDATE_BOOKING_ITEM_FAILD                  = '[UPDATE BOOKING] UPDATE BOOKING ITEM FAILD';

export const ATTORNEY_GET_ALL_LIST_START                  = '[ATTORNEY] ATTORNEY GET ALL LIST START';
export const ATTORNEY_GET_ALL_LIST_SUCCESS                = '[ATTORNEY] ATTORNEY GET ALL LIST SUCCESS';
export const ATTORNEY_GET_ALL_LIST_FAILD                  = '[ATTORNEY] ATTORNEY GET ALL LIST FAILD';

export const AREA_GET_ALL_LIST_START                  = '[AREA] AREA GET ALL LIST START';
export const AREA_GET_ALL_LIST_SUCCESS                = '[AREA] AREA GET ALL LIST SUCCESS';
export const AREA_GET_ALL_LIST_FAILD                  = '[AREA] AREA GET ALL LIST FAILD';

export const SPECIALIST_GET_ALL_LIST_START                  = '[SPECIALIST] SPECIALIST GET ALL START';
export const SPECIALIST_GET_ALL_LIST_SUCCESS                = '[SPECIALIST] SPECIALIST GET ALL SUCCESS';
export const SPECIALIST_GET_ALL_LIST_FAILD                  = '[SPECIALIST] SPECIALIST GET ALL FAILD';

export const ADD_SPECAILIST_ITEMS_START                  = '[ADD SPECIALIST] ADD SPECIALIST START';
export const ADD_SPECAILIST_ITEMS_SUCCESS                = '[ADD SPECIALIST] ADD SPECIALIST SUCCESS';
export const ADD_SPECAILIST_ITEMS_FAILD                  = '[ADD SPECIALIST] ADD SPECIALIST FAILD';
export const ADD_SPECAILIST_ITEMS_FAILD_OVERRID                  = '[ADD SPECIALIST] ADD SPECIALIST FAILD OVERID';


export const SPECIALIST_ITME_GET_ALL_LIST_START                  = '[SPECIALIST ITEMS] SPECIALIST GET ALL START';
export const SPECIALIST_ITME_GET_ALL_LIST_SUCCESS                = '[SPECIALIST ITEMS] SPECIALIST GET ALL SUCCESS';
export const SPECIALIST_ITME_GET_ALL_LIST_FAILD                  = '[SPECIALIST ITEMS] SPECIALIST GET ALL FAILD';


export const SPECIALIST_TYPE_GET_ALL_LIST_START                  = '[SPECIALIST TYPE] SPECIALIST TYPE GET ALL START';
export const SPECIALIST_TYPE_GET_ALL_LIST_SUCCESS                = '[SPECIALIST TYPE] SPECIALIST TYPE GET ALL SUCCESS';
export const SPECIALIST_TYPE_GET_ALL_LIST_FAILD                  = '[SPECIALIST TYPE] SPECIALIST TYPE GET ALL FAILD';


export function getallspecailisttype() {
    return (dispatch)=>{
        dispatch({
            type:SPECIALIST_TYPE_GET_ALL_LIST_START
        });
        (async ()=>{
            axios_instance.get(`${API_URL}/api/specialisttype/getall/`).then(res=>{
                if(res.status===200){
                    dispatch({
                        type: SPECIALIST_TYPE_GET_ALL_LIST_SUCCESS,
                        payload: res.data,
                    });
                }
                else{
                    dispatch({
                        type:SPECIALIST_TYPE_GET_ALL_LIST_FAILD,
                    })
                }
            }).catch(err=>{
                console.log("Error");
            })
        })();
    }
}


export function getallspecailist() {
    return (dispatch)=>{
        dispatch({
            type:SPECIALIST_GET_ALL_LIST_START
        });
        (async ()=>{
            axios_instance.get(`${API_URL}/api/specialist/getall/`).then(res=>{
                if(res.status===200){
                    dispatch({
                        type: SPECIALIST_GET_ALL_LIST_SUCCESS,
                        payload: res.data,
                    });
                }
                else{
                    dispatch({
                        type:SPECIALIST_GET_ALL_LIST_FAILD,
                    })
                }
            }).catch(err=>{
                console.log("Error");
            })
        })();
    }
}

export function getallarealist() {
    return (dispatch)=>{
        dispatch({
            type:AREA_GET_ALL_LIST_START
        });
        (async ()=>{
            axios_instance.get(`${API_URL}/api/area/getall/`).then(res=>{
                if(res.status===200){
                    dispatch({
                        type: AREA_GET_ALL_LIST_SUCCESS,
                        payload: res.data,
                    });
                }
                else{
                    dispatch({
                        type:AREA_GET_ALL_LIST_FAILD,
                    })
                }
            }).catch(err=>{
                console.log("Error");
            })
        })();
    }
}



export function getallattorneylist() {
    return (dispatch)=>{
        dispatch({
            type:ATTORNEY_GET_ALL_LIST_START
        });
        (async ()=>{
            axios_instance.get(`${API_URL}/api/attorney/getall/`).then(res=>{
                if(res.status===200){
                    dispatch({
                        type: ATTORNEY_GET_ALL_LIST_SUCCESS,
                        payload: res.data,
                    });
                }
                else{
                    dispatch({
                        type:ATTORNEY_GET_ALL_LIST_FAILD,
                    })
                }
            }).catch(err=>{
                console.log("Error");
            })
        })();
    }
}

export function updatebookingItem(data) {
    // console.log("data===",data);
    return (dispatch)=>{
        let id = data.id;
        dispatch({
            type:UPDATE_BOOKING_ITEM_START
        });
        if(id && id !== null)
        (async ()=>{
            axios_instance.patch(`${API_URL}/api/update/${id}/`,data).then(res=>{

                if(res.status===200){
                    dispatch({
                        type:UPDATE_BOOKING_ITEM_SUCCESS,
                        payload: res.data,
                    })
                }
                else{
                    dispatch({
                        type:UPDATE_BOOKING_ITEM_FAILD,
                    })
                }
            }).catch(err => {
                console.log('Errora', err.response.status);
            });
        })();
        else {
            dispatch({
                type:UPDATE_BOOKING_ITEM_FAILD,
            })
        }
    }
}

export function getallBookinglist(){
    return (dispatch)=>{
        dispatch({
            type:GET_ALL_BOOKING_START,
        });
        (async ()=>{
            axios_instance.get(`${API_URL}/api/getall/`).then(resp => {

                if(resp.status ===200){
                    dispatch({
                        type:GET_ALL_BOOKING_SUCCESS,
                        payload:resp.data
                    });
                }
                else{
                    dispatch({
                        type:GET_ALL_BOOKING_FAILD,
                        payload:resp.data
                    });
                }
            }).catch(err => {
                console.log('Errora', err.response.status);
            });
        })();
    }
}


export function addeNewBooking(data){

    return (dispatch)=>{
        dispatch({
            type:   CREATE_BOOKING_START,
        });
        (async ()=>{
            axios_instance.post(`${API_URL}/api/create/`,data).then(resp => {

                        if(resp.status ===201){
                            dispatch({
                                type:CREATE_BOOKING_SUCCESS,
                                payload:resp.data
                            });
                            dispatch(addspecialist(resp.data.id,data.specialist));

                        }
                        else{
                            dispatch({
                                type:CREATE_BOOKING_FAILD,
                            });
                        }
            }).catch(err => {
                if(err !== null || err )
                    console.log('Errorc', JSON.stringify(err));
            });
        })();
    };

}


export function addspecialist(id,data) {
    return (dispatch)=>{

        let middata = JSON.parse(data);
        middata.map((item)=>{
            let miditem ={};
            miditem = item;
            miditem.bookingid=id;
            // console.log("miditem",miditem);
            dispatch(addspecialistapi(miditem));
        });
        // console.log("id",id);
        // console.log("data",data);
    }
}
export function addspecialistapi(data) {

    return (dispatch,getState)=>{

        let bookings = getState().Bookings;
        let specialist = getState().Bookings.specialist;
        let specialistitems = getState().Bookings.specialistitems;
        let nowdate = data.bookingdate;
        let specialistid = data.specialistid;

        // console.log("data===",data);
        // console.log("nowdate===",nowdate);
        // // console.log("bookingdate===",specialistitems[0].bookingdate);
        // console.log("specialistidt===",specialistid);
        let allcapacity = -1;
        let mspeclist = specialist.filter((item)=>item.id.toString() ===specialistid);
        let midgetspeitem = specialistitems.filter((item)=>moment(item.bookingdate).format('DD-MM-YYYY')===moment(nowdate).format('DD-MM-YYYY') && item.specialistid===specialistid);
        dispatch({
            type:ADD_SPECAILIST_ITEMS_START
        });
        if(mspeclist && mspeclist.length ){
            allcapacity = mspeclist[0].capacity;
        }

        if(midgetspeitem.length <allcapacity){
            (async ()=>{
                axios_instance.post(`${API_URL}/api/specialist/createall/`,data).then(res => {
                    if(res.status ===201){
                        dispatch({
                            type:ADD_SPECAILIST_ITEMS_SUCCESS,
                            payload:res.data,
                        })
                    }
                    else{
                        dispatch({
                            type:ADD_SPECAILIST_ITEMS_FAILD,

                        })
                    }
                }).catch(err=>{
                    console.log(err);
                })
            })();
        }
        else{
            dispatch({
                type:ADD_SPECAILIST_ITEMS_FAILD_OVERRID
            });
        }


    }

}
export function getallspecialistitems(){
    return (dispatch)=>{
        dispatch({
            type:SPECIALIST_ITME_GET_ALL_LIST_START,
        });
        (async ()=>{
            axios_instance.get(`${API_URL}/api/specialistitem/getall/`).then(resp => {

                if(resp.status ===200){
                    dispatch({
                        type:SPECIALIST_ITME_GET_ALL_LIST_SUCCESS,
                        payload:resp.data
                    });
                }
                else{
                    dispatch({
                        type:SPECIALIST_ITME_GET_ALL_LIST_FAILD,
                        payload:resp.data
                    });
                }
            }).catch(err => {
                console.log('Errora', err.response.status);
            });
        })();
    }
}
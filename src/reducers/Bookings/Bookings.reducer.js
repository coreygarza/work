import * as Actions from './Booking.actions';

const initialState = {
    bookinglist     : null,
    bookingitem     : null,
    status          : 10,
    loading         : false,
    updateitemstatus: 10,
    attorneylist    : null,
    attorneystatus  : 10,
    arealist        : null,
    areastatus      : 10,
    specialist      : null,
    specialiststatus: 10,
    createspecialist: null,
    createspecialiststatus: 10,
    specialistitems : null,
    specialisttype  : null,



};

export  const Bookings = function(state = initialState, action) {
    switch ( action.type){
        case Actions.CREATE_BOOKING_START:
            return{
                ...state,
                status: 10,
                loading:true
            };
        case Actions.CREATE_BOOKING_SUCCESS:
            return {
                ...state,
                loading: false,
                status : 201,
                bookingitem: action.payload,
                bookinglist: [action.payload,...state.bookinglist],
            };
        case Actions.CREATE_BOOKING_FAILD:
            return{
                ...state,
                status: 400,
                bookingitem:null,
                loading: false,
            };
        case Actions.GET_ALL_BOOKING_START:
            return{
                ...state,
                loading:true,
            };
        case Actions.GET_ALL_BOOKING_SUCCESS:
            return{
                ...state,
                loading:false,
                bookinglist: action.payload
            };
        case Actions.GET_ALL_BOOKING_FAILD:
            return{
                ...state,
                loading:false,
                bookinglist: null,
            };
        case Actions.UPDATE_BOOKING_ITEM_START:
            return{
                ...state,
                loading:true,
                updateitemstatus:100,
            };
        case Actions.UPDATE_BOOKING_ITEM_SUCCESS:
            return{
                ...state,
                updateitemstatus:200,
            }
        case Actions.UPDATE_BOOKING_ITEM_FAILD:
            return{
                ...state,
                updateitemstatus: 400,
            };
        case Actions.ATTORNEY_GET_ALL_LIST_START:
            return{
                ...state,
                attorneystatus:100,
                loading: true,
            };
        case Actions.ATTORNEY_GET_ALL_LIST_SUCCESS:
            return{
                ...state,
                attorneylist:action.payload,
                attorneystatus: 200,
                loading: false,
            };
        case Actions.ATTORNEY_GET_ALL_LIST_FAILD:
            return{
                ...state,
                loading: false,
                attorneylist:{},
                attorneystatus: 400,
            };
        case Actions.AREA_GET_ALL_LIST_START:
            return{
                ...state,
                loading: true,
                areastatus: 100,
            };
        case Actions.AREA_GET_ALL_LIST_SUCCESS:
            return{
                ...state,
                loading:false,
                areastatus: 200,
                arealist:action.payload,
            };
        case Actions.AREA_GET_ALL_LIST_FAILD:
            return{
                ...state,
                loading:false,
                areastatus: 400,
                arealist: {}
            }
        case Actions.SPECIALIST_GET_ALL_LIST_START:
            return {
                ...state,
                loading: true,
                speicaliststatus: 100,
            }
        case Actions.SPECIALIST_GET_ALL_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                specialiststatus:200,
                specialist: action.payload,
            };
        case Actions.SPECIALIST_GET_ALL_LIST_FAILD:
            return {
                ...state,
                loading: false,
                specialist:null,
                specialiststatus:400
            };
        case Actions.ADD_SPECAILIST_ITEMS_START:
            return{
                ...state,
                loading:true,
                createspecialiststatus:100,
            };
        case Actions.ADD_SPECAILIST_ITEMS_SUCCESS:
            return{
                ...state,
                loading: false,
                createspecialiststatus:200,
                specialistitems:[action.payload,...state.specialistitems]
            }
        case Actions.ADD_SPECAILIST_ITEMS_FAILD:
            return{
                ...state,
                loading:false,
                createspecialiststatus: 400,
            }

        case Actions.SPECIALIST_ITME_GET_ALL_LIST_START:
            return{
                ...state,
                loading:true,
            };
        case Actions.SPECIALIST_ITME_GET_ALL_LIST_SUCCESS:
            return{
                ...state,
                loading: false,
                specialistitems: action.payload,
            }
        case Actions.SPECIALIST_ITME_GET_ALL_LIST_FAILD:
            return{
                ...state,
                loading: false,
                specialistitems:null,
            }
        case Actions.SPECIALIST_TYPE_GET_ALL_LIST_START:
            return{
                ...state,
                loading: true,
            }
        case Actions.SPECIALIST_TYPE_GET_ALL_LIST_SUCCESS:
            return{
                ...state,
                loading: false,
                specialisttype: action.payload,
            }
        case Actions.SPECIALIST_TYPE_GET_ALL_LIST_FAILD:
            return{
                ...state,
                loading:false,
                specialisttype: null,
            }
        default:
            return state;
    }
}
export default Bookings;




//
// export default function reducer(state = {
//     bookinglist     : {},
//     status          : 10,
//     loading         : false,
// }, action) {
//     switch ( action.type){
//         case Actions.CREATE_BOOKING_START:
//             return{
//                 ...state,
//                 status: 10,
//                 loading:true
//             };
//         case Actions.CREATE_BOOKING_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 status : 201,
//                 bookinglist: [action.payload,...state.bookinglist],
//             };
//         case Actions.CREATE_BOOKING_FAILD:
//             return{
//                 ...state,
//                 status: 400,
//                 bookinglist:null,
//                 loading: false,
//             };
//         default:
//             return state;
//     }
//     return state;
// }


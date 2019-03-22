import React, {Fragment, Component} from "react";

import {
    Card, CardBody, Button,  ButtonGroup
} from 'reactstrap';

import BigCalendar from 'react-big-calendar'
import Toolbar from 'react-big-calendar'
import moment from 'moment'
import events from './Events'
import dates from 'date-arithmetic'
import CalendarHeader from './CalendarHeader'
import AttendanceForm from '../../../Attendance';
import DayComponentTable from  '../../../DayComponent'

const localizer = BigCalendar.momentLocalizer(moment)


export class Attendance extends Component {
    render() {
        let { date } = this.props
        let range = Attendance.range(date)
        return (
            <AttendanceForm  {...this.props} range={range} eventOffset={15}/>
        )
    }
}
export class DayComponent extends Component {
    render() {
        let { date } = this.props
        let range = Attendance.range(date)
        return (
            <DayComponentTable  {...this.props} range={range} eventOffset={15}/>
        )
    }
}

Attendance.range = date => {
    let start = date
    let end = dates.add(start, 2, 'day')

    let current = start
    let range = []

    while (dates.lte(current, end, 'day')) {
        range.push(current)
        current = dates.add(current, 1, 'day')
    }

    return range
}
DayComponent.range = date => {
    let start = date
    let end = dates.add(start, 2, 'day')

    let current = start
    let range = []

    while (dates.lte(current, end, 'day')) {
        range.push(current)
        current = dates.add(current, 1, 'day')
    }

    return range
}

Attendance.navigate = (date, action) => {
            return date
}
DayComponent.navigate = (date, action) => {
            return date
}

Attendance.title = date => {
    return `Attendance`
}
DayComponent.title = date => {
    return `Day`
}

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

export default class CalendarBasic extends Component {
    render() {
        // console.log('allViews=',allViews);
        return (
            <Fragment>
                <Card className="mb-3">
                    <CardBody>
                        <BigCalendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            defaultView={BigCalendar.Views.DAY}
                            components = {{toolbar : CalendarHeader}}
                            views={{ month: true, week: true, day: DayComponent  ,agenda : Attendance}}
                        />
                    </CardBody>
                </Card>
            </Fragment>
        )
    }
}

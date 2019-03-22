import React from 'react';
import Toolbar from 'react-big-calendar/lib/Toolbar';
import {navigate} from 'react-big-calendar/lib/utils/constants';
import classNames from 'classnames';

class CalendarHeader extends Toolbar {
    renderLeftButtons = ()=>{
        return (
            <span className="rbc-btn-group">
                <button type="button" onClick={()=>this.props.onNavigate(navigate.TODAY)}>Today</button>
                <button type="button" onClick={()=>{this.props.onNavigate(navigate.PREVIOUS),alert("OK")}}>Back</button>
                <button type="button" onClick={()=>this.props.onNavigate(navigate.NEXT)}>Next</button>
            </span>
        )

    };

    renderButtons = ()=>{
        let viewNames = this.props.views;
        const view = this.props.view;
        if ( viewNames.length > 1 )
        {
            return viewNames.map(name=>(

                <button type="button" key={name} className={classNames("",{"rbc-active": view === name})}
                        onClick={() => this.props.onView(name)}
                >{name==='agenda' ? 'Attendance': name}</button>
            ))

        }
    };

    render(){
        return (
            <div className="rbc-toolbar">
                {this.renderLeftButtons()}
                <span className="rbc-toolbar-label">{this.props.label}</span>
                <span className="rbc-btn-group">
                    {this.renderButtons()}
                </span>
            </div>
        )
    }
}

export default CalendarHeader;

import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// Tables

import DataTableBasic from './Tables/DataTables/Examples/Basic';
import PaperWork from './PaperWork';
import Bookings from './Bookings';
import DataTableFixedHeader from './Tables/DataTables/Examples/FixedHeader';
import DataTablePivoting from './Tables/DataTables/Examples/Pivoting';
import RegularTables from './Tables/RegularTables/index';
import GridTables from './Tables/GridTables/index';

// Layout

import AppHeader from '../Layout/AppHeader/index';
import AppSidebar from '../Layout/AppSidebar/index';
import AppFooter from '../Layout/AppFooter/index';

// Theme Options

import ThemeOptions from '../Layout/ThemeOptions/index';

const Tables = ({match}) => (
    <Fragment>
        <ThemeOptions/>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">

                    {/* Tables */}

                    <Route path={`${match.url}/data-tables`} component={DataTableBasic}/>
                    <Route path={`${match.url}/paperwork`} component={PaperWork}/>
                    <Route path={`${match.url}/bookings`} component={Bookings}/>
                    <Route path={`${match.url}/datatables-fixed-header`} component={DataTableFixedHeader}/>
                    <Route path={`${match.url}/datatables-aggregation`} component={DataTablePivoting}/>
                    <Route path={`${match.url}/regular-tables`} component={RegularTables}/>
                    <Route path={`${match.url}/grid-tables`} component={GridTables}/>
                </div>
                {/*<AppFooter/>*/}
                {match.url}
            </div>
        </div>
    </Fragment>
);

export default Tables;
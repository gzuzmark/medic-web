import * as React from 'react';
import Pagination from "react-js-pagination";
import {PAGE_ITEMS_RANGE} from "./ConsolePager.const";
import './ConsolePager.scss';


interface IPropsConsolePaginator {
    activePage: number;
    pageSize: number
    totalItemsCount: number;
    onChange: (page: number) => void;
    style?: React.CSSProperties;
}

const ConsolePager: React.StatelessComponent<IPropsConsolePaginator> = (props) => {
    if (props.totalItemsCount <= PAGE_ITEMS_RANGE) {
        return null;
    }
    return (
        <div className='ConsolePager' style={{...props.style}}>
            <Pagination
                activePage={props.activePage}
                itemsCountPerPage={props.pageSize}
                totalItemsCount={props.totalItemsCount}
                pageRangeDisplayed={8}
                onChange={props.onChange}
            />
        </div>
    );
};

export default ConsolePager;
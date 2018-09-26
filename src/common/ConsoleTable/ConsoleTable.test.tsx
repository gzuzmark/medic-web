import { shallow } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import ConsoleTable, {IRowConsoleTable} from "./ConsoleTable";


describe('ConsoleTable Test',() => {
    let props: any;
    let mountedReportTable: any;
    const getComponent = () => {
        if (!mountedReportTable) {
            mountedReportTable = shallow(
                <ConsoleTable {...props} />
            );
        }
        return mountedReportTable;
    };

    beforeEach(() => {
        props = {
            items: [{name: "Elon", lastname: "Musk"}, {name: "Steve", lastname: "Jobs"}],
            row: [{
                name: 'Día',
                value: (row: any) => <div>{row.name}</div>,
                width: 124.5
            },{
                name: <div>Titulo</div>,
                value: (row: any) => <div>{row.name}</div>,
                width: 124.5
            },{
                name: 'Hora de inicio',
                value: (row: any) => row.lastname,
                width: 88.7
            }] as IRowConsoleTable[]
        };
        mountedReportTable = undefined;
    });

    it("render: render ConsoleTable", () => {
        const component = getComponent();
        expect(component).toMatchSnapshot()
    });

    it("render: render ConsoleTable should be two rows in body", () => {
        const component = getComponent();
        expect(component.find('.ConsoleTable-body .ConsoleTable-row').length).toBe(2);
    });
});
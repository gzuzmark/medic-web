import { shallow } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import MenuAside from "../Layout/components/MenuAside/MenuAside";
import Sticky from "../Sticky/Sticky";
import MenuLeft from "./MenuLeft";


describe('MenuLeft Test',() => {
    let props: any;
    let mountedReportTable: any;
    const getComponent = () => {
        if (!mountedReportTable) {
            mountedReportTable = shallow(
                <MenuLeft {...props} />
            );
        }
        return mountedReportTable;
    };

    beforeEach(() => {
        props = {
            baseText:'Doctores',
            icon: 'book',
            textNavigation: "Titulo Principal",
            url:'/admin/doctores'
        };
        mountedReportTable = undefined;
    });

    it("render: render MenuLeft should have the Sticky Component", () => {
        const component = getComponent();
        expect(component.find(Sticky).length).toBe(1);
    });

    it("render: render MenuLeft should have the MenuAside", () => {
        const component = getComponent();
        expect(component.find(MenuAside).length).toBe(1);
    });
});

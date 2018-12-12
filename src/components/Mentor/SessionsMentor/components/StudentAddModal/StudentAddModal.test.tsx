import { mount } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import { Text2, Text3 } from '../../../../../common/ConsoleText';
import {IStudentChecklist} from "../../../../../domain/StudentChecklist/StudentChecklistBean";
import StudentAddModal, {IPropsStudentAddModal, IStudentModal} from './StudentAddModal';


describe('StudentAddModal Test',() => {
    let props: IPropsStudentAddModal;
    let mountedStudentAddModal: any;
    const student: IStudentChecklist = {
        booked: false,
        id: "ID Checklist",
        status: "ACTIVE",
        student: {
            code: "1021805",
            email: "carlos@lacafetalab.pe",
            id: "hasfdqhj2geiu21y",
            name: "Carlos",
            photo: "https://www.imagenes.com/s3/aquivaunaimagenkawai.jpg"
        }
    };

    const content = "Contenido hijo del card";
    const options: IStudentModal ={
        loading: false,
        message: "Mensaje",
        user: student
    };
    const getComponent = () => {
        if (!mountedStudentAddModal) {
            mountedStudentAddModal = mount(
                <StudentAddModal {...props} children={content}/>
            );
        }
        return mountedStudentAddModal;
    };

    beforeEach(() => {
        props = {
            confirm: () => void(0),
            options
        };
        mountedStudentAddModal = undefined;
    });


    it("render: render StudentAddModal has the correct message", () => {
        const component = getComponent();
        expect(component.find('.StudentModalCard_message').text()).toEqual(props.options.message);
    });

    it("render: render StudentAddModal has the correct name", () => {
        const component = getComponent();
        const name = props.options.user && props.options.user.student.name || '';
        expect(component.find('.StudentModalCard_body-right').find(Text2).text()).toEqual(name);
    });

    it("render: render StudentAddModal has the correct code", () => {
        const component = getComponent();
        const name = props.options.user && props.options.user.student.code || '';
        expect(component.find('.StudentModalCard_body-right').find(Text3).text()).toEqual(name);
    });

    it("render: render StudentAddModal has the correct button text", () => {
        const component = getComponent();
        expect(component.find('button').text()).toEqual("Aceptar");
    });

    it("render: render StudentAddModal trigger click", () => {
        const click = jasmine.createSpy('click');
        props = {...props, confirm: click};
        const component = getComponent();
        component.find('button').simulate('click');
        expect(click).toHaveBeenCalled();
    });

    it("render: render StudentAddModal empty user", () => {
        const newOptions = {
            loading: false,
            message: "Mensaje",
            user: null
        };
        props.options = newOptions;
        const component = getComponent();
        expect(component.instance()).toEqual(null);
    });

    it("render: render StudentAddModal button has disable and enable attr", () => {
        const newOptions = {
            loading: true,
            message: "Mensaje",
            user: student
        };
        props.options = newOptions;
        const component = getComponent();
        expect(component.find('button[disabled]').length).toEqual(1);
        expect(component.find('button[loading]').length).toEqual(1);
    });
});

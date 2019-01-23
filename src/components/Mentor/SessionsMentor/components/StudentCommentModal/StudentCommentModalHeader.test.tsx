import { mount } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import StudentCommentModalHeader, {IPropsStudentCommentModalHeader} from './StudentCommentModalHeader';


describe('StudentCommentModalHeader Test',() => {
    let props: IPropsStudentCommentModalHeader;
    let mountedStudentCommentModalHeader: any;
    const getComponent = () => {
        if (!mountedStudentCommentModalHeader) {
            mountedStudentCommentModalHeader = mount(
                <StudentCommentModalHeader {...props} />
            );
        }
        return mountedStudentCommentModalHeader;
    };

    beforeEach(() => {
        props = {
            modal: {
                student: {
                    checked: false,
                    code: "1021809",
                    commented: false,
                    disabled: false,
                    id: "demo",
                    isEnabledForComment: true,
                    mentorComment: '',
                    name: "Franco",
                    new: false,
                    photo: "http://google.com/image.png",
                    studentId: "34234-4523f-w3-f3",
                    tags: []
                },
                tags: [{id: "1", name: "Volcano"}]
            }
        };
        mountedStudentCommentModalHeader = undefined;
    });

    it("render: render StudentCommentModalHeader add form", () => {
        const component = getComponent();
        expect(component.find('.StudentCommentModalHeader_message').text())
            .toEqual('Escribe una observación sobre');
    });

    it("render: render StudentCommentModalHeader readOnly form", () => {
        if (props.modal.student) {
            props.modal.student.commented = true;
            props.modal.comment = "Este es un comentario";
        }
        props.modal.tags = [{id: "", name: "Volcano"}];
        const component = getComponent();
        expect(component.find('.StudentCommentModalHeader_message').text())
            .toEqual('Escribiste una observación sobre');
    });

    it("render: render StudentCommentModalHeader student name", () => {
        const component = getComponent();
        expect(component.find('.StudentCommentModalHeader_body-right span').at(0).text())
            .toEqual("Franco");
    });

    it("render: render StudentCommentModalHeader student code", () => {
        const component = getComponent();
        expect(component.find('.StudentCommentModalHeader_body-right span').at(1).text())
            .toEqual("1021809");
    });

    it("render: render StudentCommentModalHeader student image", () => {
        const component = getComponent();
        expect(component.find('.StudentCommentModalHeader_image').prop('src'))
            .toEqual("http://google.com/image.png");
    });
});

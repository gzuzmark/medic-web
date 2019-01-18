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
                photo: "",
                studentId: "34234-4523f-w3-f3",
                tags: ["Flojera"]
            }
        };
        mountedStudentCommentModalHeader = undefined;
    });

    it("render: render StudentCommentModal enable tue", () => {
        const component = getComponent();
        expect(component.find('.StudentCommentModal_item--text'))
            .not.toEqual('No tienes alumnos inscritos. Puedes agregar alumnos a esta sesión.');
    });
});

import { mount } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import StudentCommentModal, {IPropsStudentCommentModal, ITagConfirm} from './StudentCommentModal';


describe('StudentCommentModal Test',() => {
    let props: IPropsStudentCommentModal;
    let mountedStudentCommentModal: any;
    const getComponent = () => {
        if (!mountedStudentCommentModal) {
            mountedStudentCommentModal = mount(
                <StudentCommentModal {...props} />
            );
        }
        return mountedStudentCommentModal;
    };

    beforeEach(() => {
        props = {
            cancel: () => void(0),
            confirm: (user: ITagConfirm) => void(0),
            loading: false,
            message:"",
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
                    photo: "",
                    studentId: "34234-4523f-w3-f3",
                    tags: ["Flojera"]
                },
                tags: [{id: "1", name: "Volcano"}]
            }
        };
        mountedStudentCommentModal = undefined;
    });

    it("render: render StudentCommentModal enable tue", () => {
        const component = getComponent();
        expect(component.find('.StudentCommentModal_item--text'))
            .not.toEqual('No tienes alumnos inscritos. Puedes agregar alumnos a esta sesión.');
    });
});

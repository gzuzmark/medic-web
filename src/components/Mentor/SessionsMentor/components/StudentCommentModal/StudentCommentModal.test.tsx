import {mount} from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import StudentCommentModal, {IPropsStudentCommentModal, ITagConfirm, ItemTag} from './StudentCommentModal';


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
                    tags: []
                },
                tags: [{id: "1", name: "Volcano"}]
            }
        };
        mountedStudentCommentModal = undefined;
    });

    it("render: tag text as addForm", () => {
        const component = getComponent();
        expect(component.find(".StudentModalCard_body span").at(0).text())
            .toEqual("¿En qué podría mejorar el alumno?")
    });

    it("render: comment text as addForm", () => {
        const component = getComponent();
        const length = component.find(".StudentModalCard_body span").length;
        expect(component.find(".StudentModalCard_body span").at(length - 1).text())
            .toEqual("Escribe un comentario")
    });

    it("render: tag text readOnly", () => {
        if (props.modal.student) {
            props.modal.student.commented = true;
        }
        props.modal.tags = [{id: "", name: "Volcano"}];
        const component = getComponent();
        expect(component.find(".StudentModalCard_body span").at(0).text())
            .toEqual("En qué podría mejorar el alumno")
    });

    it("render: comment text readOnly", () => {
        if (props.modal.student) {
            props.modal.student.commented = true;
            props.modal.comment = "Este es un comentario";
        }
        props.modal.tags = [{id: "", name: "Volcano"}];
        const component = getComponent();
        const length = component.find(".StudentModalCard_body span").length;
        expect(component.find(".StudentModalCard_body span").at(length - 2).text())
            .toEqual("Comentario")
    });

    it("render: set texts readOnly without comment", () => {
        if (props.modal.student) {
            props.modal.student.commented = true;
            props.modal.comment = "";
        }
        props.modal.tags = [{id: "", name: "Volcano"}];
        const component = getComponent();
        const length = component.find(".StudentModalCard_body span").length;
        expect(component.find(".StudentModalCard_body span").at(length - 2).text())
            .toEqual("")
    });

    it("render: one button as readOnly", () => {
        if (props.modal.student) {
            props.modal.student.commented = true;
            props.modal.comment = "Este es un comentario";
        }
        props.modal.tags = [{id: "", name: "Volcano"}];
        const component = getComponent();
        expect(component.find(".StudentModalCard_footer button").length)
            .toEqual(1)
    });

    it("render: one button as addForm", () => {
        const component = getComponent();
        expect(component.find(".StudentModalCard_footer button").length)
            .toEqual(2)
    });

    it("render: button save should be disable at the beginning", () => {
        const component = getComponent();
        expect(component.find(".StudentModalCard_footer button").at(1).prop('disabled'))
            .toEqual("true");
    });

    it("render: render text tag correctly", () => {
        const component = getComponent();
        expect(component.find(".StudentModalCard_tags label").at(0).text())
            .toEqual("Volcano");
    });

    it("event: cancel button works", () => {
        const click = jasmine.createSpy('click');
        props.cancel = click;
        const component = getComponent();
        component.find(".StudentModalCard_footer button").at(0).simulate("click", "");
        expect(click).toHaveBeenCalled();
    });

    it("event: accept button works", () => {
        const click = jasmine.createSpy('click');
        if (props.modal.student) {
            props.modal.student.commented = true;
            props.modal.comment = "Este es un comentario";
        }
        props.modal.tags = [{id: "", name: "Volcano"}];
        props.cancel = click;
        const component = getComponent();
        component.find(".StudentModalCard_footer button").simulate("click", "");
        expect(click).toHaveBeenCalled();
    });

    it("render: button save is enable after trigger click on tag", () => {
        props.modal.tags = [{id: "", name: "Volcano 1"}, {id: "", name: "Volcano 2"}, {id: "", name: "Volcano 3"}];
        const component = getComponent();
        expect(component.find(".StudentModalCard_tags label").length)
            .toEqual(3);
    });

    it("event: button save is enable after trigger click on tag", () => {
        const component = getComponent();
        const event = {target: {name: "Volcano", value: "1"}};
        component.find(".StudentModalCard_tags label").at(0).simulate('change', event);
        component.update();
        component.
        expect(component.find(".StudentModalCard_footer button").at(1).prop('disabled'))
            .not.toEqual("true");
    });

    /*
    it("event: button save is enable after trigger click on tag", () => {
        const component = getComponent();
        const event = {target: {name: "Volcano", value: "1"}};
        component.find(".StudentModalCard_tags label").at(0).simulate('change', event);
        component.update();
        expect(component.find(".StudentModalCard_footer button").at(1).prop('disabled'))
            .not.toEqual("true");
    });
    */
});

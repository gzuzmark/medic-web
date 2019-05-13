import { mount } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import Icon from "../../../../../common/Icon/Icon";
import StudentFullCard, {IPropsStudentFullCard, IStudentChecklistCard} from './StudentFullCard';


describe('StudentFullCard Test',() => {
    const click = jasmine.createSpy('click');
    // expect(click).toHaveBeenCalled();
    let props: IPropsStudentFullCard;
    let mounted: any;
    const student: IStudentChecklistCard ={
        checked: false,
        code: "1021805",
        commented: false,
        disabled: false,
        id: "zeld1234",
        isEnabledForComment: true,
        mentorComment: "",
        name: "Rojo",
        new: false,
        photo: "https://www.mozilla.org/media/img/logos/firefox/logo-quantum-high-res.cfd87a8f62ae.png",
        studentId: "34234-4523f-w3-f3",
        tags: ["Flojera"]
    };
    const getComponent = () => {
        if (!mounted) {
            mounted = mount(
                <StudentFullCard {...props} />
            );
        }
        return mounted;
    };

    beforeEach(() => {
        props = {
            showTagModal: click,
            student,
            styles: {},
            updateSelection: () => void(0)
        };
        mounted = undefined;
    });

    it("render: render StudentFullCard same text at right side", () => {
        const component = getComponent();
        expect(component.find('.StudentFullCard_right').text())
            .toEqual(`${student.name}${student.code}`);
    });

    it("render: render StudentFullCard icon at left side", () => {
        const component = getComponent();
        expect(component.find('.StudentFullCard_option-comment').find(Icon).length).toEqual(1);
    });
});

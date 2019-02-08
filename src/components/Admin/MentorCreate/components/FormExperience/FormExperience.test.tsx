import { mount } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import FormExperience, {SubTitle} from "./FormExperience";

describe.skip('FormExperience Test',() => {
    let props: any;
    let mountedComponent: any;
    const getComponent = () => {
        if (!mountedComponent) {
            mountedComponent = mount(
                <FormExperience {...props} />
            );
        }
        return mountedComponent;
    };

    beforeEach(() => {
        props = {};
        mountedComponent = undefined;
    });

    it("render: should have only one title", () => {
        const component = getComponent();
        expect(component.find(SubTitle).length).toEqual(1);
    });

    it("render: should have only one title when list have more than one items", () => {
        const component = getComponent();
        expect(component.find(SubTitle).length).toEqual(1);
    });

    it("render: should have only one add option in item list", () => {
        const component = getComponent();
        expect(component.find('.FormExperience_item').at(0).find("button").length)
            .toEqual(2);
        expect(component.find('.FormExperience_item').at(0).find("button").at(1).text())
            .toEqual("Agregar experiencia laboral")
    });

    it("render: delete should be disable when there is only one item", () => {
        const component = getComponent();
        expect(component.find('.FormExperience_item').at(0).find("button").at(0).text())
            .toEqual("Eliminar");
        expect(component.find('.FormExperience_item').at(0).find("button").at(0).prop('disabled'))
            .toEqual(true)
    });

    it("event: add event should be called", () => {
        const click = jasmine.createSpy('click');
        props.cancel = click;
        const component = getComponent();
        component.find('.FormExperience_item').at(0).find("button").at(1).simulate("click", "");
        expect(click).toHaveBeenCalled();
    });

    it("event: delete should not be called when there is only one item", () => {
        const click = jasmine.createSpy('click');
        props.cancel = click;
        const component = getComponent();
        component.find('.FormExperience_item').at(0).find("button").at(0).simulate("click", "");
        expect(click).not.toHaveBeenCalled();
    });

    it("event: delete event should be called when there is more than one item", () => {
        const click = jasmine.createSpy('click');
        props.cancel = click;
        const component = getComponent();
        component.find('.FormExperience_item').at(0).find("button").at(0).simulate("click", "");
        expect(click).toHaveBeenCalled();
    });

});

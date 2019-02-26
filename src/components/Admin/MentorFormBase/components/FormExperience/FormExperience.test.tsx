import { mount } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import {IMentorFormBaseContext} from "../../MentorFormBase.context";
import {getDefaultValues} from "../../MentorFormBase.mock";

const getContext = (context: IMentorFormBaseContext) => {
    jest.doMock('../../MentorFormBase.context', () => {
        return {
            default: {
                Consumer: (props: any) => props.children(context)
            }
        }
    });
    return require('./FormExperience').default;
};


describe('FormExperience Test',() => {
    let props: any;
    let ctxt: IMentorFormBaseContext;
    let mountedComponent: any;
    const getComponent = () => {
        if (!mountedComponent) {
            const FormExperience = getContext(ctxt);
            mountedComponent = mount(
                <FormExperience {...props} />
            );
        }
        return mountedComponent;
    };

    beforeEach(() => {
        jest.resetModules();
        props = {};
        ctxt = getDefaultValues();
        mountedComponent = undefined;
    });

    it("render: should have only one title", () => {
        const component = getComponent();
        expect(component.find('h4').length).toEqual(1);
    });

    it("render: should have only one title when list have more than one items", () => {
        ctxt.values.experiences =  [{
            company: '',
            fromMonth: '',
            fromYear: '',
            position: '' ,
            toMonth:  '',
            toYear:  ''
        },{
            company: '',
            fromMonth: '',
            fromYear: '',
            position: '' ,
            toMonth:  '',
            toYear:  ''
        }];
        const component = getComponent();
        expect(component.find('h4').length).toEqual(1);
    });

    it("render: should have only one add option in item list with one item,", () => {
        const component = getComponent();
        expect(component.find('.ExperienceItem').at(0).find("button").length)
            .toEqual(2);
        expect(component.find('.ExperienceItem').at(0).find("button").at(1).text())
            .toEqual("Agregar experiencia laboral")
    });

    it("render: should have only one add option in item list with two items", () => {
        ctxt.values.experiences =  [{
            company: '',
            fromMonth: '',
            fromYear: '',
            position: '' ,
            toMonth:  '',
            toYear:  ''
        },{
            company: '',
            fromMonth: '',
            fromYear: '',
            position: '' ,
            toMonth:  '',
            toYear:  ''
        }];
        const component = getComponent();
        expect(component.find('.ExperienceItem').at(0).find("button").length)
            .toEqual(1);
        expect(component.find('.ExperienceItem').at(1).find("button").at(0).text())
            .toEqual("Eliminar")
    });

    it("render: delete should be disable when there is only one item", () => {
        const component = getComponent();
        expect(component.find('.ExperienceItem').at(0).find("button").at(0).text())
            .toEqual("Eliminar");
        expect(component.find('.ExperienceItem').at(0).find("button").at(0).prop('disabled'))
            .toEqual(true)
    });

    it("event: delete should not be called when there is only one item", () => {
        const click = jasmine.createSpy('click');
        props.cancel = click;
        const component = getComponent();
        component.find('.ExperienceItem').at(0).find("button").at(0).simulate("click", "");
        expect(click).not.toHaveBeenCalled();
    });
});

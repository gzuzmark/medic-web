import { mount } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import colors from "../../../../../common/MentorColor";
import Step, {StepCircle, StepCircleText, StepText} from "./Step";

describe('Step Test',() => {
    let props: any;
    let mountedComponent: any;
    const getComponent = () => {
        if (!mountedComponent) {
            mountedComponent = mount(
                <Step {...props} />
            );
        }
        return mountedComponent;
    };

    beforeEach(() => {
        props = {
            active: false,
            click: () => void(0),
            complete: false,
            step: 1,
            title: "Correo"
        };
        mountedComponent = undefined;
    });

    it("render: Show step number", () => {
        const component = getComponent();
        expect(component.find(StepCircleText).children().text())
            .toEqual("1")
    });

    it("render: Show step description", () => {
        const component = getComponent();
        expect(component.find(StepText).children().text())
            .toEqual("Correo")
    });

    it("render: Show active step", () => {
        props = {...props, active: true};
        const component = getComponent();
        const stepCircleTree = component.find(StepCircle);
        const stepTextTree = component.find(StepText);
        const stepCircleTextTree = component.find(StepCircleText);
        expect(stepCircleTree).toHaveStyleRule('background', colors.BACKGROUND_COLORS.background_white);
        expect(stepCircleTree).toHaveStyleRule('border', `3px solid ${colors.BACKGROUND_COLORS.background_purple}`);
        expect(stepTextTree).toHaveStyleRule('color', colors.MISC_COLORS.background_grey_2);
        expect(stepCircleTextTree).toHaveStyleRule('color', colors.BACKGROUND_COLORS.background_purple);
    });

    it("render: Show complete step", () => {
        props = {...props, complete: true};
        const component = getComponent();
        const stepCircleTree = component.find(StepCircle);
        const stepTextTree = component.find(StepText);
        const stepCircleTextTree = component.find(StepCircleText);
        expect(stepCircleTree).toHaveStyleRule('background', colors.BACKGROUND_COLORS.background_purple);
        expect(stepCircleTree).toHaveStyleRule('border', `3px solid ${colors.BACKGROUND_COLORS.background_purple}`);
        expect(stepTextTree).toHaveStyleRule('color', colors.MISC_COLORS.background_blue);
        expect(stepCircleTextTree).toHaveStyleRule('color', colors.BACKGROUND_COLORS.background_white);
    });

    it("render: Show active and complete step", () => {
        props = {...props, active: true, complete: true};
        const component = getComponent();
        const stepCircleTree = component.find(StepCircle);
        const stepTextTree = component.find(StepText);
        const stepCircleTextTree = component.find(StepCircleText);
        expect(stepCircleTree).toHaveStyleRule('background', colors.BACKGROUND_COLORS.background_white);
        expect(stepCircleTree).toHaveStyleRule('border', `3px solid ${colors.BACKGROUND_COLORS.background_purple}`);
        expect(stepTextTree).toHaveStyleRule('color', colors.MISC_COLORS.background_grey_2);
        expect(stepCircleTextTree).toHaveStyleRule('color', colors.BACKGROUND_COLORS.background_purple);
    });

    it("events: Trigger click on selected step", () => {
        const click = jasmine.createSpy('click');
        props = {...props, click};
        const component = getComponent();
        component.simulate("click", "");
        expect(click).toHaveBeenCalled();
    });


});

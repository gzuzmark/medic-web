import { mount } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import Step from "../Step/Step";
import StepsBar, {StepsBarContainer} from "./StepsBar";

describe('StepsBar Test',() => {
    let props: any;
    let mountedComponent: any;
    const getComponent = () => {
        if (!mountedComponent) {
            mountedComponent = mount(
                <StepsBar {...props} />
            );
        }
        return mountedComponent;
    };

    beforeEach(() => {
        props = {
            click: () => void(0),
            steps:[
                    {
                        active: false,
                        complete: false,
                        title: "Correo",
                    },
                    {
                        active: false,
                            complete: false,
                        title: "Datos personales",
                    },
                    {
                        active: false,
                            complete: false,
                        title: "Confirmación",
                    }
                ]
        };
        mountedComponent = undefined;
    });

    it("render: Show progress as 0", () => {
        const component = getComponent();
        expect(component.find(StepsBarContainer).props().progress)
            .toEqual(0)
    });

    it("render: Show progress as 0.5 if one step from three is completed", () => {
        const steps = [
            {
                active: false,
                complete: true,
                title: "Correo",
            },
            {
                active: false,
                complete: false,
                title: "Datos personales",
            },
            {
                active: false,
                complete: false,
                title: "Confirmación",
            }
            ];
        props = {...props, steps};
        const component = getComponent();
        expect(component.find(StepsBarContainer).props().progress)
            .toEqual(0.5)
    });

    it("render: Show progress as 1 if two step from three is completed", () => {
        const steps = [
            {
                active: false,
                complete: true,
                title: "Correo",
            },
            {
                active: false,
                complete: true,
                title: "Datos personales",
            },
            {
                active: false,
                complete: false,
                title: "Confirmación",
            }
        ];
        props = {...props, steps};
        const component = getComponent();
        expect(component.find(StepsBarContainer).props().progress)
            .toEqual(1)
    });

    it("render: Show progress as 1 if two step from three is completed", () => {
        const steps = [
            {
                active: false,
                complete: true,
                title: "Correo",
            },
            {
                active: false,
                complete: true,
                title: "Datos personales",
            },
            {
                active: false,
                complete: true,
                title: "Confirmación",
            }
        ];
        props = {...props, steps};
        const component = getComponent();
        expect(component.find(StepsBarContainer).props().progress)
            .toEqual(1)
    });

    it("render: Show three steps", () => {
        const component = getComponent();
        expect(component.find(Step).length)
            .toEqual(3)
    });

    it("events: Trigger click on selected step", () => {
        const click = jasmine.createSpy('click');
        props = {...props, click};
        const component = getComponent();
        component.find(Step).at(0).simulate("click", "");
        expect(click).toHaveBeenCalled();
    });

});

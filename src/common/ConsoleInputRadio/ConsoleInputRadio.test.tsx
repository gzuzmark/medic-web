import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import ConsoleInputRadio from "./ConsoleInputRadio";


describe('ConsoleInputRadio Test',() => {
    let props: any;
    let mountedConsoleInputRadio: any;
    const getComponent = () => {
        if (!mountedConsoleInputRadio) {
            mountedConsoleInputRadio = shallow(
                <ConsoleInputRadio {...props} />
            );
        }
        return mountedConsoleInputRadio;
    };

    beforeEach(() => {
        props = {
            attrs: {
                checked: false,
                name: 'demo',
                onChange: () => void(0),
                value: "value"
            },
            title: 'Demo'
        };
        mountedConsoleInputRadio = undefined;
    });



    it("render: render ConsoleInputRadio", () => {
        const component = getComponent();
        expect(toJson(component)).toMatchSnapshot();
    });
});

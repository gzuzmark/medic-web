import { shallow } from 'enzyme';
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
            checked: false,
            name: 'demo',
            onChange: () => void(0),
            title: 'Demo',
            value: "value",
        };
        mountedConsoleInputRadio = undefined;
    });



    it("render: render ConsoleInputRadio", () => {
        const component = getComponent();
        expect(component).toMatchSnapshot();
    });
});
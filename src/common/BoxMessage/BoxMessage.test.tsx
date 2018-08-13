import { shallow } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import BoxMessage from './BoxMessage';

describe('BoxMessage Test',() => {
    let props: any;
    let mountedBoxMessage: any;
    const getComponent = () => {
        if (!mountedBoxMessage) {
            mountedBoxMessage = shallow(
                <BoxMessage {...props}>Caja de Mensajes</BoxMessage>
            );
        }
        return mountedBoxMessage;
    };

    beforeEach(() => {
        props = {
            show: true,
            type: ''
        };
        mountedBoxMessage = undefined;
    });

    it("render: render BoxMessage", () => {
        props = {
            show: true,
            type: 'error'
        };
        const component = getComponent();
        expect(component).toMatchSnapshot();
    });

    it("render: render BoxMessage should be null", () => {
        props = {
            show: false,
            type: 'error'
        };
        const component = getComponent().find('.BoxMessage');
        expect(component.length).toBe(0);
    });

});
import { mount } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import ConfirmButtons from './ConfirmButtons';

describe('ConfirmButtons Test',() => {
    let props: any;
    let mountedConfirmButtons: any;
    const getComponent = () => {
        if (!mountedConfirmButtons) {
            mountedConfirmButtons = mount(
                <ConfirmButtons {...props} />
            );
        }
        return mountedConfirmButtons;
    };

    beforeEach(() => {
        props = {
            cancelText: "Cancelar",
            confirmText: "Confirmar",
            disabled: false,
            loading: false,
            onCancel: () => {
                //
            },
            onConfirm: () => {
                //
            },
        };
        mountedConfirmButtons = undefined;
    });

    it("render: render ConfirmButtons", () => {
        const component = getComponent();
        expect(component).toMatchSnapshot();
    });

    it("render: click on cancel button", () => {
        const click = jasmine.createSpy('click');
        const newProps = {...props};
        newProps.onCancel = click;
        props = newProps;
        const component = getComponent();
        component.find('.ConfirmButtons-button').first().simulate('click');
        expect(click).toHaveBeenCalled();
    });

    it("render: click on confirm button", () => {
        const click = jasmine.createSpy('click');
        const newProps = {...props};
        newProps.onConfirm = click;
        props = newProps;
        const component = getComponent();
        component.find('.ConfirmButtons-button').at(1).simulate('click');
        expect(click).toHaveBeenCalled();
    });

});

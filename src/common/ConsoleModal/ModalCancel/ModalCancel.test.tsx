import { shallow } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import ModalCancel from './ModalCancel';


describe('ModalCancel Test',() => {
    let props: any;
    let mountedModalCancel: any;
    const getComponent = () => {
        if (!mountedModalCancel) {
            mountedModalCancel = shallow(
                <ModalCancel {...props}>Contenido de la Modal</ModalCancel>
            );
        }
        return mountedModalCancel;
    };

    beforeEach(() => {
        props = {
            disabled: false,
            loading: false,
            onCancel: () => {
                //
            },
            onConfirm: () => {
                //
            },
            show: true,
            title: 'Titulo de la modal'
        };
        mountedModalCancel = undefined;
    });

    it("render: render ModalCancel", () => {
        const component = getComponent();
        expect(component).toMatchSnapshot();
    });
});
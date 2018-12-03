import { shallow } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import ModalConfirmDelete from './ModalConfirmDelete';


describe('ModalConfirmDelete Test',() => {
    let props: any;
    let mountedModalConfirmDelete: any;
    const getComponent = () => {
        if (!mountedModalConfirmDelete) {
            mountedModalConfirmDelete = shallow(
                <ModalConfirmDelete {...props}>Contenido de la Modal</ModalConfirmDelete>
            );
        }
        return mountedModalConfirmDelete;
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
            show: true
        };
        mountedModalConfirmDelete = undefined;
    });

    it("render: render ModalConfirmDelete", () => {
        const component = getComponent();
        expect(component).toMatchSnapshot();
    });
});
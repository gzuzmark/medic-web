import { shallow } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import FormRemoveMultiple from './FormRemoveMultiple';


describe('FormRemoveMultiple Test',() => {
    let props: any;
    let mountedFormRemoveMultiple: any;
    const getComponent = () => {
        if (!mountedFormRemoveMultiple) {
            mountedFormRemoveMultiple = shallow(
                <FormRemoveMultiple {...props}>Contenido de la Modal</FormRemoveMultiple>
            );
        }
        return mountedFormRemoveMultiple;
    };

    beforeEach(() => {
        props = {
            currentSession: {},
            lists: {
                areas: [],
                locations: [],
                rooms: [],
                skills: [],
                types: []
            },
            onSearch: () => {
                //
            }
        };
        mountedFormRemoveMultiple = undefined;
    });

    it("render: render FormRemoveMultiple", () => {
        const component = getComponent();
        expect(component).not.toBe(null);
    });
});
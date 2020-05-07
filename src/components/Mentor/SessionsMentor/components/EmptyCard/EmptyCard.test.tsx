import { mount } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import EmptyCard, {IPropsEmptyCard} from './EmptyCard';


describe('EmptyCard Test',() => {
    let props: IPropsEmptyCard;
    let mountedEmptyCard: any;
    const getComponent = () => {
        if (!mountedEmptyCard) {
            mountedEmptyCard = mount(
                <EmptyCard {...props} />
            );
        }
        return mountedEmptyCard;
    };

    beforeEach(() => {
        props = {
            addEnabled: true
        };
        mountedEmptyCard = undefined;
    });

    it("render: render EmptyCard enable tue", () => {
        const component = getComponent();
        expect(component.find('.EmptyCard_item--text').text())
            .toEqual('No tienes pacientes inscritos. Puedes agregar pacientes a esta sesión.');
    });

    it("render: render EmptyCard enable false", () => {
        props = {
            addEnabled: false
        };
        const component = getComponent();
        expect(component.find('.EmptyCard_item--text').text())
            .toEqual('No tienes pacientes inscritos.');
    });
});

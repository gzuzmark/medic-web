import { mount } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import { TextBold3, Title2 } from '../../../../../common/ConsoleText';
import SimpleFullCard, {IPropsSimpleFullCard, ISimpleFullCard} from './SimpleFullCard';

describe('SimpleFullCard Test',() => {
    let props: IPropsSimpleFullCard;
    let mountedSimpleFullCard: any;
    const sessionFull: ISimpleFullCard ={
        description: "Descripcion del card",
        isLink: false,
        subtitle: "Sub titulo del card",
        title: "Titulo del card"
    };
    const content = "Contenido hijo del card";
    const getComponent = () => {
        if (!mountedSimpleFullCard) {
            mountedSimpleFullCard = mount(
                <SimpleFullCard {...props} children={content} />
            );
        }
        return mountedSimpleFullCard;
    };

    beforeEach(() => {
        props = {
            card: sessionFull
        };
        mountedSimpleFullCard = undefined;
    });

    it("render: render SimpleFullCard title", () => {
        const component = getComponent();
        expect(component.find(Title2).text())
            .toEqual(sessionFull.title);
    });

    it("render: render SimpleFullCard subtitle", () => {
        const component = getComponent();
        expect(component.find(TextBold3).text())
            .toEqual(sessionFull.subtitle);
    });

    it("render: render SimpleFullCard description as isLink false", () => {
        const component = getComponent();
        expect(component.find('span.SimpleFullCard_description').text())
            .toEqual(sessionFull.description);
    });

    it("render: render SimpleFullCard description as isLink true", () => {
        props.card.isLink = true;
        const component = getComponent();
        expect(component.find('a.SimpleFullCard_description').text())
            .toEqual(sessionFull.description);
    });

    it("render: render SimpleFullCard children", () => {
        props.card.isLink = false;
        const component = getComponent();
        expect(component.find('.SimpleFullCard_body').text())
            .toEqual(content);
    });


});

import { mount } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import Icon from "../../common/Icon/Icon";
import ContentModal, {IGenericContentModal, IPropsGenericContentModal} from './ContentModal';


describe('ContentModal Test',() => {
    let click = jasmine.createSpy('click');
    let props: IPropsGenericContentModal;
    let mounted: any;
    const generic: IGenericContentModal ={
        button: "Guardar",
        description: "Pequeña descripcion",
        image: null,
        title: "titulo",
    };
    const getComponent = () => {
        if (!mounted) {
            mounted = mount(
                <ContentModal.Generic {...props} />
            );
        }
        return mounted;
    };

    beforeEach(() => {
        click = jasmine.createSpy('click');
        props = {
            confirm: click,
            generic: {...generic},
            loading: false
        };
        mounted = undefined;
    });

    it("render: render ContentModal correct title", () => {
        const component = getComponent();
        expect(component.find('.GenericContentModal_title').text())
            .toEqual(`${generic.title}`);
    });

    it("render: render ContentModal correct no title", () => {
        props.generic.title = '';
        const component = getComponent();
        expect(component.find('.GenericContentModal_title').length)
            .toEqual(0);
    });


    it("render: render ContentModal correct description", () => {
        const component = getComponent();
        expect(component.find('.GenericContentModal_description').text())
            .toEqual(`${generic.description}`);
    });

    it("render: render ContentModal correct no description", () => {
        props.generic.description = '';
        const component = getComponent();
        expect(component.find('.GenericContentModal_description').length)
            .toEqual(0);
    });

    it("render: render ContentModal correct button", () => {
        const component = getComponent();
        expect(component.find('.GenericContentModal_button').text())
            .toEqual(`${generic.button}`);
    });

    it("render: render ContentModal correct no button", () => {
        props.generic.button = '';
        const component = getComponent();
        expect(component.find('.GenericContentModal_button').length)
            .toEqual(0);
    });

    it("render: render ContentModal icon", () => {
        props.generic.image = <Icon name={"book"} />;
        const component = getComponent();
        expect(component.find(Icon).length)
            .toEqual(1);
    });

    it("event: call confirm on click", () => {
        const component = getComponent();
        component.find(".GenericContentModal_button").simulate('click');
        expect(click).toHaveBeenCalled();
    });
});

import { mount } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import colors from "../MentorColor";
import {Body1} from "../MentorText";
import MentorTextArea, {IPropsMentorTextArea, TextAreaComponent} from "./MentorTextArea";


describe('MentorTextArea Test',() => {
    let props: IPropsMentorTextArea;
    let mountedReportTable: any;
    const getComponent = () => {
        if (!mountedReportTable) {
            mountedReportTable = mount(
                <MentorTextArea {...props} />
            );
        }
        return mountedReportTable;
    };

    beforeEach(() => {
        props = {};
        mountedReportTable = undefined;
    });

    it("render: label should be 'Campo TextArea'", () => {
        props = {
            label: "Campo TextArea"
        };
        const component = getComponent();
        expect(component.find("label").find(Body1).children().text()).toEqual("Campo TextArea");
    });

    it("render: limit should be '0/200'", () => {
        props = {
            limit: 200
        };
        const component = getComponent();
        expect(component.find(Body1).children().text()).toEqual("0/200");
    });


    it("render: limit should be '180'", () => {
        props = {
            attrs: {
                onChange: () => '',
                value: "este es el texto"
            },
            limit: 180
        };
        const component = getComponent();
        expect(component.find(Body1).children().text()).toEqual(`${props.attrs.value.length}/180`);
    });

    it("render: error color on limit text", () => {
        props = {
            attrs: {
                onChange: () => '',
                value: "este es un texto mas grande que el del limite"
            },
            limit: 10
        };
        const component = getComponent();
        expect(component.find(Body1).props().color).toEqual(`font_error`);
    });

    it("render: error color on text area", () => {
        props = {
            attrs: {
                onChange: () => '',
                value: "este es un texto mas grande que el del limite"
            },
            limit: 10
        };
        const component = getComponent();
        const textAreaComponentTree = component.find(TextAreaComponent);
        expect(textAreaComponentTree).toHaveStyleRule('border', `1px solid ${colors.TEXT_COLORS.font_error}`);
    });
});

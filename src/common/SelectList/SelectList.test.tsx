import { shallow } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import SelectList from './SelectList';


describe('SelectList Test',() => {
    let props: any;
    let mountedSelectList: any;
    const selectList = () => {
        if (!mountedSelectList) {
            mountedSelectList = shallow(
                <SelectList {...props} />
            );
        }
        return mountedSelectList;
    };

    beforeEach(() => {
        props = {
            list: undefined,
            onChange: undefined,
            removeFilters: undefined,
        };
        mountedSelectList = undefined;
    });

    it("render: render SelectList with no items", () => {
        props = {
            list: [],
            onChange: () => void(0),
        };
        const item = selectList().find(".SelectList-item");
        expect(item.length).toEqual(0)
    });

    it("render: render SelectList items", () => {
        props = {
            list: [{
                id: 'a',
                name: 'item a'
            },{
                id: 'b',
                name: 'item b'
            }],
            onChange: () => void(0),
        };
        const item = selectList().find(".SelectList-item");
        expect(item.length).toEqual(2)
    });

    it("render: render SelectList items and 'Mostrar todo' item", () => {
        props = {
            list: [{
                id: 'a',
                name: 'item a'
            },{
                id: 'b',
                name: 'item b'
            }],
            onChange: () => void(0),
            removeFilters: () => void(0)
        };
        const item = selectList().find(".SelectList-item");
        expect(item.length).toEqual(3)
    });

    it("events: click item on SelectList", () => {
        const click = jasmine.createSpy('click');
        props = {
            list: [{
                id: 'a',
                name: 'item a'
            },{
                id: 'b',
                name: 'item b'
            }],
            onChange: click,
        };
        selectList().find(".SelectList-item").first().simulate('click');
        expect(click).toHaveBeenCalled();
    });

    it("events: click removeFilters on SelectList", () => {
        const click = jasmine.createSpy('click');
        props = {
            list: [{
                id: 'a',
                name: 'item a'
            },{
                id: 'b',
                name: 'item b'
            }],
            onChange: void(0),
            removeFilters: click
        };
        selectList().find(".SelectList-item").last().simulate('click');
        expect(click).toHaveBeenCalled();
    });
});
// tslint:disable:no-string-literal
import { mount } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import {IMentorFormBaseContext} from "../../MentorFormBase.context";
import { getDefaultValues } from "../../MentorFormBase.mock";
import {IPropsFormImage} from "./FormImage";

jest.doMock('react-responsive-modal', () => {
    return {
        default: (props: any) => <div>props.children()</div>
    }
});

const getContext = (context: IMentorFormBaseContext) => {
    jest.doMock('../../MentorFormCreate.context', () => {
        return {
            default: {
                Consumer: (props: any) => props.children(context)
            }
        }
    });
    return require('./FormImage').default;
};

describe('FormImage Test',() => {
    let props: IPropsFormImage;
    let ctxt: IMentorFormBaseContext;
    let mountedComponent: any;
    const src = 'image_content.jpeg';
    const file = new Blob([src], {type : 'image/jpeg'});
    const readAsDataURL = jest.fn();
    const addEventListener = jest.fn((_, evtHandler) => { evtHandler(); });
    const dummyFileReader = {addEventListener, readAsDataURL, result: src};
    window["FileReader"] = jest.fn(() => dummyFileReader);
    const getComponent = () => {
        if (!mountedComponent) {
            const FormImage = getContext(ctxt);
            mountedComponent = mount(
                <FormImage {...props} />
            );
        }
        return mountedComponent;
    };

    beforeEach(() => {
        jest.resetModules();
        props = {
            id: "ImageLoader"
        };
        ctxt = getDefaultValues();
        mountedComponent = undefined;
    });

    it("render: modal should be hidden", () => {
        const component = getComponent();
        expect(component.find(".FormImage_modal").length).toEqual(0);
    });

    // todo: manage modal render and then validate this test case
    it.skip("events: on change input file the modal is visible render", () => {
        const component = getComponent();
        component.find('input').simulate('change', {target: {files: [file]}});
        expect(component.find(".FormImage_modal").length).toEqual(1);
    });

    it("events: on change input file the modal is visible state", () => {
        const component = getComponent();
        const instance = component.instance();
        component.find('input').simulate('change', {target: {files: [file]}});
        const expectedFinalState = {
            crop: {
                aspect: 1,
                width: 40,
                x: 0,
                y: 0,
            },
            croppedTmp: "",
            loading: false,
            modal: true,
            src: "image_content.jpeg"
        };
        const {selectedFile, ...state} = instance.state;
        expect(state).toEqual(expectedFinalState);
    });

    it("events: on change crop position", () => {
        const component = getComponent();
        const instance = component.instance();
        const crop = {aspect: 16/16, width: 40, x: 0, y: 0};
        spyOn(instance, 'setState').and.callThrough();
        instance.onCropChange(crop);
        expect(instance.setState).toHaveBeenCalledWith({crop})
    });

    it.skip("events: on uploadImage call setFieldValue", async () => {
        ctxt.setFieldValue = jasmine.createSpy('click');
        const component = getComponent();
        const instance = component.instance();
        await instance.uploadImage(ctxt)();
        expect(ctxt.setFieldValue).toHaveBeenCalled();
    });

    it("events: on uploadImage call setState", () => {
        const component = getComponent();
        const instance = component.instance();
        spyOn(instance, 'setState').and.callThrough();
        instance.uploadImage(() => "")();
        expect(instance.setState).toHaveBeenCalled();
    });

    it("events: on closeModal", () => {
        const component = getComponent();
        const instance = component.instance();
        spyOn(instance, 'setState').and.callThrough();
        instance.closeModal();
        expect(instance.setState).toHaveBeenCalledWith({modal: false});
    });


    it("events: on onImageLoaded", () => {
        const component = getComponent();
        const instance = component.instance();
        spyOn(instance, 'setState').and.callThrough();
        const pixelCrop = {height: 40, width: 40, x: 0, y: 0};
        instance.onImageLoaded("image object", pixelCrop);
        expect(instance.imageRef).toEqual("image object");
    });


    it("events: on onCropComplete", () => {
        const component = getComponent();
        const instance = component.instance();
        component.find('input').simulate('change', {target: {files: [file]}});
        const pixelCrop = {height: 40, width: 40, x: 0, y: 0};
        spyOn(instance, 'getCroppedImg').and.callThrough();
        instance.onImageLoaded("image object", pixelCrop);
        instance.onCropComplete(pixelCrop, pixelCrop);
        const params = {
            fileName: "newFile.jpeg",
            image: "image object",
            pixelCrop
        };
        expect(instance.getCroppedImg).toHaveBeenCalledWith(params.image, params.pixelCrop, params.fileName);
    });

});

import { shallow } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import FormImage, {ImageProfile} from "./FormImage";

describe('FormImage Test',() => {
    let props: any;
    let mountedComponent: any;
    const src = 'image_content.jpeg';
    const file = new Blob([src], {type : 'image/jpeg'});
    const readAsDataURL = jest.fn();
    const addEventListener = jest.fn((_, evtHandler) => { evtHandler(); });
    const dummyFileReader = {addEventListener, readAsDataURL, result: src};
    // tslint:disable:no-string-literal
    window["FileReader"] = jest.fn(() => dummyFileReader);
    const getComponent = () => {
        if (!mountedComponent) {
            mountedComponent = shallow(
                <FormImage {...props} />
            );
        }
        return mountedComponent;
    };

    beforeEach(() => {
        props = {
            id: "ImageLoader"
        };
        mountedComponent = undefined;
    });

    it("render: modal should be hidden", () => {
        const component = getComponent();
        expect(component.find(".FormImage_modal").length).toEqual(0);
    });

    it("render: image should not have border", () => {
        const component = getComponent();
        expect(component.find(ImageProfile)).toHaveStyleRule('border', 'none');
    });

    it("events: on change input file the modal is visible", () => {
        const component = getComponent();
        component.find('input').simulate('change', {target: {files: [file]}});
        expect(component.find(".FormImage_modal").length).toEqual(1);
    });

    it("events: on change input file the modal is visible", () => {
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
            croppedImage: "",
            croppedTmp: "",
            loading: false,
            modal: true,
            src: "image_content.jpeg"
        };
        expect(instance.state).toEqual(expectedFinalState);
    });

    it("events: on change crop position", () => {
        const component = getComponent();
        const instance = component.instance();
        const crop = {aspect: 16/16, width: 40, x: 0, y: 0};
        spyOn(instance, 'setState').and.callThrough();
        instance.onCropChange(crop);
        expect(instance.setState).toHaveBeenCalledWith({crop})
    });

    it("events: on updateImage", () => {
        const component = getComponent();
        const instance = component.instance();
        spyOn(instance, 'setState').and.callThrough();
        instance.updateImage();
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

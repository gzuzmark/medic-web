import { expect } from 'chai';
import { mount } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import LoginPresentation from "./components/LoginPresentation/LoginPresentation";
import {default as Login} from './Login';

describe('Login Test',() => {
    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Login />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('LoginPresentation exist', () => {
        const wrapper = mount(<Login />);
        // const instance = wrapper.instance();
        expect(wrapper.find(LoginPresentation)).to.have.length(1);
    })
});
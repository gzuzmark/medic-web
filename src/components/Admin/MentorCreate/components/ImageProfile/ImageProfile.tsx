import styled from "styled-components";
import colors from "../../../../../common/MentorColor";

interface IPropsImageProfile {
    filled: boolean;
}

const ImageProfile = styled.img`
    border-radius: 50%;
    border: ${(props: IPropsImageProfile) => {
    let border = 'none';
    if (props.filled) {
        border = '2px solid ' + colors.BACKGROUND_COLORS.background_purple;
    }
    return border;
}}
`;

export default ImageProfile;

/*
*


    it("render: image should not have border", () => {
        const component = getComponent();
        expect(component.find('img')).toHaveStyleRule('border', 'none');
    });

* */

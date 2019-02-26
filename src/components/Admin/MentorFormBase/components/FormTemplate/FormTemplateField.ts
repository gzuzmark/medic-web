import colors from "../../../../../common/MentorColor";

const getBorderColor = (value: string, isEdit: boolean) => {
    return (!value && isEdit) ? `${colors.TEXT_COLORS.font_error}` : ''
};

export default getBorderColor;

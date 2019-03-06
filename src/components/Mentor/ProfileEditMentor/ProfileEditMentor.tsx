import {Formik} from "formik";
import * as React from 'react';
import styled from "styled-components";
import {IPropsMentorOptionsDropDown} from "../../../common/MentorDropDown/MentorDropDown";
import {IMentorFormValidations} from "../../../domain/Mentor/MentorBaseForm";
import MentorEditData, {IMentorEditCreateData, IMentorEditFormValidations} from "../../../domain/Mentor/MentorEdit";
import MentorFormBaseContext from "../../Admin/MentorFormBase/MentorFormBase.context";
import mentorFormBaseSchema from "../../Admin/MentorFormBase/MentorFormBase.validations";
import FormEditManager from "./components/FormEditManager/FormEditManager";

const MentorEditContainer = styled.div`
    margin: 0 auto;
    width: 930px;
`;

interface IStateProfileEditMentor  {
    listSites: IPropsMentorOptionsDropDown[];
    listSkills: IPropsMentorOptionsDropDown[];
    selectedImage: string;
    mentor: IMentorEditFormValidations | null;
}

class ProfileEditMentor extends React.Component<{}, IStateProfileEditMentor> {
    public state: IStateProfileEditMentor;
    private mentorEditData: MentorEditData;
    constructor(props: any) {
        super(props);
        this.mentorEditData = new MentorEditData({} as IMentorEditCreateData);
        this.onSubmit = this.onSubmit.bind(this);
        this.updateListSkills = this.updateListSkills.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.state = {
            listSites: [] as IPropsMentorOptionsDropDown[],
            listSkills: [] as IPropsMentorOptionsDropDown[],
            mentor: {...this.mentorEditData.getMentorValues, otherUtpRole: !!true},
            selectedImage: ''
        };
    }

    public render() {
        const listSites = this.state.listSites;
        const listSkills = this.state.listSkills;
        const selectedImage = this.state.selectedImage;
        return (
            <div className="u-LayoutMargin">
                <MentorEditContainer>
                    {this.state.mentor &&
                    <Formik
                        initialValues={this.state.mentor}
                        validationSchema={mentorFormBaseSchema}
                        isInitialValid={false}
                        onSubmit={this.onSubmit}>
                        {({ errors, touched, values, handleBlur, handleChange, handleSubmit, setFieldValue, setFieldTouched, validateForm}) => {
                            return (
                                <MentorFormBaseContext.Provider
                                    value={{
                                        errors,
                                        handleBlur,
                                        handleChange,
                                        listSites,
                                        listSkills,
                                        selectedImage,
                                        setFieldTouched,
                                        setFieldValue,
                                        touched,
                                        updateImage: this.updateImage,
                                        updateListSkills: this.updateListSkills,
                                        values
                                    }}>
                                    <form onSubmit={handleSubmit}>
                                        <FormEditManager
                                            formData={{errors, touched, values}}
                                            onHandleSubmit={this.onSubmit}
                                            validateForm={validateForm}/>
                                    </form>
                                </MentorFormBaseContext.Provider>
                            )
                        }}
                    </Formik>}
                </MentorEditContainer>
            </div>
        )
    }

    private onSubmit(values: IMentorFormValidations) {
        this.mentorEditData.prepareData(values);
    }

    private updateListSkills(siteId: string) {
        return new Promise((resolve, reject) => {
            this.setState({listSkills: []}, () => {
                /*
                this.skillService.listBySite(siteId).then((skills: ISkill[]) => {
                    const listSkills = skills.map((v) => ({value: v.id, label: v.name}));
                    this.setState({listSkills});
                    resolve()
                }).catch(() => {
                    reject()
                })
                */
            })
        })
    }

    private updateImage(selectedImage: string) {
        this.setState({selectedImage});
    }
}

export default ProfileEditMentor;

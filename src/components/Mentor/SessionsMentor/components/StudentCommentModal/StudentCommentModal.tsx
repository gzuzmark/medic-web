import * as React from 'react';
import styled from "styled-components";
import {ButtonNormal, THEME_SECONDARY} from "../../../../../common/Buttons/Buttons";
import colors from "../../../../../common/MentorColor";
import {Body1, defaultFont, LIGHT_TEXT, Small2} from '../../../../../common/MentorText';
import {ITags} from "../../../../../services/Tag/Tag.service";
import {IStudentChecklistCard} from "../StudentFullCard/StudentFullCard";
import './StudentCommentModal.scss';


export interface ITagModalStudentChecklistBoard {
    comment?: string;
    student?: IStudentChecklistCard;
    tags?: ITags[];
}

export interface ITagConfirm {
    id: string;
    tags: string[];
    comment: string;

}

export interface IPropsStudentCommentModal {
    loading: boolean;
    modal: ITagModalStudentChecklistBoard;
    confirm: (request: ITagConfirm) => void;
    cancel: () => void;
}

const Label: React.SFC<any> = props =>
    <label className={props.className} {...props.attrs}>{props.children}</label>;

const TextArea: React.SFC<any> = props =>
    <textarea className={props.className} maxLength={2000} {...props.attrs}>{props.children}</textarea>;

const LabelComponent = styled(Label)`
  background: ${colors.BACKGROUND_COLORS.background_white};
  padding: 4px 12px;
  transition: 0.4s background ease-in-out; 
  &[for=''] {
      background: ${colors.MISC_COLORS.blue};
      span {
        color: ${colors.BACKGROUND_COLORS.background_white};
      }
  }
  &:not([for='']) {
    cursor: pointer;
  }
`;

export const TextAreaComponent = styled(TextArea)`
   border: 1px solid ${colors.MISC_COLORS.background_grey_2};
   border-radius: 4px;
   background: transparent;
   color: ${colors.TEXT_COLORS.font_dark};
   font-family: ${defaultFont};
   font-size: 14px;
   font-style: normal;
   font-weight: ${LIGHT_TEXT};
   line-height: 20px;
   height: 64px;
   padding: 11px 20px;
   resize: none;
   width: 400px;    
   &:focus {
      background: ${colors.BACKGROUND_COLORS.background_white};
      border: 1px solid ${colors.MISC_COLORS.dark};
   }
`;

const LiStyled = styled("li")`
  display: inline-grid;
  margin-right: 16px;
  margin-top: 12px;
  input[type="checkbox"] {
    display: none;   
    &:checked + label {
      background: ${colors.MISC_COLORS.blue};
      span {
        color: ${colors.BACKGROUND_COLORS.background_white};
      }
    }
  }
  span {
    display: table-cell;
    vertical-align: middle;
  }
`;


export const ItemTag: React.StatelessComponent<{id: string, onClick: () => void }> = (props) => {
    return (
        <LiStyled>
            {!!props.id && <input type="checkbox" id={props.id} onChange={props.onClick} value={props.id}/>}
            <LabelComponent attrs={{htmlFor: props.id}}>
                <Small2 weight={LIGHT_TEXT}>{props.children}</Small2>
            </LabelComponent>
        </LiStyled>
    )
};

interface IStatesStudentCommentModal {
    disableForm: boolean;
}

class StudentCommentModal extends  React.Component<IPropsStudentCommentModal, IStatesStudentCommentModal> {
    public state: IStatesStudentCommentModal;
    public textarea: React.RefObject<HTMLTextAreaElement>;
    constructor(props: IPropsStudentCommentModal) {
        super(props);
        this.state = {
            disableForm: true
        };
        this.textarea = React.createRef();
        this.updateForm = this.updateForm.bind(this);
        this.getCheckedElements = this.getCheckedElements.bind(this);

    }

    public render() {
        const onClick = () => {
            if (this.props.modal.student) {
                const checkboxes: NodeListOf<HTMLInputElement> = this.getCheckedElements();
                const tags = Array.from(checkboxes).map(input => input.value);
                const comment = this.textarea.current && this.textarea.current.value.trim() || '';
                const id = this.props.modal.student.studentId;
                this.props.confirm({tags, comment, id});
            }
        };

        let propsButton = {};
        const isAddForm = this.props.modal.tags && this.props.modal.tags.every(tag => !!tag.id);
        if (this.props.loading) {
            propsButton = {
                disabled: "true",
                loading: "true"
            }
        } else if (this.state.disableForm) {
            propsButton = {
                disabled: "true"
            }
        }

        return !!this.props.modal.student && (
            <div className={`StudentModalCard`}>
                <div className={"StudentModalCard_body"}>
                    <Body1>{isAddForm ? '¿En qué podría mejorar el alumno?' : 'En qué podría mejorar el alumno'}</Body1>
                    <ul className={"StudentModalCard_tags"}>
                        {this.props.modal.tags && this.props.modal.tags.map((tag: ITags, index: number) => {
                            return (
                                <ItemTag id={tag.id}
                                         key={`StudentModalCard_tags_${index}`}
                                         onClick={this.updateForm}>{tag.name}</ItemTag>
                            )
                        })}
                    </ul>
                    {
                        isAddForm ?
                        <Body1 style={{marginBottom: 10}}>Escribe un comentario</Body1>:
                        <Body1 style={{marginBottom: 10}}>Comentario</Body1>
                    }
                    {   isAddForm ?
                        <TextAreaComponent attrs={{placeholder: "Ingresa un comentario", ref: this.textarea}}/>:
                        <div className="StudentModalCard_comment">
                            <Body1 weight={LIGHT_TEXT}>{this.props.modal.comment || "No hay comentario"}</Body1>
                        </div>
                    }
                </div>
                <div className={"StudentModalCard_footer"}>
                    {isAddForm ? (
                    <React.Fragment>
                        <ButtonNormal className={"StudentModalCard_button"}
                                      attrs={{onClick: this.props.cancel}}
                                      type={THEME_SECONDARY} text="Cancelar"/>
                        <ButtonNormal className={"StudentModalCard_button"}
                                      attrs={{...propsButton, onClick}} text="Guardar"/>
                    </React.Fragment>) :
                    <ButtonNormal className={"StudentModalCard_button"}
                                  attrs={{onClick: this.props.cancel}}
                                  text="Aceptar"/>
                    }
                </div>
            </div>
        ) || null;
    }

    public updateForm() {
        const checkbox: NodeListOf<HTMLInputElement> = this.getCheckedElements();
        this.setState({disableForm: checkbox.length === 0})

    }

    private getCheckedElements(): NodeListOf<HTMLInputElement> {
        const selector = ".StudentModalCard_tags input[type=checkbox]:checked";
        return document.querySelectorAll(selector) as NodeListOf<HTMLInputElement>;
    }

};

export default StudentCommentModal;

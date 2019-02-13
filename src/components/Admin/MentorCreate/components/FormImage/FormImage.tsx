import * as React from "react";
import * as ReactCrop from 'react-image-crop';
import styled from "styled-components";
import camera from '../../../../../assets/images/camera.png';
import {ButtonNormal} from "../../../../../common/Buttons/Buttons";
import MentorModalBase from "../../../../../common/ConsoleModal/MentorModalBase";
import Icon from "../../../../../common/Icon/Icon";
import colors from "../../../../../common/MentorColor";
import { Body1, Heading2 } from "../../../../../common/MentorText";
import MentorCreateContext, {IMentorCreateContext} from "../../MentorCreate.context";
import ImageProfile from '../ImageProfile/ImageProfile';
import './FormImage.scss';
import './ReactCrop.scss';

interface IStateFormImage {
    crop: ReactCrop.Crop;
    croppedTmp: string;
    loading: boolean;
    modal: boolean;
    src: string;
}

export interface IPropsFormImage {
    id: string;
}

const TextInput = styled(Body1)`
    color: ${colors.BACKGROUND_COLORS.background_purple};
`;


class FormImage extends React.Component <IPropsFormImage, IStateFormImage> {
    public state: IStateFormImage;
    private imageRef: React.RefObject<HTMLImageElement>;
    constructor(props: IPropsFormImage) {
        super(props);
        this.state = {
            crop: {
                aspect: 16/16,
                width: 40,
                x: 0,
                y: 0
            },
            croppedTmp: '',
            loading: false,
            modal: false,
            src: ""
        };
        this.onCropChange = this.onCropChange.bind(this);
        this.onCropComplete = this.onCropComplete.bind(this);
        this.onImageLoaded = this.onImageLoaded.bind(this);
        this.onSelectFile = this.onSelectFile.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    public render() {
        const CropDefault = (ReactCrop as any).default;
        const defaultImage = camera;

        let propsButton = {};
        if (this.state.loading) {
            propsButton = {
                loading: "true"
            }
        }

        return (
            <MentorCreateContext.Consumer>
                {(context: IMentorCreateContext) => {
                    return (
                        <div className={"FormImage"}>
                            <MentorModalBase
                                show={this.state.modal}
                                onCloseModal={this.closeModal}>
                                {this.state.src &&
                                <div className={"FormImage_modal"}>
                                    <Heading2 style={{textAlign: 'center'}}>Subir la foto del mentor</Heading2>
                                    <div className={"FormImage_crop"}>
                                        <CropDefault src={this.state.src}
                                                     keepSelection={true}
                                                     crop={this.state.crop}
                                                     disabled={this.state.loading}
                                                     onChange={this.onCropChange}
                                                     onImageLoaded={this.onImageLoaded}
                                                     onComplete={this.onCropComplete}/>
                                    </div>
                                    <ButtonNormal text={"Aceptar"}
                                                  attrs={
                                                      {
                                                          onClick: this.uploadImage(context.setFieldValue),
                                                          style: {margin: '0 auto', width: "136px"},
                                                          ...propsButton
                                                      }}/>
                                </div>
                                }
                            </MentorModalBase>
                            <label className={"FormImage_label"} htmlFor={this.props.id}>
                                <ImageProfile src={context.values.picture || defaultImage} width={160} height={160} title="Camera" filled={!!context.values.picture}/>
                                <div className={"FormImage_text"}>
                                    <Icon name={"upload"} style={{
                                        fill: colors.BACKGROUND_COLORS.background_purple,
                                        marginRight: 4
                                    }}/>
                                    <TextInput>Subir foto del mentor</TextInput>
                                </div>
                            </label>
                            <input type={"file"}
                                   id={this.props.id}
                                   accept="image/*"
                                   className={"FormImage_file"}
                                   onChange={this.onSelectFile} />
                        </div>
                    )
                }}
            </MentorCreateContext.Consumer>
        )
    }

    private onCropChange(crop: ReactCrop.Crop) {
        this.setState({ crop });
    }

    private onCropComplete(crop: ReactCrop.Crop, pixelCrop: ReactCrop.PixelCrop) {
        this.makeClientCrop(crop, pixelCrop);
    }

    private onImageLoaded(image: React.RefObject<HTMLImageElement>, pixelCrop: ReactCrop.PixelCrop) {
        this.imageRef = image;
    }

    private onSelectFile(event: any) {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                this.setState({ src: reader.result }, () => {
                    this.setState({ modal: true });
                });
            });
            reader.readAsDataURL(event.target.files[0]);
            event.target.value = null;
        }
    }

    private uploadImage(setFieldValue: any) {
        return () => {
            const { croppedTmp, loading } = this.state;
            if (!loading) {
                this.setState({ loading: true }, () => {
                    setFieldValue("picture", croppedTmp);
                    this.setState({
                        loading: false,
                        modal: false
                    })
                });
            }
        }
    }

    private closeModal() {
        if (!this.state.loading) {
            this.setState({ modal: false })
        }
    }

    private async makeClientCrop(crop: ReactCrop.Crop, pixelCrop: ReactCrop.PixelCrop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedTmp = await this.getCroppedImg(
                this.imageRef,
                pixelCrop,
                'newFile.jpeg',
            );
            this.setState({ croppedTmp });
        }
    }

    private getCroppedImg(image: any, pixelCrop: ReactCrop.PixelCrop, fileName: string): Promise<string> {
        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');
        if (!!ctx) {
            ctx.drawImage(
                image,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                pixelCrop.width,
                pixelCrop.height,
            );

        }
        return new Promise((resolve, reject) => {
            canvas.toBlob((blob: any) => {
                if (!blob) {
                    return;
                }
                blob.name = fileName;
                const fileUrl = window.URL.createObjectURL(blob);
                resolve(fileUrl);
            }, 'image/jpeg');
        });
    }

}

export default FormImage;

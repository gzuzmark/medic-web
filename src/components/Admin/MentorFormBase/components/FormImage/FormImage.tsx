import * as React from "react";
import * as ReactCrop from 'react-image-crop';
import * as ReactTooltip from 'react-tooltip';
import styled from "styled-components";
import camera from '../../../../../assets/images/camera.png';
import {ButtonNormal} from "../../../../../common/Buttons/Buttons";
import ContentModal, {IGenericContentModal} from "../../../../../common/ConsoleModal/ContentModal";
import MentorModalBase from "../../../../../common/ConsoleModal/MentorModalBase";
import Icon from "../../../../../common/Icon/Icon";
import colors from "../../../../../common/MentorColor";
import { Body1, Heading2 } from "../../../../../common/MentorText";
import MentorService from "../../../../../services/Mentor/Mentor.service";
import MentorFormBaseContext, {IMentorFormBaseContext} from "../../MentorFormBase.context";
import ImageProfile from '../ImageProfile/ImageProfile';
import { Text } from '../../../../../common/ConsoleText';
import * as PerfilDoctor from '../../../../../assets/images/perfil_doctor.png';
import * as AlertIcon from '../../../../../assets/images/alert_icon.png';
import './FormImage.scss';
import './ReactCrop.scss';

interface IStateFormImage {
    crop: ReactCrop.Crop;
    croppedTmp: string;
    loading: boolean;
    modal: boolean;
    src: string;
    selectedFile: any;
}

export interface IPropsFormImage {
    id: string;
    forceDisable?: boolean;
    className?: string;
    size?: number;
    mentor?: boolean;
}

const TextInput = styled(Body1)`
    color: ${(props: {disabled: boolean}) => {
        return props.disabled ? colors.TEXT_COLORS.font_disabled : colors.BACKGROUND_COLORS.background_green;
    }};
`;


class FormImage extends React.Component <IPropsFormImage, IStateFormImage> {
    public state: IStateFormImage;
    private imageRef: React.RefObject<HTMLImageElement>;
    private mentorService: MentorService;
    private errorImage: IGenericContentModal;
    private labelImage: React.RefObject<HTMLLabelElement>;
    constructor(props: IPropsFormImage) {
        super(props);
        this.mentorService = new MentorService();
        this.labelImage = React.createRef();
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
            selectedFile: null,
            src: ""
        };
        this.onCropChange = this.onCropChange.bind(this);
        this.onCropComplete = this.onCropComplete.bind(this);
        this.onImageLoaded = this.onImageLoaded.bind(this);
        this.onSelectFile = this.onSelectFile.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.newUploadImage = this.newUploadImage.bind(this);
        this.errorImage = {
            button: "Subir otra foto",
            description: "La imagen es demasiado grande para el formato permitido",
            image: <Icon name={'alert'} />,
            title: "Subir foto del mentor"
        }
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
            <MentorFormBaseContext.Consumer>
                {(context: IMentorFormBaseContext) => {
                    return (
                        <div className={`FormImage ${this.props.className ? this.props.className : ''}`}>
                            <ReactTooltip effect={"solid"} place={"top"} id={"FormImageToolTip"} multiline={true}/>
                            <MentorModalBase
                                show={this.state.modal}
                                onCloseModal={this.closeModal}>
                                {this.state.src ?
                                <div className={"FormImage_modal"}>
                                    <Heading2 style={{textAlign: 'center'}}>Añade una foto de perfil </Heading2>
                                    <div className={"FormImage_crop"}>
                                        <CropDefault src={this.state.src}
                                                     keepSelection={true}
                                                     crop={this.state.crop}
                                                     disabled={this.state.loading}
                                                     onChange={this.onCropChange}
                                                     onImageLoaded={this.onImageLoaded}
                                                     onComplete={this.onCropComplete}/>
                                    </div>
                                    <ButtonNormal text={"Aceptar"} attrs={{
                                        onClick: this.uploadImage(context),
                                        style: {margin: '0 auto', width: "136px"},
                                        ...propsButton}}/>
                                </div>:
                                <ContentModal.Generic generic={this.errorImage} loading={false} confirm={this.newUploadImage} error={true} />}
                            </MentorModalBase>
                            <div>
                                <div className={this.props.forceDisable ? 'FormImage_disabled' : ''} style={{textAlign: 'center'}}>
                                    <label className={"FormImage_label"}
                                        htmlFor={this.props.id} ref={this.labelImage}
                                        data-for="FormImageToolTip"
                                        data-tip={'La foto debe ser amigable (se recomienda una foto sonriente), <br>con fondo blanco y mirada al frente.'}>
                                        <ImageProfile src={context.selectedImage || defaultImage}
                                                    width={this.props.size || 160}
                                                    height={this.props.size || 160}
                                                    title="Perfil de mentor" filled={!!context.selectedImage}/>
                                        <div className={"FormImage_text"}>
                                            <Icon name={"upload"} style={{
                                                fill: this.props.forceDisable ? colors.TEXT_COLORS.font_disabled : colors.BACKGROUND_COLORS.background_green,
                                                marginRight: 4
                                            }}/>
                                            <TextInput disabled={!!this.props.forceDisable}>
                                                {!!context.selectedImage ? 'Cambiar foto' : 'Añade una foto de perfil' }
                                            </TextInput>
                                        </div>
                                        <div style={{marginTop:22}}>
                                            <Text >Formatos permitidos: JPG, JPEG, PNG.</Text>
                                        </div>
                                    </label>
                                </div>
                                <input type={"file"} id={this.props.id} accept="image/*" className={"FormImage_file"} onChange={this.onSelectFile} />
                            </div>
                            <div className={'TipsImageSection'}>
                                <Text style={{color:'#2C7BFD',fontWeight:700}}>Consideraciones de foto de perfil</Text>
                                <div className={'TipsImageSection_description'}>
                                    <img alt={'check'} src={PerfilDoctor} height={62} />
                                    <div>
                                        Recomendaciones de imagen:
                                        <ul>
                                            <li><span>Sonrisa y mirada a la cámara</span></li>
                                            <li><span>Dar importancia al rostro</span></li>
                                            <li><span>Uniforme de especialidad</span></li>
                                        </ul>
                                    </div>
                                    <div>
                                        Recomendaciones técnicas
                                        <ul>
                                            <li><span>Luz blanca y frente al rosto</span></li>
                                            <li><span>Imagen reciente</span></li>
                                            <li><span>Fondo neutro (blanco)</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={'TipsImageSection_info'}>
                                    <img alt={'check'} src={AlertIcon} height={18} />
                                    <Text style={{color:'#2C7BFD',fontWeight:400,marginLeft:10}}>Evitar usar foto tipo carnet</Text>
                                </div>
                            </div>
                            {this.props.children}
                        </div>
                    )
                }}
            </MentorFormBaseContext.Consumer>
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
            if (event.target.files[0].size < 5000 * 1024) {
                this.setState({selectedFile: event.target.files[0]});
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    if (reader.result) {
                        this.setState({ src: reader.result.toString() }, () => {
                            this.setState({ modal: true });
                        });
                    }
                });
                reader.readAsDataURL(event.target.files[0]);
                event.target.value = null;
            } else {
                event.target.value = null;
                this.setState({ src: '', modal: true });
            }
        }
    }

    private uploadImage(context: IMentorFormBaseContext) {
        return () => {
            const { croppedTmp, loading } = this.state;
            if (!loading) {
                this.setState({ loading: true }, async() => {
                    const file = await fetch(croppedTmp);
                    const bytes = await file.blob();
                    const metadata = {
                        type: 'image/jpeg'
                    };
                    const croppedImage = new File([bytes], "newImage.jpg", metadata);
                    const bodyFormData = new FormData();
                    bodyFormData.append('content-type', 'multipart/form-data');
                    bodyFormData.append('file', croppedImage);
                    this.mentorService.uploadPhoto(bodyFormData, !!this.props.mentor).then((response: any) => {
                        context.setFieldValue("picture", response.data);
                        context.updateImage(croppedTmp);
                        this.setState({
                            loading: false,
                            modal: false
                        })
                    }).catch(() => {
                        this.setState({
                            loading: false
                        })
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


    private newUploadImage() {
        this.setState({ modal: false }, () => {
            const evt = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            if (this.labelImage.current) {
                this.labelImage.current.dispatchEvent(evt)
            }
        })
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
        if (!!ctx && !!ctx.drawImage) {
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
            try {
                canvas.toBlob((blob: any) => {
                    if (!blob) {
                        return;
                    }
                    blob.name = fileName;
                    const fileUrl = window.URL.createObjectURL(blob);
                    resolve(fileUrl);
                }, 'image/jpeg');
            } catch (e) {
                reject(e)
            }
        });
    }
}

export default FormImage;

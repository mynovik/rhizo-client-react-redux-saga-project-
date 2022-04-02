import React, { FC, ReactNode, useState } from 'react';
import { Backdrop, Fade, Modal, SwipeableDrawer, makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import { Device } from '../../settings/Device';
import UIButton from '../button/UIButton';
import UISpacer from './UISpacer';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import UIBox from '../layout/UIBox';
import { MessageIcon, TickIcon, BackIcon, CloseIcon } from '../icon/UIIconAssets';

const ContentWrapper = styled('div')<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow-y: auto;
    flex: none;
    flex-grow: 0;
    width: 560px;
    height: 100vh;
    align-self: initial;
    margin: 0px 0px 0px 0px;
    ${(props) =>
        (props.secondStatus === 'resolved' || props.title === 'Course Details') &&
        `
        padding: 100px 35px 30px;
    `}

    background-color: ${ThemeColor.white};
    box-shadow: none;
    @media (max-width: ${Device.tablet - 1}px) {
        width: 100vw;
        height: 85vh;
        bottom: 0;
        border-bottom-right-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
        padding: 100px 20px 100px;
    }
    &::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* make scrollbar transparent */
    }

    > h4 {
        font-weight: ${FontWeight.bold};
        font-size: ${FontSize.xxl};
        line-height: ${LineHeight.md};
        letter-spacing: ${LetterSpacing.md};
        color: ${ThemeColor.grey45};
        flex: none;
        flex-grow: 0;
        margin: 0px 0px 10px 0px;
        padding: 0;
    }

    span {
        font-weight: normal;
        font-size: ${FontSize.xl};
        line-height: ${LineHeight.md};
        letter-spacing: ${LetterSpacing.md};
        color: ${ThemeColor.grey165};
        flex: none;
        align-self: stretch;
        flex-grow: 0;
        margin: 0px 0px 0px 0px;
    }
`;

const CloseButton = styled.div`
    width: 40px;
    height: 40px;
    padding: 9px 9px 10px 13px;
    background-color: ${ThemeColor.second};
    border-radius: 50%;
    display: none;
    position: relative;
    right: 12%;
    flex-shrink: 0;
    &:hover {
        cursor: pointer;
    }
    @media (max-width: ${Device.tablet - 1}px) {
        display: block;
    }
`;

const Heading = styled('div')<Partial<IProps>>`
    color: ${ThemeColor.title};
    width: 100%;
    height: 70px;
    background-color: ${ThemeColor.white};
    position: absolute;
    top: 0;
    left: 0;
    padding: 34px;
    padding-top: 50px;
    z-index: 1000;
    font-size: ${FontSize.xxl};
    font-weight: ${FontWeight.medium};
    justify-content: space-between;
    align-items: center;
    margin-top: 0px;
    @media (max-width: ${Device.tablet - 1}px) {
        max-height: 100px;
        margin-top: 0;
        padding-top: 15px;
        padding-left: 10px;
        padding-right: 10px;
    }
    ${(props) =>
        props.scrollValue !== 0 &&
        `
        box-shadow: 0px 14px 15px -6px rgb(122 137 148 / 11%);
    `}
`;

const Div = styled.div`
    overflow-y: auto;
    width: 100%;
    &::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* make scrollbar transparent */
    }
`;

const ButtonsContainer = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 20px;
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: end;
    background-color: ${ThemeColor.white};
    box-shadow: 0px -14px 15px -5px rgba(122, 137, 148, 0.11);
    > div {
        min-width: 50%;
    }
    @media (max-width: ${Device.tablet - 1}px) {
        > div {
            width: 100%;
            display: flex;
            > div:nth-child(1) {
                width: 50%;
            }
            > div:nth-child(3) {
                width: 50%;
            }
        }
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 10px;
    > div {
        flex-grow: 1;
    }
    button {
        min-width: 85px;
        padding: 2px;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        span {
            font-size: 11px;
        }
        svg {
            width: 12px;
            height: 12px;
        }
    }
    > div:nth-child(2) {
        button: nth-child(2) {
            svg {
                width: 10px;
                height: 10px;
            }
        }
    }
`;

const EditingButtons = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div:nth-child(1) {
        width: 50%;
    }
    > div:nth-child(3) {
        width: 50%;
    }
`;

const DisputeButtonGroup = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    > div {
        width: 50%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 5px;
        > div {
            flex: 1;
        }
    }
`;

const ModalTitle = styled.p`
    margin: 0;
    @media (max-width: ${Device.tablet - 1}px) {
        min-width: calc(100% - 4px);
        text-align: center;
    }
`;

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        outline: 0,
        boxShadow: theme.shadows[5],
        padding: '100px 32px 86px',
    },
    buttons: {
        paddingLeft: '50%',
    },
    drawer: {
        '&>div:nth-child(3)': {
            borderRadius: '10px 0 0 10px',
            '@media (max-width: 768px)': {
                borderRadius: '10px 10px 0 0',
            },
        },
    },
    close: {
        visibility: 'hidden',
    },
    hideBack: {
        display: 'none',
    },
    back: {
        '&:hover': {
            cursor: 'pointer',
        },
    },
}));

interface IProps {
    className?: string;
    scrollValue?: any;
    id?: string;
    children?: ReactNode;
    open: boolean;
    edit?: boolean;
    title?: string;
    status?: string;
    type?: string;
    isEditing?: boolean;
    secondStatus?: string;
    hideBack?: boolean;
    hideClose?: boolean;
    onClose?: (x: any) => void;
    onSave?: (x: any) => void;
    onBack?: (x: any) => void;
    beginEditing?: (x: any) => void;
    canceling?: (x: any) => void;
    saving?: (x: any) => void;
    disputeAnr?: (x: any) => void;
    disputeAr?: (x: any) => void;
    resolved?: (x: any) => void;
}

const useScrollTop = () => {
    const [scrollTop, setScrollTop] = useState(0);
    const onScroll = (event) => setScrollTop(event.target.scrollTop);
    return [scrollTop, { onScroll }];
};

const UIDrawer: FC<IProps> = (props) => {
    const classes = useStyles();
    const { id, open, onClose, beginEditing, canceling, saving, disputeAnr, disputeAr, resolved, onBack, onSave, hideBack, isEditing, children, edit, title, status, type, secondStatus } = props;

    const width = window.innerWidth;
    const tablet = 768;
    const [scrollTop, scrollProps] = useScrollTop();

    return (
        <SwipeableDrawer anchor={width > tablet ? 'right' : 'bottom'} open={open} onClose={onClose} onOpen={() => true} className={classes.drawer} {...scrollProps}>
            <Fade in={open}>
                <ContentWrapper className={classes.paper} title={title} status={status} id="header">
                    <Div>
                        <UIBox justifyContent="space-between" alignItems="center">
                            <Heading scrollValue={scrollTop}>
                                <UIBox direction="row" justifyContent="space-between" alignItems="center">
                                    <BackIcon onClick={(e) => onBack(true)} className={hideBack ? classes.hideBack : classes.back} />
                                    <ModalTitle>{title}</ModalTitle>
                                    <CloseButton onClick={onClose}>
                                        <CloseIcon />
                                    </CloseButton>
                                </UIBox>
                            </Heading>
                        </UIBox>
                        {children}
                        {secondStatus === 'resolved' || title === 'Course Details' ? null : (
                            <ButtonsContainer>
                                {status === 'pending' && type === 'tutor' && (
                                    <ButtonGroup>
                                        <UIButton color="second">
                                            <MessageIcon />
                                            Message
                                        </UIButton>
                                        <UIButton color="dispute">
                                            <CloseIcon />
                                            Reject
                                        </UIButton>
                                        <UIButton color="second">
                                            <TickIcon />
                                            Approve
                                        </UIButton>
                                    </ButtonGroup>
                                )}
                                {status === 'approved' && (
                                    <UIButton color="second" className={classes.buttons}>
                                        Join session
                                    </UIButton>
                                )}
                                {status === 'completed' && (
                                    <UIButton color="completed" className={classes.buttons}>
                                        View Details
                                    </UIButton>
                                )}
                                {status === 'pending' &&
                                    type === 'student' &&
                                    edit &&
                                    (isEditing ? (
                                        <EditingButtons>
                                            <UIButton color="basicline" onClick={canceling}>
                                                Cancel
                                            </UIButton>
                                            <UISpacer width={10}></UISpacer>
                                            <UIButton color="second" onClick={saving}>
                                                Save
                                            </UIButton>
                                        </EditingButtons>
                                    ) : (
                                        <EditingButtons>
                                            <UIButton color="basicline" onClick={beginEditing}>
                                                Edit
                                            </UIButton>
                                            <UISpacer width={10}></UISpacer>
                                            <UIButton color="pending" className={classes.buttons}>
                                                Cancel Request
                                            </UIButton>
                                        </EditingButtons>
                                    ))}
                                {status === 'disputeAnr' && (
                                    <UIButton color="pending" className={classes.buttons} onClick={disputeAnr}>
                                        View Details
                                    </UIButton>
                                )}
                                {status === 'disputeAr' && (
                                    <UIButton color="dispute" className={classes.buttons} onClick={disputeAr}>
                                        Respond
                                    </UIButton>
                                )}
                                {status === 'resolved' && (
                                    <UIButton color="completed" className={classes.buttons} onClick={resolved}>
                                        View Dispute
                                    </UIButton>
                                )}
                                {(secondStatus === 'disputeAr' || secondStatus === 'disputeAnr') && (
                                    <DisputeButtonGroup>
                                        <div>
                                            <UIButton color="basicline" onClick={onClose}>
                                                Cancel
                                            </UIButton>
                                            <UIButton color="second">Submit</UIButton>
                                        </div>
                                    </DisputeButtonGroup>
                                )}
                            </ButtonsContainer>
                        )}
                        <UISpacer height={20}></UISpacer>
                    </Div>
                </ContentWrapper>
            </Fade>
        </SwipeableDrawer>
    );
};

UIDrawer.defaultProps = {
    hideBack: true,
};

export default UIDrawer;

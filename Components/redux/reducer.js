import {
    UNDO,
    ERASE,
    HINT,
    PAUSE,
    EXPERIMENT,
    RESUMESCORE,
    RESUMEMISTAKE,
    PAUSEISSUE,
    RESUMEICON,
    HINTROWG,
    HINTCOLG,
    ISDARKMODE,
    HINTMETER,
    STOPTIMMER,
    ROWANIMATION,
    COLANIMATION,
    BOXANIMATION,
    MARGINSETTING,
    TIMERSETTING, 
    MISTAKESETTING,
    HINTSETTING,
    COMPLETIONANIMATIONSETTING,
    HIGHLIGHTSAMENUMBERSETTING,
    RIGIONHIGHLIGHTSETTING,
    VIBRATIONSETTING} from './constants';


const initialState = {
    undoState: 0,
    eraseState: 0,
    hintState: 0,
    pasue: false,
    dataVibrationSetting: true,
    dataMarginSetting: false
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UNDO:
            return {
                ...state,
                dataUndo: action.payload
            }
        case ERASE:
            return {
                ...state,
                dataErase: action.payload
            }
        case HINT:
            return {
                ...state,
                dataHint: action.payload
            }
        case PAUSE:
            return {
                ...state,
                dataPause: action.payload
            }
        case EXPERIMENT:
            return {
                ...state,
                dataExperiment: action.payload
            }
        case RESUMESCORE:
            return {
                ...state,
                dataResumeScore: action.payload
            }
        case RESUMEMISTAKE:
            return {
                ...state,
                dataResumeMistake: action.payload
            }
        case PAUSEISSUE:
            return {
                ...state,
                dataPauseIssue: action.payload
            }
        case RESUMEICON: {
            return {
                ...state,
                dataResumeIcon: action.payload
            }
        }
        case ISDARKMODE: {
            return {
                ...state,
                dataToggleIcon: action.payload
            }
        }
        case HINTMETER: {
            return {
                ...state,
                dataHintMeter: action.payload
            }
        }
        case STOPTIMMER: {
            return {
                ...state,
                dataStopTimer: action.payload
            }
        }
        case ROWANIMATION: {
            return {
                ...state,
                dataRowAnimation: action.payload
            }
        }
        case COLANIMATION: {
            return {
                ...state,
                dataColAnimation: action.payload
            }
        }
        case BOXANIMATION: {
            return {
                ...state,
                dataBoxAnimation: action.payload
            }
        }
        case MARGINSETTING: {
            return {
                ...state,
                dataMarginSetting: action.payload
            }
        }
        case TIMERSETTING: {
            return{
                ...state,
                dataTimerSetting: action.payload
            }
        }
        case MISTAKESETTING: {
            return {
                ...state,
                dataMistakeSetting: action.payload
            }
        }
        case HINTSETTING: {
            return {
                ...state,
                dataHintSetting: action.payload
            }
        }
        case COMPLETIONANIMATIONSETTING: {
            return {
                ...state,
                dataCompletionAnimationSetting: action.payload
            }
        }
        case HIGHLIGHTSAMENUMBERSETTING: {
            return {
                ...state,
                dataHighlightSameNumber: action.payload
            }
        }
        case RIGIONHIGHLIGHTSETTING: {
            return {
                ...state,
                dataRegionHighlightSetting: action.payload
            }
        }
        case VIBRATIONSETTING : {
            return{
                ...state,
                dataVibrationSetting: action.payload
            }
        }
        default:
            return state;
    }
}
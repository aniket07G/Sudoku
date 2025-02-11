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

export const UndoAction = (data) => {
    return {
        type: UNDO,
        payload: data
    }
}

export const EraseAction = (data) => {
    return {
        type: ERASE,
        payload: data
    }
}

export const HintAction = (data) => {
    return {
        type: HINT,
        payload: data
    }
}

export const PauseAction = (data) => {
    return {
        type: PAUSE,
        payload: data
    }
}

export const ExperimentAction = (data) => {
    return {
        type: EXPERIMENT,
        payload: data
    }
}

export const ResumeScoreAction = (data) => {
    return {
        type: RESUMESCORE,
        payload: data
    }
}

export const ResumeMistakeAction = (data) => {
    return {
        type: RESUMEMISTAKE,
        payload: data
    }
}

export const PauseIssueAction = (data) => {
    return {
        type: PAUSEISSUE,
        payload: data
    }
}

export const ResumeIconAction = (data) => {
    return {
        type: RESUMEICON,
        payload: data
    }
}

export const ToggleIconAction = (data) => {
    return {
        type: ISDARKMODE,
        payload: data
    }
}

export const HintMeterAction = (data) => {
    return {
        type: HINTMETER,
        payload: data
    }
}

export const StopTimerAction = (data) => {
    return {
        type: STOPTIMMER,
        payload: data
    }
}

export const RowAnimationAction = (data) => {
    return {
        type: ROWANIMATION,
        payload: data
    }
}

export const ColAnimationAction = (data) => {
    return {
        type: COLANIMATION,
        payload: data
    }
}

export const BoxAnimationAction = (data) => {
    return {
        type: BOXANIMATION,
        payload: data
    }
}

export const MarginSettingAction = (data) => {
    return {
        type: MARGINSETTING,
        payload: data
    }
}

export const TimerSettingAction = (data) => {
    return {
        type: TIMERSETTING,
        payload: data
    }
}

export const MistakeSettingAction = (data) => {
    return {
        type: MISTAKESETTING,
        payload: data
    }
}

export const HintSettingAction = (data) => {
    return {
        type: HINTSETTING,
        payload: data
    }
}

export const CompletionAnimationSetting = (data) => {
    return {
        type: COMPLETIONANIMATIONSETTING,
        payload: data
    }
}

export const HighlightSameNumberSetting = (data) => {
    return {
        type: HIGHLIGHTSAMENUMBERSETTING,
        payload: data
    }
}

export const RegionHighlightSetting = (data) => {
    return {
        type: RIGIONHIGHLIGHTSETTING,
        payload: data
    }
}

export const VibrationSettingAction = (data) => {
    return {
        type: VIBRATIONSETTING,
        payload: data
    }
}
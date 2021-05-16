import React, {ReactElement} from "react";
import { ReactComponent as BassA2 } from "../../assets/bass/a2-bass-tiny.svg";
import { ReactComponent as BassA3 } from "../../assets/bass/a3-bass-tiny.svg";
import { ReactComponent as BassA4 } from "../../assets/bass/a4-bass-tiny.svg";

import { ReactComponent as BassB2 } from "../../assets/bass/b2-bass-tiny.svg";
import { ReactComponent as BassB3 } from "../../assets/bass/b3-bass-tiny.svg";
import { ReactComponent as BassB4 } from "../../assets/bass/b4-bass-tiny.svg";

import { ReactComponent as BassC2 } from "../../assets/bass/c2-bass-tiny.svg";
import { ReactComponent as BassC3 } from "../../assets/bass/c3-bass-tiny.svg";
import { ReactComponent as BassC4 } from "../../assets/bass/c4-bass-tiny.svg";
import { ReactComponent as BassC5 } from "../../assets/bass/c5-bass-tiny.svg";

import { ReactComponent as BassD2 } from "../../assets/bass/d2-bass-tiny.svg";
import { ReactComponent as BassD3 } from "../../assets/bass/d3-bass-tiny.svg";
import { ReactComponent as BassD4 } from "../../assets/bass/d4-bass-tiny.svg";

import { ReactComponent as BassE2 } from "../../assets/bass/e2-bass-tiny.svg";
import { ReactComponent as BassE3 } from "../../assets/bass/e3-bass-tiny.svg";
import { ReactComponent as BassE4 } from "../../assets/bass/e4-bass-tiny.svg";

import { ReactComponent as BassF2 } from "../../assets/bass/f2-bass-tiny.svg";
import { ReactComponent as BassF3 } from "../../assets/bass/f3-bass-tiny.svg";
import { ReactComponent as BassF4 } from "../../assets/bass/f4-bass-tiny.svg";

import { ReactComponent as BassG2 } from "../../assets/bass/g2-bass-tiny.svg";
import { ReactComponent as BassG3 } from "../../assets/bass/g3-bass-tiny.svg";
import { ReactComponent as BassG4 } from "../../assets/bass/g4-bass-tiny.svg";


export interface CBassClefContainerProps {
    visibleNoteId: string
}

export const BassClefContainer: React.FC<CBassClefContainerProps> = ({visibleNoteId}) => {

    const map: Record<string, ReactElement> = {
        a2: <BassA2 />,
        a3: <BassA3 />,
        a4: <BassA4 />,

        b2: <BassB2 />,
        b3: <BassB3 />,
        b4: <BassB4 />,

        c2: <BassC2 />,
        c3: <BassC3 />,
        c4: <BassC4 />,
        c5: <BassC5 />,

        d2: <BassD2 />,
        d3: <BassD3 />,
        d4: <BassD4 />,

        e2: <BassE2 />,
        e3: <BassE3 />,
        e4: <BassE4 />,

        f2: <BassF2 />,
        f3: <BassF3 />,
        f4: <BassF4 />,

        g2: <BassG2 />,
        g3: <BassG3 />,
        g4: <BassG4 />,

    }

    return (
        <div>
            {map[visibleNoteId]}
        </div>
    )
}

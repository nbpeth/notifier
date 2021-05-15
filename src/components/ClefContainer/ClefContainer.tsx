import React, {ReactElement} from "react";
import { ReactComponent as TrebleA3 } from "../../assets/a3-treble-tiny.svg";
import { ReactComponent as TrebleA4 } from "../../assets/a4-treble-tiny.svg";
import { ReactComponent as TrebleA5 } from "../../assets/a5-treble-tiny.svg";

import { ReactComponent as TrebleB3 } from "../../assets/b3-treble-tiny.svg";
import { ReactComponent as TrebleB4 } from "../../assets/b4-treble-tiny.svg";
import { ReactComponent as TrebleB5 } from "../../assets/b5-treble-tiny.svg";

import { ReactComponent as TrebleC3 } from "../../assets/c3-treble-tiny.svg";
import { ReactComponent as TrebleC4 } from "../../assets/c4-treble-tiny.svg";
import { ReactComponent as TrebleC5 } from "../../assets/c5-treble-tiny.svg";

import { ReactComponent as TrebleD3 } from "../../assets/d3-treble-tiny.svg";
import { ReactComponent as TrebleD4 } from "../../assets/d4-treble-tiny.svg";
import { ReactComponent as TrebleD5 } from "../../assets/d5-treble-tiny.svg";

import { ReactComponent as TrebleE3 } from "../../assets/e3-treble-tiny.svg";
import { ReactComponent as TrebleE4 } from "../../assets/e4-treble-tiny.svg";
import { ReactComponent as TrebleE5 } from "../../assets/e5-treble-tiny.svg";

import { ReactComponent as TrebleF3 } from "../../assets/f3-treble-tiny.svg";
import { ReactComponent as TrebleF4 } from "../../assets/f4-treble-tiny.svg";
import { ReactComponent as TrebleF5 } from "../../assets/f5-treble-tiny.svg";

import { ReactComponent as TrebleG3 } from "../../assets/g3-treble-tiny.svg";
import { ReactComponent as TrebleG4 } from "../../assets/g4-treble-tiny.svg";
import { ReactComponent as TrebleG5 } from "../../assets/g5-treble-tiny.svg";

export interface ClefContainerProps {
    visibleNoteId: string
}

export const ClefContainer: React.FC<ClefContainerProps> = ({visibleNoteId}) => {

    const map: Record<string, ReactElement> = {
        a3: <TrebleA3 />,
        a4: <TrebleA4 />,
        a5: <TrebleA5 />,

        b3: <TrebleB3 />,
        b4: <TrebleB4 />,
        b5: <TrebleB5 />,

        c3: <TrebleC3 />,
        c4: <TrebleC4 />,
        c5: <TrebleC5 />,

        d3: <TrebleD3 />,
        d4: <TrebleD4 />,
        d5: <TrebleD5 />,

        e3: <TrebleE3 />,
        e4: <TrebleE4 />,
        e5: <TrebleE5 />,

        f3: <TrebleF3 />,
        f4: <TrebleF4 />,
        f5: <TrebleF5 />,

        g3: <TrebleG3 />,
        g4: <TrebleG4 />,
        g5: <TrebleG5 />,
    }

    return (
        <div>
            {map[visibleNoteId]}
        </div>
    )
}

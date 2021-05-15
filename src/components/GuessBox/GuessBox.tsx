import {Button, ButtonGroup} from "@material-ui/core";
import * as React from "react";

export interface GuessBoxProps {
    onClick: (value: string) => void;
    disabled: boolean;
}

export const GuessBox: React.FC<GuessBoxProps> = ({ onClick, disabled }) => {
    return (
        <ButtonGroup disabled={disabled} color="secondary" variant="contained" aria-label="contained secondary button group">
            {["a","b","c","d","e","f","g"].map((note: string) => <Button key={note} onClick={() => onClick(note)}>{note.toUpperCase()}</Button>)}
        </ButtonGroup>
    )
}

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import './App.css';
import {ClefContainer} from "./components/ClefContainer/ClefContainer";
import {GuessBox} from "./components/GuessBox/GuessBox";
import {
    AppBar,
    Box,
    Button,
    Card,
    Grid,
    LinearProgress, Menu, MenuItem,
    MuiThemeProvider, Toolbar,
    Typography
} from "@material-ui/core";
import {darkTheme} from "./styles";
import {Menu as MenuIcon} from "@material-ui/icons";
import {BassClefContainer} from "./components/BassClefContainer/ClefContainer";
// import {ReactComponent as BassClef} from "./assets/symbols/bass_clef.svg";
// import {ReactComponent as TrebleClef} from "./assets/symbols/treble_clef.svg";

export type Clef = "treble" | "bass"
export const SKIP_VALUE="-";
interface RecordedGuess {
    attempt: string;
    expected: string;
    correct: boolean;
    clef: Clef;
    id: number;
}


const bassNotes = [
    "a2",
    "a3",
    "a4",
    "b2",
    "b3",
    "b4",
    "c2",
    "c3",
    "c4",
    "c5",
    "d2",
    "d3",
    "d4",
    "e2",
    "e3",
    "e4",
    "f2",
    "f3",
    "f4",
    "g2",
    "g3",
    "g4",
]

const trebleNotes = [
    "a3",
    "b3",
    "c3",
    "d3",
    "e3",
    "f3",
    "g3",
    "a4",
    "b4",
    "c4",
    "d4",
    "e4",
    "f4",
    "g4",
    "a4",
    "b4",
    "c5",
    "d5",
    "e5",
    "f5",
    "g5",
]

const App = () => {


    const [notePosition, setNotePosition] = useState<number>(0);
    const [correct, setCorrect] = useState<boolean>(false);
    const [guess, setGuess] = useState<string>("");
    const [recordedGuesses, setRecordedGuesses] = useState<RecordedGuess[]>([]);
    const [clef, setClef] = useState<Clef>("treble");
    const [anchorEl, setAnchorEl] = useState();

    const [correctSum, setCorrectSum] = useState<number>(0);
    const successRate = (correctSum / recordedGuesses.length) * 100 || 0

    const notes = useMemo( () => {
        switch(clef) {
            case "treble":
                return trebleNotes;
            case "bass":
                return bassNotes;
            default:
                return trebleNotes;

        }
    }, [clef] )

    const getNoteIndex = useCallback(() => Math.floor(Math.random() * notes.length), [notes]);

    useEffect(() => {
        setNotePosition(Math.floor(getNoteIndex()));
    }, [getNoteIndex])

    const thisRandomNote = notes[notePosition];

    const onGuess = (value: string) => {
        setGuess(value);
        const goodGuess = thisRandomNote.includes(value);
        setCorrect(goodGuess);

        if(goodGuess && value !== SKIP_VALUE){
            setCorrectSum(correctSum + 1);
        }
        setRecordedGuesses([{attempt: value, expected: thisRandomNote, correct: goodGuess, clef, id: new Date().getTime()}, ...recordedGuesses]);
    }

    const skip = () => {
        setRecordedGuesses([{attempt: SKIP_VALUE, expected: thisRandomNote, correct: false, clef, id: new Date().getTime()}, ...recordedGuesses]);
        reset()
    }

    const reset = () => {
        setGuess("");
        setNotePosition(getNoteIndex());
    }

    const recordButtonPosition = (event: any) => {
        setAnchorEl(event.currentTarget);
    }

    const selectClef = (value: Clef) => {
        setClef(value)
        setAnchorEl(undefined);
        reset();
    }

    return (
        <MuiThemeProvider theme={darkTheme}>
            <div className="App">
                <AppBar position="static" style={{background:"none"}}>
                    <Toolbar>
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={recordButtonPosition}>
                            <MenuIcon />
                        </Button>
                        <Menu
                            onBlur={() => setAnchorEl(undefined)}
                            id="clef-menu"
                            open={!!anchorEl}
                            anchorEl={anchorEl}
                        >
                            <MenuItem disabled={clef === "treble"} onClick={()=>selectClef("treble")}>Treble</MenuItem>
                            <MenuItem disabled={clef === "bass"} onClick={()=>selectClef("bass")}>Bass</MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
                <LinearProgress color={successRate > 50 ? "primary" : "secondary"} style={{height:"15px"}} variant={"determinate"} value={successRate} />
                <Grid container direction={"column"} alignContent={"center"} justify={"center"} spacing={2}>
                    <Grid item>
                        <Card style={{padding: "15px"}}>
                            <Grid item style={{padding: "15px"}}>
                                <GuessBox disabled={!!guess} onClick={onGuess}/>
                            </Grid>
                            <Grid item style={{padding: "15px"}}>
                                { clef === "treble" &&
                                    <ClefContainer visibleNoteId={thisRandomNote}/>
                                }
                                { clef === "bass" &&
                                    <BassClefContainer visibleNoteId={thisRandomNote}/>
                                }
                            </Grid>
                            <Grid item style={{padding: "15px"}}>
                                {
                                    guess && (
                                        <Box color={correct ? "success.main" : "secondary.main"}>
                                            <h1>
                                                {thisRandomNote?.toUpperCase()}
                                            </h1>
                                        </Box>
                                    )
                                }
                            </Grid>
                        </Card>
                    </Grid>

                    <Grid item>
                        <Card style={{padding: "15px"}}>
                            <Grid container justify={"space-between"}>
                                <Grid item>
                                    <Button color={"secondary"} variant={"contained"} disabled={!!guess} onClick={skip}>Skip</Button>
                                </Grid>
                                <Grid item>
                                    <Button color={"primary"} variant={"contained"} disabled={!guess} onClick={reset}>Next</Button>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card style={{ overflowY: "scroll", padding: "15px", height: "100px"}}>
                            {recordedGuesses?.map((recordedGuess: RecordedGuess) => (
                                <Grid container justify={"center"} alignItems={'center'} key={recordedGuess.id}>
                                    <Grid item style={{paddingRight: "15px"}}>
                                        {recordedGuess.clef}
                                    </Grid>
                                    <Grid item style={{paddingRight: "15px"}}>
                                        <Box color={recordedGuess.correct ? "success.main" : "secondary.main"}>
                                            <Typography style={{fontWeight: "bold"}}>
                                                {recordedGuess.attempt.toUpperCase()}
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item>
                                        :
                                    </Grid>

                                    <Grid item style={{paddingLeft: "15px"}}>
                                        <Box>
                                            <Typography style={{fontWeight: "bold"}}>
                                                {recordedGuess.expected.toUpperCase()}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            ))}
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </MuiThemeProvider>
    );
}

export default App;

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import './App.css';
import {ClefContainer} from "./components/ClefContainer/ClefContainer";
import {GuessBox} from "./components/GuessBox/GuessBox";
import {Box, Button, Card, Grid, LinearProgress, MuiThemeProvider, Typography} from "@material-ui/core";
import {darkTheme} from "./styles";
import {DoneOutline, HighlightOff} from "@material-ui/icons";

interface RecordedGuess {
    attempt: string;
    expected: string;
    correct: boolean;
}

const App = () => {
    const notes = useMemo( () => [
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
    ], [] )

    const [notePosition, setNotePosition] = useState<number>(0);
    const [correct, setCorrect] = useState<boolean>(false);
    const [guess, setGuess] = useState<string>("");
    const [recordedGuesses, setRecordedGuesses] = useState<RecordedGuess[]>([]);

    const getNoteIndex = useCallback(() => Math.floor(Math.random() * notes.length), [notes]);

    const successRate = ((recordedGuesses
        .map(guess => guess.correct)
        .reduce((res, next) => next ? res += 1 : res, 0) / recordedGuesses.length) * 100) || 0;

    useEffect(() => {
        setNotePosition(Math.floor(getNoteIndex()));
    }, [getNoteIndex])

    const thisRandomNote = notes[notePosition];

    const onGuess = (value: string) => {
        setGuess(value);
        const goodGuess = thisRandomNote.includes(value);
        setCorrect(goodGuess);
        setRecordedGuesses([{attempt: value, expected: thisRandomNote, correct: goodGuess}, ...recordedGuesses]);
    }

    const skip = () => {
        setRecordedGuesses([{attempt: "-", expected: thisRandomNote, correct: false}, ...recordedGuesses]);
        reset()
    }

    const reset = () => {
        setGuess("");
        setNotePosition(getNoteIndex());
    }

    return (
        <MuiThemeProvider theme={darkTheme}>
            <div className="App">
                <LinearProgress color={successRate > 50 ? "primary" : "secondary"} style={{height:"15px"}} variant={"determinate"} value={successRate} />
                <Grid container direction={"column"} alignContent={"center"} justify={"center"} spacing={2}>
                    <Grid item>
                        <Card style={{padding: "15px"}}>
                            <Grid item style={{padding: "15px"}}>
                                <GuessBox disabled={!!guess} onClick={onGuess}/>
                            </Grid>
                            <Grid item style={{padding: "15px"}}>
                                <ClefContainer visibleNoteId={thisRandomNote}/>
                            </Grid>
                            <Grid item style={{padding: "15px"}}>

                                {guess && (correct ? <Box color={"success.main"}><DoneOutline /></Box> : <Box color={"secondary.main"}><HighlightOff /></Box>)}
                            </Grid>
                        </Card>
                    </Grid>

                    <Grid item>
                        <Card style={{padding: "15px"}}>
                            <Grid container justify={"space-between"}>
                                <Grid item>
                                    <Button color={"secondary"} variant={"contained"} onClick={skip}>Skip</Button>
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
                                <Grid container justify={"center"} key={Math.floor(Math.random() * 1000000)}>
                                    <Grid item style={{paddingRight: "15px"}}>
                                        <Box color={recordedGuess.correct ? "success.main" : "secondary.main"}>
                                            <Typography style={{fontWeight: "bold"}}>
                                                {recordedGuess.attempt}
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item>
                                        -
                                    </Grid>

                                    <Grid item style={{paddingLeft: "15px"}}>
                                        <Box>
                                            <Typography style={{fontWeight: "bold"}}>
                                                {recordedGuess.expected}
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

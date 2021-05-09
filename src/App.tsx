import React, {useEffect, useState} from 'react';
import './App.css';
import {ClefContainer} from "./components/ClefContainer/ClefContainer";
import {GuessBox} from "./components/GuessBox/GuessBox";
import {Card, createMuiTheme, Grid, MuiThemeProvider} from "@material-ui/core";
import {light} from "@material-ui/core/styles/createPalette";

function App() {
    const notes = [
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
    ];

    const [notePosition, setNotePosition] = useState<number>(0);
    const [correct, setCorrect] = useState<number>(-1);

    const label = () => {
        switch (correct) {
            case -1:
                return null;
            case 0:
                return "Bad!"
            case 1:
                return "Good!"
        }
    }

    useEffect(() => {
        setNotePosition(Math.floor(Math.random() * notes.length))
    }, [])

    const thisRandomNote = notes[notePosition];

    const onGuess = (value: string) => {
        const goodGuess = thisRandomNote.includes(value);
        setCorrect(goodGuess ? 1 : 0);

        setNotePosition(Math.floor(Math.random() * notes.length))

    }

    const themeX = createMuiTheme({
        palette: {
            type: "dark",
        }
    });

    return (
        <MuiThemeProvider theme={themeX}>

        <div className="App">
            <Grid container alignContent={"center"} justify={"center"} direction={"column"} spacing={2}>
                <Card style={{padding: "15px"}}>
                    <Grid item style={{padding: "15px"}}>
                        <GuessBox onClick={onGuess}/>
                    </Grid>
                    <Grid item style={{padding: "15px"}}>
                        <ClefContainer visibleNoteId={thisRandomNote}/>
                    </Grid>

                    <Grid item style={{padding: "15px"}}>
                        <h1>{ label() }</h1>
                    </Grid>
                </Card>
            </Grid>

        </div>
        </MuiThemeProvider>
    );
}

export default App;

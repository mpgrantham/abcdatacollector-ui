import { useEffect, useState } from 'react'

import Button from '@mui/joy/Button'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup'
import Typography from '@mui/joy/Typography'

// @ts-expect-error('Error in module')
import { TagCloud } from 'react-tagcloud'

import { Abc } from '../../models/Abc'
import { Incident } from '../../models/Incident'

interface AbcFrequencyProps {
    incidents: Incident[];
}

interface WordCount {
    value: string;
    count: number;
}

const ANTECEDENT = 'antecedent';
const BEHAVIOR = 'behavior';
const CONSEQUENCE = 'consequence';

const toggleItems = [
    { value: ANTECEDENT, label: 'Antecedents' },
    { value: BEHAVIOR, label: 'Behaviors' },
    { value: CONSEQUENCE, label: 'Consequences' },
]

const AbcFrequency = ({ incidents }: AbcFrequencyProps ) => {
    const [words, setWords] = useState<WordCount[]>([]);
    const [abcs, setAbcs] = useState([ANTECEDENT, BEHAVIOR, CONSEQUENCE]);

    useEffect(() => {
        const wordCount:WordCount[] = [];

        incidents.forEach((incident:Incident) => {
            let allWords:Abc[] = []

            if ( abcs.includes(ANTECEDENT) ) {
                allWords = allWords.concat(incident.antecedents ?? [])
            }
            if ( abcs.includes(BEHAVIOR) ) {
                allWords = allWords.concat(incident.behaviors ?? [])
            }
            if ( abcs.includes(CONSEQUENCE) ) {
                allWords = allWords.concat(incident.consequences ?? [])
            }

            allWords.forEach((a:Abc) => {
                const word = wordCount.find((w:WordCount) => { return w.value === a.value})
                if ( word ) {
                    word.count++;
                }
                else {
                    wordCount.push({value: a.value, count: 1})
                }
            })

            setWords(wordCount)
        })
    }, [incidents, abcs])

    return (
        <Card>
            <Typography level="title-lg">
                ABC Frequency
            </Typography>
            <CardContent>
                <div className="flex-column gap-10">
                    <ToggleButtonGroup 
                        aria-label="button-group" 
                        color="primary"
                        value={abcs}
                        onChange={
                            // @ts-expect-error('event is never used')
                            (event, newValue: string[]) => {
                            setAbcs(newValue ?? ANTECEDENT);
                        }}
                    >
                        {
                            toggleItems.map(item => {
                                return <Button key={item.label} value={item.value}>{item.label}</Button>
                            })
                        }
                    </ToggleButtonGroup>

                    <TagCloud
                        minSize={12}
                        maxSize={35}
                        tags={words}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default AbcFrequency

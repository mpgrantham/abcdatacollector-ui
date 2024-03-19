import { useEffect, useState } from 'react'
import { ResponsivePie } from '@nivo/pie'

import Typography from '@mui/joy/Typography'

import { Incident } from '../../models/Incident'

interface AbcPieChartProps {
    title: string;
    incidents: Incident[];
    limit?: number;
}

type ComboObject = {
    id: string;
    label: string;
    value: number;
    color: string;
}

const colors = ['#ff9800', '#2e7d32', '#d32f2f', '#1565c0', '#9c27b0']

const AbcPieChart = ({ title, incidents, limit = 5 }: AbcPieChartProps) => {
    const [values, setValues] = useState<ComboObject[]>([])

    useEffect(() => {
        const isAB = title.startsWith('Antecedent');

        const allCombos:ComboObject[] = [];
        let idx = 0;

        incidents.forEach((incident:Incident) => {
            let listOne: string[]
            let listTwo: string[]

            const antecedents = incident.antecedents ? incident.antecedents : []
            const behaviors = incident.behaviors ? incident.behaviors : []
            const consequences = incident.consequences ? incident.consequences : []

            if ( isAB ) {
                listOne = antecedents.map(a => { return a.value })
                listTwo = behaviors.map(b => { return b.value })
            }
            else {
                listOne = behaviors.map(a => { return a.value })
                listTwo = consequences.map(b => { return b.value })
            }

            listOne.forEach(a => {
                listTwo.forEach(b => {
                    const combo = a + ' - ' + b

                    const word = allCombos.find(w => { return w.label === combo});
                    if ( word ) {
                        word.value++
                    }
                    else {
                        allCombos.push({'id': combo, 'label': combo, 'value': 1, 'color': colors[idx]})
                        idx++
                    }
                });
            });
        });

        allCombos.sort(function(a:ComboObject, b:ComboObject) { return b.value - a.value })

        setValues(allCombos.length > limit ? allCombos.slice(0, limit) : allCombos)
    }, [incidents, title, limit])

    return (
        <div>
            <Typography level="title-md">
                {title}
            </Typography>

            <div style={{height: '400px'}}>
                {values.length > 0 &&
                    <ResponsivePie
                        data={values}
                        margin={{top: 10, right: 140, bottom: 110, left: 0}}
                        borderColor={{from: 'color', modifiers: [['darker', 0.2]]}}
                        enableArcLabels={true}
                        enableArcLinkLabels={false}
                        arcLinkLabelsSkipAngle={10}
                        arcLinkLabelsTextColor="#333333"
                        arcLinkLabelsThickness={2}
                        arcLinkLabelsColor={{from: 'color'}}
                        arcLabelsSkipAngle={10}
                        arcLabelsTextColor={{from: 'color', modifiers: [['darker', 2]]}}
                        legends={[
                            {
                                anchor: 'right',
                                direction: 'column',
                                justify: false,
                                translateX: -10,
                                translateY: 200,
                                itemsSpacing: 0,
                                itemWidth: 100,
                                itemHeight: 18,
                                itemTextColor: '#999',
                                itemDirection: 'left-to-right',
                                itemOpacity: 1,
                                symbolSize: 18,
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: '#000'
                                        }
                                    }
                                ]
                            }
                        ]}
                    />
                }
                {values.length === 0 &&
                    <div>No Data found</div>
                }
            </div>
        </div>
    )
}

export default AbcPieChart

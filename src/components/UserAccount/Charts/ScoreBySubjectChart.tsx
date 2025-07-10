import {Bar, BarChart, XAxis} from "recharts"
import {type ChartConfig, ChartContainer} from "@/components/ui/chart"
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card"

const chartData = [
    {month: "January", desktop: 186, mobile: 80},
    {month: "February", desktop: 305, mobile: 200},
    {month: "March", desktop: 237, mobile: 120},
    {month: "April", desktop: 73, mobile: 190},
    {month: "May", desktop: 209, mobile: 130},
    {month: "June", desktop: 214, mobile: 140},
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#2563eb",
    },
    mobile: {
        label: "Mobile",
        color: "#60a5fa"
    }
} satisfies ChartConfig

export default function ScoreBySubjectChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Ta moyenne par Sujet
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-96 w-1/3">
                    <BarChart accessibilityLayer data={chartData}>
                        <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false}/>
                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4}/>
                        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4}/>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>

    )
}

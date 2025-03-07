"use client";

import { Button } from "@/components/ui/button";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { PolarGrid, RadialBar, RadialBarChart } from "recharts";

const chartData = [
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;


export default function Page() {
  return (
    <div className="flex flex-col gap-8 overflow-x-scroll sm:px-[2%]">
      <div className="hidden sm:block font-semibold text-2xl pt-6 pb-2">
        <p>Welcome back, Srishti!</p>
        <p>Ready to check your progress?</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="border p-2 rounded-xl space-y-2 bg-yellow-50">
          <p className="text-center text-lg font-semibold">- Reminder -</p>
          <p><b>Upcoming Session :</b>  29th Jan, 2025 (18:00pm)</p>
          <div className="flex justify-between">
            <p><b>No. of sessions left :</b>  0</p>
            <button className="font-bold bg-foreground hover:bg-foreground/80 text-background rounded-xl px-2.5 py-1 shadow-lg">Schedule</button>
          </div>
        </div>
        <div className="">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <RadialBarChart
              data={chartData}
              startAngle={0}
              endAngle={250}
              innerRadius={80}
              outerRadius={110}
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                className="first:fill-muted last:fill-background"
                polarRadius={[86, 74]}
              />
              <RadialBar dataKey="visitors" background cornerRadius={10} />
            </RadialBarChart>
          </ChartContainer>
        </div>
      </div>
      <div className="space-y-2">
        <p className="font-semibold">Mental Health Metrices</p>
        <div className="flex gap-2 sm:gap-[2%] overflow-x-scroll lg:overflow-hidden">
          <div className="max-w-32 min-w-32 aspect-square flex-grow rounded-2xl p-2  bg-[#BBCA97]">
            <p className="text-left text-white font-bold text-sm">Happiness</p>

          </div>
          <div className="max-w-32 min-w-32 aspect-square flex-grow rounded-2xl p-2  bg-[#AACDC1]">
            <p className="text-left text-white font-bold text-sm">Anxiety</p>
          </div>
          <div className="max-w-32 min-w-32 aspect-square flex-grow rounded-2xl p-2  bg-[#F6EAA1]">
            <p className="text-left text-white font-bold text-sm">Stress</p>
          </div>
          <div className="max-w-32 min-w-32 aspect-square flex-grow rounded-2xl p-2  bg-[#B3D9BE]">
            <p className="text-left text-white font-bold text-sm">Mood</p>
          </div>
          <div className="max-w-32 min-w-32 aspect-square flex-grow rounded-2xl p-2  bg-[#F0AA97]">
            <p className="text-left text-white font-bold text-sm">Intimacy</p>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <p className="font-semibold">Progress Graph</p>
        <div className="grid gap-6 md:grid-cols-[16fr_9fr] max-w-5xl">
          <div className="bg-[#FFE7E7] aspect-video rounded-2xl"></div>
          <div className="aspect-square grid grid-rows-[1fr_auto] gap-4">
            <div className="hidden sm:block bg-[url(/blog-thumb.svg)] bg-cover bg-top rounded-2xl">
              <div className="h-full py-[20%] flex flex-row items-end font-semibold w-[60%] lg:text-xl md:text-sm sm:text-2xl px-4">
                <div className="space-y-4">
                  <p className="">How to deal with<br />anxiety?</p>
                  <button className="scale-90 ml-[-5%] bg-white shadow-xl px-3 py-1 rounded-xl">Read</button>
                </div>
              </div>
            </div>
            <Button className="font-semibold">Talk to therapist</Button>
          </div>

        </div>

      </div>
    </div>
  );
}
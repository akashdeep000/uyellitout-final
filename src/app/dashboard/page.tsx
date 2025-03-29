"use client";

import { getNotSheduledBookingsUser, getUpcomingBookingsUser } from "@/actions/booking";
import { getStatsByUser } from "@/actions/quiz";
import { Button } from "@/components/ui/button";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { cn, converterFromHappiness } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { CartesianGrid, Label, Line, LineChart, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart, XAxis } from "recharts";


const metrics = [
  {
    key: "happiness",
    lebel: "Happiness",
    background: "#BBCA97"
  },
  {
    key: "anxiety",
    lebel: "Anxiety",
    background: "#AACDC1"
  },
  {
    key: "stress",
    lebel: "Stress",
    background: "#F6EAA1"
  },
  {
    key: "mood",
    lebel: "Mood",
    background: "#B3D9BE"
  },
  {
    key: "intimacy",
    lebel: "Intimacy",
    background: "#F0AA97"
  }
] as {
  key: "happiness" | "anxiety" | "stress" | "mood" | "intimacy",
  lebel: string,
  background: "#BBCA97" | "#AACDC1" | "#F6EAA1" | "#B3D9BE" | "#F0AA97",
}[];

const chartConfig = {
  percent: {
    label: "Percent",
    color: "hsl(var(--chart-2))",
  },
  initial: {
    label: "Initial",
    color: "hsl(var(--chart-1))",
  },
  previous: {
    label: "Previous",
    color: "hsl(var(--chart-5))",
  },
  latest: {
    label: "Latest",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;


export default function Page() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["matrics"],
    queryFn: () => getStatsByUser()
  });

  const { data: session, isLoading: sessionLoading } = useQuery({
    queryKey: ["session"],
    queryFn: () => authClient.getSession()
  });

  const { data: upcomingBookings, isLoading: upcomingBookingsLoading } = useQuery({
    queryKey: ["upcoming-bookings"],
    queryFn: () => getUpcomingBookingsUser()
  });

  const { data: notScheduledBookings, isLoading: notScheduledBookingsLoading } = useQuery({
    queryKey: ["not-scheduled-bookings"],
    queryFn: () => getNotSheduledBookingsUser()
  });

  const percentChartData = metrics.map((metric) => ({
    data: [{
      [metric.key]: Number(stats ? metric.key === "intimacy" ? stats?.stat[stats?.stat.length - 1].intimacy.toFixed(0) : converterFromHappiness(metric.key as "happiness" | "anxiety" | "stress" | "mood" | "intimacy", stats?.stat[stats?.stat.length - 1].happiness).toFixed(0) : 0) as number,
      fill: "var(--color-percent)"
    }]
  }));

  // const graphData = stats?.stat.map((item, index) => {
  //   const data: Record<string, unknown> = {};
  //   data.time = index === stats.stat.length - 1 ? "Latest" : index === stats.stat.length - 2 ? "Previous" : "Initial";
  //   metrics.forEach(metric => {
  //     data[metric.key] = metric.key === "intimacy" ? item.intimacy : converterFromHappiness(metric.key, item.happiness);
  //   });
  //   return data;
  // }) || [];


  const graphData2 = metrics.map(metric => {
    const data: Record<string, string | number> = {
      metric: metric.lebel
    };
    stats?.stat.forEach((stat, index) => {
      data[index === stats.stat.length - 1 ? "latest" : index === stats.stat.length - 2 ? "previous" : "initial"] = metric.key === "intimacy" ? stat.intimacy.toFixed(2) : converterFromHappiness(metric.key, stat.happiness).toFixed(2);
    });
    return data;
  });

  return (
    <div className="flex flex-col gap-8 overflow-x-scroll sm:px-[2%] mb-4">
      <div className="hidden sm:block font-semibold text-2xl pt-6 pb-2">
        <div className="flex gap-2"><p>Welcome back, </p> {sessionLoading ? <Skeleton className="inline w-24 h-8 rounded" /> : <p>{session?.data?.user.name.split(" ")[0]}!</p>}</div>
        <p>Ready to check your progress?</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="border p-2 rounded-xl space-y-2 bg-yellow-50">
          <p className="text-center text-lg font-semibold">- Reminder -</p>
          <div className="flex flex-wrap gap-2"><p><b>Upcoming Session :</b> </p> <div>{upcomingBookingsLoading ? <Skeleton className="rounded w-52 h-6" /> : upcomingBookings?.length === 0 ? "No upcoming sessions" : `${upcomingBookings?.[0].time?.toDateString()} (${upcomingBookings?.[0].time?.toLocaleTimeString()})`}</div></div>
          {/* <p><b>Upcoming Session :</b>  29th Jan, 2025 (18:00pm)</p> */}
          <div className="flex justify-between">
            <div className="flex flex-wrap gap-2"><p><b>No. of sessions left :</b></p><div>{notScheduledBookingsLoading ? <Skeleton className="size-6" /> : notScheduledBookings?.length}</div></div>
            <Link href="/dashboard/bookings"><button className="font-bold bg-foreground hover:bg-foreground/80 text-background rounded-xl px-2.5 py-1 shadow-lg">Schedule</button></Link>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <p className="font-semibold">Mental Health Metrices</p>
        <div className="flex gap-2 sm:gap-[2%] overflow-x-scroll lg:overflow-hidden">
          {metrics.map((metric, index) => (
            <div key={metric.key} className={`max-w-32 min-w-32 aspect-square flex-grow rounded-2xl p-2  bg-[${metric.background}]`}>
              <p className="text-left text-white font-bold text-sm">{metric.lebel}</p>
              <ChartContainer
                config={chartConfig}
                className={`mx-auto aspect-square max-h-[250px] ${metric.key === "happiness" ? "bg-[#BBCA97]" : metric.key === "anxiety" ? "bg-[#AACDC1]" : metric.key === "stress" ? "bg-[#F6EAA1]" : metric.key === "mood" ? "bg-[#B3D9BE]" : "bg-[#F0AA97]"}`}
              >
                <RadialBarChart
                  data={percentChartData[index].data}
                  startAngle={45}
                  endAngle={(360 * (percentChartData[index].data[0][metric.key] as number / 100)) + 45}
                  innerRadius={40}
                  outerRadius={55}
                >
                  <PolarGrid
                    gridType="circle"
                    radialLines={false}
                    className={`first:fill-muted ${metric.key === "happiness" ? "last:fill-[#BBCA97]" : metric.key === "anxiety" ? "last:fill-[#AACDC1]" : metric.key === "stress" ? "last:fill-[#F6EAA1]" : metric.key === "mood" ? "last:fill-[#B3D9BE]" : "last:fill-[#F0AA97]"}`}
                    polarRadius={[44, 36]}
                  />
                  <RadialBar dataKey={metric.key} background cornerRadius={10} />
                  <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-white text-2xl font-bold"
                              >
                                {percentChartData[index].data[0][metric.key]}
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </PolarRadiusAxis>
                </RadialBarChart>
              </ChartContainer>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <p className="font-semibold">Progress Graph</p>
        <div className="grid gap-6 md:grid-cols-[16fr_9fr] max-w-5xl">
          <div className="bg-[#FFF5EE]/50 p-4 rounded-2xl  max-w-[100svw]">
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={graphData2}
              // margin={{
              //   left: 12,
              //   right: 12,
              // }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="metric"
                  tickLine={false}
                  axisLine={false}
                  fillOpacity={0}
                // tickMargin={8}
                // tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                {["initial", "previous", "latest"].map((time) => (
                  <Line
                    key={time}
                    type="monotone"
                    dataKey={time}
                    stroke={`var(--color-${time})`}
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                ))}

              </LineChart>
            </ChartContainer>
            <div className="grid grid-cols-[1fr_2fr_2fr_2fr_1fr] font-semibold text-xs text-gray-600">
              {
                metrics.map((metric, index) => (
                  <p className={cn("w-full text-center", index === 0 && "text-left", index === 4 && "text-right")} key={metric.key}>{metric.lebel}</p>
                ))
              }
            </div>
          </div>
          <div className=" grid grid-rows-[1fr_auto] gap-4">
            <div className="bg-[url(/blog-thumb.svg)] bg-cover bg-top rounded-2xl">
              <div className="h-full py-[20%] flex flex-row items-end font-semibold w-[60%] lg:text-xl md:text-sm sm:text-2xl px-4">
                <div className="space-y-4">
                  <p className="">How to deal with<br />anxiety?</p>
                  <button className="scale-90 ml-[-5%] bg-white shadow-xl px-3 py-1 rounded-xl">Read</button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="space-y-2 md:space-y-0 md:flex md:items-center md:gap-2"> */}
          <a href="https://api.whatsapp.com/send/?phone=918584034584"><Button className="text-lg bg-[#8DAA64] rounded-xl py-6 px-8 font-semibold w-full">Talk to therapist</Button></a>
          <p className="">We carefully plan our slots to ensure you receive the support you need as soon as possible.</p>
          {/* </div> */}
        </div>

      </div>
    </div>
  );
}
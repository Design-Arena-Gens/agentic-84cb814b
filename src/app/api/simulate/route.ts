import { simulateStrategy } from "@/lib/analysis";
import { StrategySimulationRequest } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const payloadSchema = z.object({
  baseAsset: z.string().min(1),
  budget: z.number().min(1000),
  riskAppetite: z.enum(["conservative", "balanced", "aggressive"]),
  holdingPeriod: z.number().min(30).max(720),
  leverage: z.number().min(1).max(5),
  stopLoss: z.number().min(2).max(30),
  takeProfit: z.number().min(4).max(60),
  frequency: z.enum(["daily", "weekly", "monthly"])
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = payloadSchema.parse(body) as StrategySimulationRequest;
    const simulation = simulateStrategy(payload);

    return NextResponse.json(simulation);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 422 });
    }

    console.error("Simulation error", error);
    return NextResponse.json({ error: "unexpected_error" }, { status: 500 });
  }
}

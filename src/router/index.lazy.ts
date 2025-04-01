import { lazy } from "react";

export const LazyMain = lazy(() => import("@/components/Main"))
export const LazyInstruction = lazy(() => import("@/components/Instruction/Instruction"))
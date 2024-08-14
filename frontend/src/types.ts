import { z } from "zod";
import { MemberSchema } from "./schemas";

export type Member = z.infer<typeof MemberSchema>;

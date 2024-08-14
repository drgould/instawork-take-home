import { z } from "zod";
import { PHONE_NUMBER_REGEX } from "./constants";

export const MemberSchema = z.object({
  id: z.preprocess(
    (val) => (val !== "" ? parseInt(val as string, 10) : undefined),
    z.number().int().min(1).optional(),
  ),
  first_name: z.string().max(100),
  last_name: z.string().max(100),
  email: z.string().email(),
  phone: z.string().regex(PHONE_NUMBER_REGEX, "Invalid phone number"),
  is_admin: z.coerce.boolean(),
});

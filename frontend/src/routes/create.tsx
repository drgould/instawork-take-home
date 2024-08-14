import { ActionFunctionArgs, redirect, useActionData } from "react-router-dom";
import MemberForm from "../components/MemberForm";
import { createMember } from "../utils/http";
import { MemberSchema } from "../schemas";
import { formDataToObject } from "../utils/misc";
import { Member } from "../types";
import { ZodError } from "zod";

export async function action({ request }: ActionFunctionArgs) {
  try {
    const data = formDataToObject(await request.formData()) as Member;
    const validatedData = MemberSchema.parse(data);
    await createMember(validatedData);
    return redirect("/"); // effectively close the form
  } catch (error) {
    return { error };
  }
}

export default function CreateTeamMember() {
  const actionData = useActionData() as { error?: ZodError } | undefined;
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl">Add a team member</h1>
      <p>Set contact info, location and role.</p>
      <MemberForm method="post" error={actionData?.error} />
    </div>
  );
}

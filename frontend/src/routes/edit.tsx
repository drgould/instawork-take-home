import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
  useActionData,
  useLoaderData,
} from "react-router-dom";
import MemberForm from "../components/MemberForm";
import { deleteMember, getMember, updateMember } from "../utils/http";
import { MemberSchema } from "../schemas";
import { formDataToObject } from "../utils/misc";
import { Member } from "../types";
import { ZodError } from "zod";

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const member = await getMember(params.id!);
    return { member };
  } catch {
    return redirect("/");
  }
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const intent = formData.get("intent");
    formData.delete("intent");

    if (intent === "save") {
      const data = formDataToObject(formData) as Member;
      const validatedData = MemberSchema.parse(data);
      await updateMember(validatedData);
    } else {
      await deleteMember(formData.get("id") as string);
    }
    return redirect("/");
  } catch (error) {
    return { error };
  }
}

export default function EditTeamMember() {
  const { member } = useLoaderData() as { member: Member };
  const actionData = useActionData() as
    | { error?: ZodError | Error }
    | undefined;
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl">Edit team member</h1>
      <p>Edit contact info, location and role.</p>
      <MemberForm
        key={member.id}
        method="put"
        member={member}
        error={actionData?.error}
      />
    </div>
  );
}

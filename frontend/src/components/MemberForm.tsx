import React, { useState } from "react";
import { Member } from "../types";
import { Form } from "react-router-dom";
import { ZodError } from "zod";

interface MemberFormProps {
  member?: Member;
  method: React.ComponentProps<typeof Form>["method"];
  error?: ZodError | Error;
}

export default function MemberForm({ member, method, error }: MemberFormProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  return (
    <Form method={method} className="flex flex-col gap-2">
      <h3 className="text-xl bold">Info</h3>
      <input type="hidden" defaultValue={member?.id} name="id" />
      <input
        type="text"
        defaultValue={member?.first_name}
        name="first_name"
        placeholder="First name"
        required
      />
      <input
        type="text"
        defaultValue={member?.last_name}
        name="last_name"
        placeholder="Last name"
        required
      />
      <input
        type="text"
        defaultValue={member?.email}
        name="email"
        placeholder="Email address"
        required
      />
      <input
        type="text"
        defaultValue={member?.phone}
        name="phone"
        placeholder="Phone number"
        required
      />
      <h3 className="text-xl bold pt-2">Role</h3>
      <label className="flex justify-between items-center border-b border-slate-200 py-2 text-slate-400 has-[:checked]:text-black">
        Regular - Can't delete members
        <input
          type="radio"
          name="is_admin"
          value=""
          defaultChecked={!member?.is_admin}
        />
      </label>
      <label className="flex justify-between items-center border-b border-slate-200 py-2 text-slate-400 has-[:checked]:text-black">
        Admin - Can delete members
        <input
          type="radio"
          name="is_admin"
          value="1"
          defaultChecked={member?.is_admin}
        />
      </label>
      <div className="flex flex-row-reverse justify-between items-start">
        <button
          type="submit"
          name="intent"
          value="save"
          className="rounded bg-blue-500 text-white px-3 py-2 hover:bg-blue-400"
        >
          Save
        </button>
        {member && (
          <div>
            <button
              className="rounded border border-slate-200 text-red-500 bg-white px-3 py-2 hover:bg-red-50"
              onClick={() => setConfirmDelete(true)}
              type="button"
            >
              Delete
            </button>
            {confirmDelete && (
              <>
                <p className="text-red-500">Are you sure?</p>
                <button
                  className="rounded bg-red-500 text-white px-3 py-2 hover:bg-red-400"
                  type="submit"
                  name="intent"
                  value="delete"
                >
                  Absolutely! Get rid of them.
                </button>
              </>
            )}
          </div>
        )}
      </div>
      {error && (
        <div>
          {"issues" in error
            ? error.issues.map((issue) => (
                <p className="text-red-500">{issue.message}</p>
              ))
            : error.message}
        </div>
      )}
    </Form>
  );
}

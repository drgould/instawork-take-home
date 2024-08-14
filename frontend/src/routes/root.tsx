import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useLocation,
} from "react-router-dom";
import cx from "classnames";
import { getAllMembers } from "../utils/http";
import { Member } from "../types";

export async function loader() {
  const members = await getAllMembers();
  return { members };
}

export default function Root() {
  const location = useLocation();
  const { members } = useLoaderData() as { members: Member[] };
  return (
    <div className="bg-slate-100 h-full p-4 overflow-hidden flex justify-center">
      <div className="flex gap-3 max-w-5xl flex-1">
        <div
          className={cx("flex-1 flex flex-col gap-3 rounded bg-white p-3", {
            "max-md:hidden": location.pathname !== "/",
          })}
        >
          <div>
            <h1 className="text-3xl">Team members</h1>
            <p className="text-slate-400">
              You have {members.length} team members.
            </p>
          </div>
          <Link
            className="bg-slate-200 px-3 py-2 border border-transparent rounded text-center hover:bg-slate-300"
            to="/members/new"
          >
            Add a member
          </Link>
          <div className="overflow-auto flex-1 flex flex-col">
            {!members.length ? (
              <p className="flex-1 flex items-center justify-center text-slate-400">
                No members yet.
              </p>
            ) : (
              <div className="bg-slate-100 flex flex-col gap-0.5 py-0.5">
                {members.map((member) => (
                  <NavLink
                    key={member.id}
                    to={`/members/${member.id}`}
                    className={({ isActive }) =>
                      cx(
                        "bg-white flex gap-2 p-2 items-center border-r-4 border-transparent hover:bg-slate-100",
                        { "border-blue-300": isActive },
                      )
                    }
                  >
                    <img
                      src={`https://avatar.iran.liara.run/public/?username=${member.id}`}
                      className="w-16 h-16"
                    />
                    <div>
                      <p>
                        {member.first_name} {member.last_name}{" "}
                        {member.is_admin && "(admin)"}
                      </p>
                      <p className="text-slate-400">{member.phone}</p>
                      <p className="text-slate-400">{member.email}</p>
                    </div>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>
        <div
          className={cx(
            "flex-1 flex flex-col gap-3 rounded bg-white p-3 overflow-auto",
            {
              "max-md:hidden": location.pathname === "/",
            },
          )}
        >
          {location.pathname !== "/" ? (
            <Outlet />
          ) : (
            <p className="flex-1 flex items-center justify-center text-slate-400 text-center">
              Nothing to see here yet.
              <br />
              You can create or edit users on the left.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

"use client"
import usePresence from "@convex-dev/presence/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import FacePile from "@convex-dev/presence/facepile";
interface iAppProps{
    roomId: Id<"posts">,
    userId: string;
}
export function PostPresense({roomId,userId}:iAppProps) {
     const presenceState = usePresence(api.presence,roomId,userId);
    if (!presenceState || presenceState.length === 0) {
        return null;
    }

    return (
      <div className="flex items-center gap-2">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Viewing now
        </p>

        <div>
          <FacePile presenceState={presenceState ?? []} />
        </div>
      </div>
    );
}
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/components/userContext";
import { supabase } from "@/lib/supabase";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function MessagesPage() {
  const messageRef = useRef<HTMLInputElement>(null);
  const { articleId, otherUserId } = useParams();

  if (!articleId || !otherUserId) {
    return "Sorry, hier ist irgendwas scheif gelaufen";
  }
  const messagesQuery = useQuery({
    queryKey: ["supabase", "messages", articleId, otherUserId],
    queryFn: async () => {
      const result = await supabase
        .from("messages")
        .select("*")
        .eq("article_id", articleId!);
      //   .eq("sender_id", otherUserId!);

      if (result.error) {
        throw result.error;
      }
      return result.data;
    },
  });
  if (messagesQuery.isError) {
    return "upsi, hier ist was schief gelaufen";
  }
  if (messagesQuery.isPending) {
    return "Loading...";
  }

  const handleSendMassage: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    if (!messageRef.current) {
      return;
    }
    const result = await supabase.from("messages").insert({
      text: messageRef.current!.value,
      article_id: articleId,
      recipient_id: otherUserId,
    });
    if (result.error) {
      console.error(result.error);
    } else {
      (messageRef.current.value = ""), messagesQuery.refetch();
    }
  };

  const messages = messagesQuery.data.map((message) => ({
    ...message,
    direction: message.sender_id === otherUserId ? "received" : "sent",
  }));

  return (
    <div className="messagebox">
      <h2>
        Massages about {articleId} from {otherUserId}
      </h2>
      <div className="flex flex-col gap-4 bg-neutral-50 items-start">
        {messagesQuery.data.map((item) => {
          return (
            <div
              key={item.id}
              className={`bg-blue-600 text-white p-3 rounded-md ${
                item.direction === "sent" ? "self-end" : ""
              }`}
            >
              <p>{item.text}</p>
            </div>
          );
        })}
        <form className="flex mt-2" onSubmit={handleSendMassage}>
          <Input type="text" ref={messageRef} />
          <Button>Send</Button>
        </form>
      </div>
    </div>
  );
}

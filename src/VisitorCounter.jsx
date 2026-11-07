import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import "./VisitorCounter.css";

function VisitorCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const trackVisitor = async () => {
      let visitorId = localStorage.getItem("portfolio_visitor_id");

      if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem("portfolio_visitor_id", visitorId);
      }

      const { error } = await supabase
        .from("portfolio_visitors")
        .upsert(
          { visitor_id: visitorId },
          { onConflict: "visitor_id", ignoreDuplicates: true }
        );

      if (error) {
        console.error("Visitor tracking error:", error);
      }

      const { count, error: countError } = await supabase
        .from("portfolio_visitors")
        .select("*", { count: "exact", head: true });

      if (!countError) {
        setCount(count);
      }
    };

    trackVisitor();
  }, []);

  return (
    <div className="visitor-counter">
      <span className="live-dot"></span>
      <span>Visitors</span>
      <strong>{count.toLocaleString("en-IN")}</strong>
    </div>
  );
}

export default VisitorCounter;